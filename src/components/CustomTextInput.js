import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _DarkTheme, _LightTheme, DarkTheme } from '../utils/Theme';

const { d_bgColor, d_txtColor, d_icon } = _DarkTheme;
const { l_bgColor } = _LightTheme;

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
        style={[
          styles.inputBox,
          DarkTheme() && darkTheme.inputBox,
          customStyle,
        ]}
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
    backgroundColor: l_bgColor,
    fontSize: 18,
    padding: 10,
    color: '#000',
  },
});

const darkTheme = StyleSheet.create({
  conatiner: { backgroundColor: d_icon },
  inputBox: {
    backgroundColor: d_bgColor,
    color: d_txtColor,
  },
});
export default CustomTextInput;
