import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Platform } from 'react-native';


const Note = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedButton, setExpandedButton] = useState("Read More");

  return (
    <Card style={[styles.container, props.containerStyle, Platform.OS === 'ios' ? styles.iosContainer : null]}>
      <Card.Content>
        <Title style={[styles.title, props.titleStyle]}>{props.note.title}</Title>
      </Card.Content>
      {props.note.image && <Card.Cover source={{ uri:props.note.image}} style={[styles.image, props.imageStyle]} />}
      {expanded ? (
        <Card.Content>
          <Paragraph style={[styles.text, props.textStyle]}>{props.note.fullText}</Paragraph>
        </Card.Content>
      ) : (
        <Card.Content>
          <Paragraph style={[styles.text, props.textStyle]} numberOfLines={3}>{props.note.text}</Paragraph>
        </Card.Content>
      )}
      <Card.Actions style={[styles.buttonContainer, props.buttonContainerStyle]}>
        <Button style={[styles.button, props.buttonStyle]} title={expandedButton} onPress={() => {
          setExpanded(!expanded);
          setExpandedButton(expandedButton === "Read More" ? "Read Less" : "Read More");
        }}>{expandedButton}</Button>
        <TouchableOpacity style={styles.trushButtonContainer} onPress={()=>{props.onDelete(props.note.id)}}>

          <Icon name="delete" size={30} color="gray" />
        </TouchableOpacity>
      </Card.Actions>
      
    </Card>
  );
};
export default Note;

Note.defaultProps = {
  containerStyle: {},
  titleStyle: {},
  imageStyle: {},
  textStyle: {},
  buttonContainerStyle: {},
  buttonStyle: {}
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    
 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  iosContainer: {
    // Additional styles for iOS devices
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  trushButtonContainer: {
    marginLeft: 10,
  }

});

