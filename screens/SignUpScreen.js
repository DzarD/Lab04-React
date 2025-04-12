import React, { useLayoutEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from '@rneui/themed';
import styles from '../styles/SignUpScreenStyle';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//all has t o be filled in
  const handleRegister = () => {
    if (!email || !password || !name) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        return updateProfile(userCredential.user, { displayName: name });
      })
      .then(() => navigation.navigate('Dashboard'))
      .catch(error => console.error("Registration error:", error));
  };

  // set the header options for the navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
      headerTitleAlign: "center"
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus value={email} onChangeText={setEmail} />
        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Input placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button containerStyle={styles.button} title="Register" onPress={handleRegister} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
