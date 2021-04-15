import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  type,
  getInput,
}) => {
  const [input, setInput] = useState('');
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={styles.inputViewWrapper}>
      <TextInput
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCorrect={false}
        value={input}
        onChangeText={text => {
          setInput(text);
          getInput(text);
        }}
        placeholder={placeholder}
        style={styles.inputBox}
      />
      {type && type === 'password' && (
        <TouchableOpacity
          onPress={() => setSecure(!secure)}
          style={styles.inputIconView}>
          <Ionicons
            name={secure ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="#aaa"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputViewWrapper: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputIconView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    minHeight: 50,
    height: 55,
    width: '90%',
    backgroundColor: '#fff',
    fontSize: 18,
    padding: 10,
  },
});

export default CustomTextInput;
