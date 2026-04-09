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
    backgroundColor: '#81b1dd',
    borderRadius: 8,
    marginBottom: 10,
  },
  periodo: {
    fontSize: 16,
    color: '#050000',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d9208',
  }
});

export default DespesaSumario;