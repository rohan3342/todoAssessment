import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const CustomTextInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  type,
  getInput,
  multiline,
  maxLength,
  customStyle,
}) => {
  const [input, setInput] = useState('');
  const [secure, setSecure] = useState(secureTextEntry);
  const dark = useSelector(state => state.home.darkTheme);

  return (
    <View style={styles.inputViewWrapper}>
      <TextInput
        secureTextEntry={secure}
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize="none"
        value={input}
        onChangeText={text => {
          setInput(text);
          getInput(text);
        }}
        placeholderTextColor="#aaa"
        placeholder={placeholder}
        style={[styles.inputBox, dark && darkTheme.inputBox, customStyle]}
        multiline={multiline}
        maxLength={maxLength}
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
    color: '#000',
  },
});

const darkTheme = StyleSheet.create({
  conatiner: {
    backgroundColor: '#383972',
  },
  inputBox: {
    backgroundColor: '#262626',
    color: '#fff',
  },
});
export default CustomTextInput;
