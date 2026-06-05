import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import api from '../../services/api'; // Sua conexão com o IP do computador

export default function AddTransaction() {
  const router = useRouter();
  
  // Estados do Formulário
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE'); // INCOME = Entrada, EXPENSE = Saída
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  
  // Estados do Servidor
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [sending, setSending] = useState(false);

  // 1. Buscar as categorias reais do banco assim que entrar na tela
  useFocusEffect(
    useCallback(() => {
      async function loadCategories() {
        try {
          setLoadingCategories(true);
          const response = await api.get('/categories');
          setCategories(response.data);
          
          // Deixa a primeira categoria selecionada por padrão
          if (response.data.length > 0) {
            setSelectedCategoryId(response.data[0].id);
          }
        } catch (error) {
          console.error("Erro ao buscar categorias:", error);
          Alert.alert("Erro", "Não foi possível carregar as categorias.");
        } finally {
          setLoadingCategories(false);
        }
      }

      loadCategories();
    }, [])
  );

  // 2. Função para salvar os dados no banco
  async function handleSave() {
    if (!description.trim() || !amount || !selectedCategoryId) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      setSending(true);

      const payload = {
        description,
        amount: parseFloat(amount), // O Zod e o Prisma exigem que seja um Número
        type,
        categoryId: selectedCategoryId
      };

      // Dispara o POST para a rota que criamos na API
      await api.post('/transactions', payload);

      Alert.alert("Sucesso!", "Transação salva com sucesso!");
      
      // Limpa os campos
      setDescription('');
      setAmount('');
      
      // Redireciona o usuário de volta para a Home
      router.replace('/');
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar no banco.");
    } finally {
      setSending(false);
    }
  }

  if (loadingCategories) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 10 }}>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Transação</Text>

      {/* Campo: Descrição */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: Almoço, Salário, Internet..."
        value={description}
        onChangeText={setDescription}
      />

      {/* Campo: Valor */}
      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput 
        style={styles.input}
        placeholder="0.00"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Campo: Tipo (Botões de Alternar) */}
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.typeButton, type === 'INCOME' && styles.incomeActive]} 
          onPress={() => setType('INCOME')}
        >
          <Text style={type === 'INCOME' ? styles.textActive : styles.textInactive}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, type === 'EXPENSE' && styles.expenseActive]} 
          onPress={() => setType('EXPENSE')}
        >
          <Text style={type === 'EXPENSE' ? styles.textActive : styles.textInactive}>Saída</Text>
        </TouchableOpacity>
      </View>

      {/* Campo: Seleção de Categorias */}
      <Text style={styles.label}>Selecione uma Categoria</Text>
      <View style={styles.categoryList}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              selectedCategoryId === cat.id && styles.categorySelected
            ]}
            onPress={() => setSelectedCategoryId(cat.id)}
          >
            <Text style={selectedCategoryId === cat.id ? styles.textActive : styles.categoryText}>
              {cat.displayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={sending}>
        {sending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar no Banco</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#444' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  typeButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center' },
  incomeActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  expenseActive: { backgroundColor: '#c62828', borderColor: '#c62828' },
  textActive: { color: '#fff', fontWeight: 'bold' },
  textInactive: { color: '#666' },
  categoryList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  categoryCard: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, backgroundColor: '#f0f0f0' },
  categorySelected: { backgroundColor: '#6200ee', borderColor: '#6200ee' },
  categoryText: { color: '#333' },
  saveButton: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});