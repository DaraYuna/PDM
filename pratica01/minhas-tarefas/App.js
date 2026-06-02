import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_default from './util';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {{margin: 20, color: '#eb11ebff', fontSize: 30 }}>{titulo}</Text>
      <Text style = {{margin: 40}}>{titulo_default}</Text>
      <Button title = "clique aqui"/>
      <StatusBar style="auto" />
    </View>
  );
}
/*
<Text style = {{margin: 20, color: '#eb11ebff', fontSize: 30 }}>{titulo}</Text>
esse estilo acima é o inline
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

titulo_test: {
  margin: 20,
  color: '#ff0000',
  fontSize: 30
 }

});
