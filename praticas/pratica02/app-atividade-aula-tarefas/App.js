import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { rotulo_btn_cadastro_meta,  rotulo_input_meta } from './mensagens';
import { useState} from 'react';

import MetaList from './components/MetaList';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState("");
  const [metas, setMetas] = useState([])
  
  function adicionarMetaHandler (inputText){
    setInputMetaText(inputText)
  };
  
  function metaInputHandler (){
    setMetas([...metas, inputMetaText])
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    flex: 1}}>
        <View style={{width:'65%'}}>
          <TextInput onChangeText={metaInputHandler} style = {styles.inputText} placeholder = {rotulo_input_meta} />
        </View>

        <View style={{width:'30%'}}>
          <Button onPress={adicionarMetaHandler} color = '#ad0cadff' title = {rotulo_btn_cadastro_meta} />
        </View>

      </View>
        <View style={styles.metaContainer}>
          <MetaList array={metas}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: {
  padding: 30,
  flex: 1,
  flexDirection: 'column',
  },

  inputText: {
    borderColor: '#791b1bcc',
    borderWidth: 1,
  },

  metaContainer: {
    flex: 15,
  },

});
