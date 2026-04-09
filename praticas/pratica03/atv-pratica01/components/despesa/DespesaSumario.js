import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={styles.soma}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#093b69',
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  periodo: {
    fontSize: 18,
    color: '#f5f5f5',
  },
  soma: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30d12b',
  }
});

export default DespesaSumario;