import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import styles from '../styles/EditEventScreenStyle';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditEventScreen = ({ route, navigation }) => {
  const { id, eventData } = route.params;
  const [eventName, setEventName] = useState(eventData.eventName);
  const [eventDate, setEventDate] = useState(eventData.eventDate);
  const [description, setDescription] = useState(eventData.description || "");

  const updateEvent = async () => {
    if (!eventName || !eventDate) {
      alert("Event name and date cannot be empty.");
      return;
    }
    try {// update event in Firestore
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, { eventName, eventDate, description });
      navigation.goBack();
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };
  // set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Event",
      headerTitleAlign: "center"
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input value={eventName} onChangeText={setEventName} placeholder="Event Name" />
      <Input value={eventDate} onChangeText={setEventDate} placeholder="Event Date (e.g. 2025-12-31, Feb,9 2025)" />
      <Input value={description} onChangeText={setDescription} placeholder="Description (optional)" />
      <Button title="Update Event" onPress={updateEvent} containerStyle={styles.buttonContainer} />
    </View>
  );
};

export default EditEventScreen;
