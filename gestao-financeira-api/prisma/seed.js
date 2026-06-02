const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const defaultCategories = [
    { name: "income", displayName: "Entradas", icon: "attach-money", background: "#37BF81", isIncome: true, isDefault: true },
    { name: "food", displayName: "Alimentação", icon: "restaurant", background: "#DEA17B", isIncome: false, isDefault: true },
    { name: "house", displayName: "Moradia", icon: "home", background: "#E6E088", isIncome: false, isDefault: true },
    { name: "education", displayName: "Educação", icon: "school", background: "#AB8FBE", isIncome: false, isDefault: true },
    { name: "travel", displayName: "Viagem", icon: "flight", background: "#82C9DE", isIncome: false, isDefault: true }
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
  console.log("🌱 Categorias padrão semeadas com sucesso!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });