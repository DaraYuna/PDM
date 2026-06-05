import { StyleSheet, Text,  ScrollView, Pressable, View } from 'react-native';

//function MetaList(props){
//    return(
//    <ScrollView>
//        {props.array.map((meta, index) =>
//         <Text style={styles.item} key={index}>{meta} </Text>)}
//     </ScrollView>
//    );
//};

function MetaList(props){
    return(
    <ScrollView>
        {props.array.map((meta) => {
        return (
            <View key={meta.id} style={styles.item}>
          <Pressable
           android_ripple={{color: '#15c206'}}
           onPress={()=> props.onDeleteItem(meta.id)}
          >
          <Text style={{}}> {meta.texto} </Text>
           </Pressable>
           </View>
        ) 
        }
         )}
     </ScrollView>
    );
};

export default MetaList;

const styles = StyleSheet.create({
    item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  }
})