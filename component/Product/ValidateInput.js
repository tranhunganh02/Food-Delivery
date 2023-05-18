import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
const ValidateInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
         
            <TextInput
            value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input,{borderColor: error ? 'red' : 'gray'}]}
              secureTextEntry={secureTextEntry}
            />
          
          {error && (
            <Text style={{color: 'red',top:-5}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    borderWidth: 1,
    height: 50,
  },
});

export default ValidateInput;