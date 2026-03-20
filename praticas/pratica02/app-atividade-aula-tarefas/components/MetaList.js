import { StyleSheet, Text,  ScrollView } from 'react-native';

    function MetaList(props){
        return(
           <ScrollView style={styles.metaContainer}>
              {props.array.map((meta, index) => (<Text style ={styles.item} key= {index}>{meta}</Text>))}
           </ScrollView>
        )
    }

    export default MetaList
const styles = StyleSheet.create({
    item: {
       margin: 8,
       borderRadius: 5,
       padding: 10,
       backgroundColor: 'lightblue',
    },

});
