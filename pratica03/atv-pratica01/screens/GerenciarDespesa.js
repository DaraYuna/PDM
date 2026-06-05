import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

function GerenciarDespesa() {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);
    if (match) {
      setValor(cleanText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0d5',
    paddding: 20,
  },
  inputContainer: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: '#0a000a'
  },
  input: {
    borderWidth: 1,
    borderColor: '#046b0d',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#e2c6e0'
  },
});

export default GerenciarDespesa;