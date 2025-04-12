import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import styles from '../styles/AddEventScreenStyle';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
/// function to create a new event
  const createEvent = async () => {
    if (!eventName || !eventDate) {
      alert("Event name and date are required.");
      return;
    }
    try {// add event to Firestore
      await addDoc(collection(db, "events"), {
        eventName,
        eventDate,
        description,
        owner: auth.currentUser?.uid || "",
        isFavorite: false,
        timestamp: serverTimestamp(),// to keep track of when the event was created and sort them later
      });
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
    <View style={styles.inputWrapper}>
      <Input
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <Input
        placeholder="Event Date (e.g., 2025-12-31)"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <Input
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Create Event"
        onPress={createEvent}
        containerStyle={styles.buttonContainer}
      />
    </View>
  </View>
  );
};

export default AddEventScreen;
