import React, { memo } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <TextInput
      placeholderTextColor="#d3d3d3" 
      style={styles.textInput}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {

  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  textInput: {
    paddingLeft: 20,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#182a2e',
    borderRadius: 50,
    marginBottom: 15,
    shadowColor: "#6759c0",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 0
    }
  }
});

export default memo(Input);
