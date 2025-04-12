import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from '@rneui/themed';
import styles from '../styles/LoginScreenStyle';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
///all has to be filled in
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.replace('Dashboard');
      })
      .catch(error => {
        alert("Invalid credentials or network issue");
      });
  };

  // set the header options for the navigation
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
    <Image
      source={require('../assets/icon-event.png')}
      style={{ width: 150, height: 150, marginBottom: 20, alignSelf: 'center' }}
      resizeMode="contain"
    />
    <View style={styles.inputWrapper}>
        <Input placeholder="Email" autoFocus value={email} onChangeText={setEmail} />
        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
    </View>
    <View style={{ alignItems: 'center' }}>
        <Button containerStyle={styles.button} title="Login" onPress={handleLogin} />
        <Button containerStyle={styles.button} type="clear" title="Register" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
