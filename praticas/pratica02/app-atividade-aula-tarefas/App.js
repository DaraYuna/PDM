import { StyleSheet, View, Image} from 'react-native';
import { useState} from 'react';
import MetaList from './components/MetaList';
import MetaInput from './components/MetaInput';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const [metas, setMetas] = useState([]);
  
  function metaInputHandler (inputText){
    setInputMetaText(inputText)
  };
  
  function adicionarMetaHandler (inputMeta){
    const novaMeta = {id: Math.random().toString(),texto: inputMeta};
    setMetas([...metas, novaMeta]);
  };

  function deletarMetaHandler (id){
    console.log(id);
    const novasMetas = metas.filter(meta => meta.id !== id);
    setMetas(novasMetas);
  };

  return (
   <SafeAreaProvider> 
   <SafeAreaView style={styles.safeArea}>
    <View style={styles.topo}>
      <Text style={styles.headerText}>Minhas Metas</Text>
    
    <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://www.logoai.com/oss/icons/2021/10/27/NTs7EMHlHtbJE3B.png' }}
          style={{ width: 80, height: 100 }}
          resizeMode='contain'
        />
  </View>

  <View>
      <Text style={styles.headerText}>Minhas METAS</Text>
      </View>
  </View>

    <View style={styles.mainContainer}>

       <MetaInput onAddMeta={adicionarMetaHandler}/>

      <View style={styles.metaContainer}>
          <MetaList array={metas}
           onDeleteItem = {deletarMetaHandler}/>
        </View>
        
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
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

  image:{
    width: 50,
    height: 50,
  },

  safeArea:{
    backgroundColor:'#fff',
    flex: 1,
  },

  imageContainer:{
    alignItems:'left',
    marginTop:10,
    paddingLeft:30,
  },

    topo:{
    alignItems:'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

    headerText:{
    fontSize: 20,
    marginLeft: 10,
  },

});
