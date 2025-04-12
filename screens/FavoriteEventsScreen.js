import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import EventListItem from '../components/EventListItem';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Icon } from '@rneui/themed';
import styles from '../styles/FavoriteEventsScreenStyle';

const FavoriteEventsScreen = ({ navigation }) => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  // fetch events from Firestore
  useEffect(() => {
    const favQuery = query(collection(db, "events"), where("isFavorite", "==", true));
    const unsubscribe = onSnapshot(favQuery, snapshot => {
      setFavoriteEvents(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });
    return unsubscribe;
  }, []);
  // header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="feather" color="white" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const openEdit = (id, eventData) => {
    navigation.navigate("EditEvent", { id, eventData });
  };
  // function to toggle favorite state of an event
  const toggleFavorite = async (id, currentState) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, { isFavorite: !currentState });
    } catch (error) {
      console.error("Favorite update error:", error);
    }
  };
// render favorite events
  return (
    <ScrollView style={styles.container}>
      {favoriteEvents.map(({ id, data }) => (
        <EventListItem key={id} id={id} eventData={data} openEdit={openEdit} toggleFavorite={toggleFavorite} />
      ))}
    </ScrollView>
  );
};

export default FavoriteEventsScreen;
