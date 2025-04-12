import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import EventListItem from '../components/EventListItem';
import { auth, db } from '../firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Icon } from '@rneui/themed';
import styles from '../styles/DashboardScreenStyle';

const DashboardScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  const signOut = () => {
    auth.signOut()
      .then(() => navigation.replace('Login'))
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    console.log("Current user UID:", auth.currentUser?.uid);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), snapshot => {
      setEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Welcome ${auth.currentUser?.displayName}`,
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={signOut}>
          <Icon name="log-out" type="feather" color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Favorites')}>
            <Icon name="heart" type="font-awesome" color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddEvent')}>
            <Icon name="plus" type="feather" color="white" />
          </TouchableOpacity>
        </>
      )
    });
  }, [navigation]);
// function to open edit event screen
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
// render events mapped
  return (
    <ScrollView style={styles.container}>
      {events.map(({ id, data }) => (
        <EventListItem
          key={id}
          id={id}
          eventData={data}
          openEdit={openEdit}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </ScrollView>
  );
};

export default DashboardScreen;
