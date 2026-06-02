const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Health-check
app.get('/', (req, res) => {
  res.json({ ok: true, name: "gestao-financeira-api" });
});

// 2. Listar Categorias
app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// Esquema de validação do Zod para criar categoria
const categorySchema = z.object({
  name: z.string().min(2),
  displayName: z.string().min(2),
  icon: z.string(),
  background: z.string(),
  isIncome: z.boolean()
});

// 3. Criar nova categoria
app.post('/categories', async (req, res) => {
  try {
    const result = categorySchema.parse(req.body);
    const newCategory = await prisma.category.create({ data: result });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: "Dados inválidos", details: error.errors });
  }
});

// ==========================================

// Schema do Zod para validar a criação de uma Transação
const transactionSchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  amount: z.number().positive("O valor deve ser maior que zero"),
  type: z.enum(['INCOME', 'EXPENSE'], { 
    errorMap: () => ({ message: "O tipo deve ser INCOME (Entrada) ou EXPENSE (Saída)" }) 
  }),
  categoryId: z.string().uuid("ID da categoria inválido"),
  // Se o usuário não mandar uma data, o transform gera a data atual automaticamente
  date: z.string().optional().transform(val => val ? new Date(val) : new Date())
});

// 2. Criar uma nova Transação (POST)
app.post('/transactions', async (req, res) => {
  try {
    // Valida os dados de entrada usando o Zod
    const validationResult = transactionSchema.parse(req.body);

    // Regra de Segurança: Verifica se a categoria informada realmente existe no banco
    const category = await prisma.category.findUnique({
      where: { id: validationResult.categoryId }
    });

    if (!category) {
      return res.status(404).json({ error: "A categoria informada não existe" });
    }

    // Cria a transação amarando-a à categoria encontrada
    const newTransaction = await prisma.transaction.create({
      data: validationResult,
      // include: { category: true } faz o Prisma trazer os dados da categoria junto na resposta!
      include: {
        category: true
      }
    });

    // Retorna a transação criada com o status 201 (Created)
    res.status(201).json(newTransaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Dados inválidos", details: error.errors });
    }
    res.status(500).json({ error: "Erro interno ao criar transação" });
  }
});

// ==========================================

// 3. Listar Transações (GET)
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true // Traz os dados da categoria expandidos, como o professor pediu!
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar transações" });
  }
});

// 4. Excluir Transação (DELETE)
app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a transação existe antes de deletar
    const transaction = await prisma.transaction.findUnique({ where: { id } });
    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    await prisma.transaction.delete({ where: { id } });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir transação" });
  }
});

// ==========================================

// 5. Resumo de Saldo / Dashboard (GET)
app.get('/transactions/summary', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();

    // Redutores para somar entradas e saídas
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'INCOME') {
        totalIncome += t.amount;
      } else if (t.type === 'EXPENSE') {
        totalExpense += t.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    // Devolve o resumo prontinho para o Front-end
    res.json({
      totalIncome,
      totalExpense,
      balance
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar resumo financeiro" });
  }
});

// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// 4. Atualizar categoria (PUT)
app.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Schema do Zod para validar a alteração de nome solicitado pelo professor
    const updateSchema = z.object({
      displayName: z.string().min(2)
    });
    
    const result = updateSchema.parse(req.body);

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: result
    });
    
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar categoria" });
  }
});

// 5. Excluir categoria (DELETE)
app.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1º Passo: Buscar a categoria no banco para checar se ela é padrão
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    // Regra do professor: Bloquear exclusão se for uma das 5 categorias padrão
    if (category.isDefault) {
      return res.status(400).json({ error: "Categorias padrão não podem ser excluídas" });
    }

    // 2º Passo: Se não for padrão, deleta
    await prisma.category.delete({ where: { id } });
    
    res.status(204).send(); // 204 No Content (Sucesso sem conteúdo de retorno)
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir categoria" });
  }
});