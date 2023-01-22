import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Note from './Note';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-picker';
import ImagePickerExample from './ImagePickerExample';


function Notes(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', text: '', image: '', fullText: '' });




    const addNote = () => {
        setModalVisible(true);
    }



    const cancelNewNote = () => {
        setModalVisible(false);
        setNewNote({ title: '', text: '', image: '', fullText: '' });
    }
    const createNewNote = () => {
        if (newNote.title === '' || newNote.text === '' || newNote.fullText === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (props.notes.length === 0) {
            newNote.id = 1;
        }
        else {
            newNote.id = props.notes[props.notes.length - 1].id + 1;
        }
        props.onAdd(newNote, props.categoryId);



        setModalVisible(false);
        setNewNote({ title: '', text: '', image: '', fullText: '' });
    }
    const deleteNote = (id) => {
        props.onDelete(id, props.categoryId);
    }


    const pickImage = () => {
        console.log('pick image');
    }




    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={props.backToAllNotes}>
                    <Icon name="home" size={30} color="#900" />
                </TouchableOpacity>
                <Text>{props.category} {props.notes.length}</Text>


            </View>

            <View style={styles.itemList}>
                <ScrollView >
                    {props.notes.map((note) => (
                        <Note onDelete={deleteNote} key={note.id} note={note} title={note.title} />
                    ))}
                </ScrollView>
            </View>


            <TouchableOpacity style={styles.addNoteButtonContainer} onPress={addNote}>
                <Icon name="edit" size={40} color="gray" />
            </TouchableOpacity>
            {/* modal for adding mew note  */}
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>New Note</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput style={styles.modalTextInput} placeholder="Note Title" onChangeText={(text) => setNewNote({ ...newNote, title: text })} value={newNote.title} />
                        <TextInput style={styles.modalTextInput} placeholder="Note Description" onChangeText={(text) => setNewNote({ ...newNote, text: text })} value={newNote.text} />
                        {/* here will be function to get image from camera */}
                        <TextInput style={styles.modalTextInput} placeholder="Note FullText" onChangeText={(text) => setNewNote({ ...newNote, fullText: text })} value={newNote.fullText} />
                        <ImagePickerExample setImageUp={(uri)=>setNewNote({...newNote,image:uri})} />

                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveButtonContainer} onPress={createNewNote}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButtonContainer} onPress={cancelNewNote}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    );
}
export default Notes;

//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     header: {
//         flex: 1,
//         width: '100%',
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     itemList: {
//         flex: 5,
//         width: '100%',
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     addNoteButtonContainer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 20,
//         width: 70,
//         height: 70,
//         borderRadius: 50,
//         backgroundColor: 'blue',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     addNoteButtonText: {
//         color: 'white',
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     input: {
//         width: '80%',
//         height: 40,
//         borderWidth: 1,
//         borderColor: 'gray',
//         padding: 10,
//         marginVertical: 10,
//     },
//     addButtonContainer: {
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 10,
//     },
//     addButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     cancelButtonContainer: {
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 10,
//     },
//     cancelButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },

// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    addImageButtonContainer: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },

    header: {
        //all items in row
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    itemList: {
        flex: 5,
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNoteButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNoteButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    // modal styles
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    modalHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalBody: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
    modalTextInput: {
        width: '100%',
        height: 50,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,

        padding: 10,
    },
    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    cancelButtonContainer: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    saveButtonContainer: {
        backgroundColor: 'green',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButtonContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },

});


