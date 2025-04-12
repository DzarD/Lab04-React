import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import styles from '../styles/DashboardScreenStyle';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const EventListItem = ({ id, eventData, openEdit, toggleFavorite }) => {
  const { eventName, eventDate, isFavorite } = eventData;
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'events', id));
      console.log("deleted", id);
    } catch (error) {
      console.error("delete failed:", error);
    } finally {
      setConfirming(false);
    }
  };
/// function to toggle favorite state of an event
  return (
    <ListItem bottomDivider>
      <TouchableOpacity onPress={() => openEdit(id, eventData)} style={{ flex: 1 }}>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{eventName}</ListItem.Title>
          <ListItem.Subtitle>{eventDate}</ListItem.Subtitle>
        </ListItem.Content>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleFavorite(id, isFavorite)}>
        <Icon
          name={isFavorite ? "heart" : "heart-o"}
          type="font-awesome"
          color={isFavorite ? "red" : "gray"}
        />
      </TouchableOpacity>
    
      {!confirming ? (
        <TouchableOpacity onPress={() => setConfirming(true)}>
          <Icon name="trash" type="feather" color="red" />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={handleDelete}>
            <Icon name="check" type="feather" color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setConfirming(false)}>
            <Icon name="x" type="feather" color="gray" />
          </TouchableOpacity>
        </>
      )}
    </ListItem>
  );
};

export default EventListItem;
