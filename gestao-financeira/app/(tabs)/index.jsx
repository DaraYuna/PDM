import { Text, View, ActivityIndicator } from "react-native";
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router'; 
import api from '../../services/api'; 

export default function Transactions() {
  // 1. Os estados e hooks ficam obrigatoriamente AQUI DENTRO
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchTransactions() {
        try {
          setLoading(true);
          const response = await api.get('/transactions');
          setTransactions(response.data);
        } catch (error) {
          console.error("Erro ao buscar transações do banco:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchTransactions();
    }, [])
  );

  // 2. Se estiver carregando, mostra um ícone de carregamento
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 3. Quando carregar, renderiza a tela real
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Transações</Text>
      <Text>Quantidade de transações salvas: {transactions.length}</Text>
      
      {/* Depois você pode substituir esse texto por uma FlatList para listar as transações */}
    </View>
  );
}