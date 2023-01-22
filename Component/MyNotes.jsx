import { StatusBar } from 'expo-status-bar';
import { Dimensions,StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput,Alert,SafeAreaView} from 'react-native';
import Note from './Note';
import Notes from './Notes';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'



// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();
const categorys = [

  {
    name: 'All',
    id: 1,
    notes: [
      {
        id: 1,
        title: 'Geeks For Geeks',
        image:  'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' ,
        text: 'A Computer Science portal for Geeks',
        fullText: 'ssdsd dfasdasdawr vbcxvbdf asdlkajdkl  asdasdas asdad asdsdsd qwqw gfg gdfse wewew weqwA DDDDDDDD DDDDDDD DDDDDDDD DDDDDD DDDDDDD DDDDDD '
      },
      {
        id: 2,
        title: 'Geeks For Geeks',
        image:  'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' ,
        text: 'A Computer Science portal for Geeks',
        fullText: 'A Computer Science portal for Geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.'
      },

    ]
  },
  {
    name: 'Work',
    id: 2,
    notes: [
      {
        id: 1,
        title: 'Geeks For Geeks',
        image:  'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' ,
        text: 'A Computer Science portal for Geeks',
        fullText: 'A Computer Science portal for Geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.'
      },
      {
        id: 2,
        title: 'Geeks For Geeks',
        image:  'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' ,
        text: 'A Computer Science portal for Geeks',
        fullText: 'A Computer Science portal for Geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.'
      },
      {
        id: 3,
        title: 'Geeks For Geeks',
        image:  'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' ,
        text: 'A Computer Science portal for Geeks',
        fullText: 'A Computer Science portal for Geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.'
      },
    ]
  },



];

export default function MyNotes() {
  const [categories, setCategories] = useState(categorys);
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCatogry, setNewCatogry] = useState('');
  const [categoriesVisible, setCategoriesVisible] = useState(true);
  const [newCaegoryName, setNewCaegoryName] = useState('');

  const showNotes = (category) => {
    setActiveCategory(category);
    setCategoriesVisible(false);

  }
  const viewAll = () => {
    setActiveCategory(null);
    setCategoriesVisible(true);
  }
  const deleteNote = (noteId, categoryId) => {
    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        category.notes = category.notes.filter(note => note.id !== noteId);
      }
      return category;
    });
    setCategories(newCategories);
  }
  //this function is for adding new note
  const addNewNote = (note, categoryId) => {
    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        category.notes.push(note);
      }
      return category;
    });
    setCategories(newCategories);
  }
  const cancelNewCategory = () => {
    setModalVisible(false);
    setNewCaegoryName('');
  }
  const addNewCategory = () => {
    const newCategory = {
      name: newCaegoryName,
      id: categories.length + 1,
      notes: []
    }
    setCategories([...categories, newCategory]);
    setModalVisible(false);
    setCategoriesVisible(true);
    setNewCaegoryName('');
    Alert.alert("New Category Added")
    
  }


  return (

    <View style={styles.container}>

      
      <View style={styles.notes && { display: categoriesVisible ? 'flex' : 'none' }}>
        <Text style={styles.headerOfTheApp}>MyNotes</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoriesItemes} onPress={() => showNotes(item)}>
              <Text style={styles.categoriesItemesTxt}>Topc: {item.name} count: {item.notes.length}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <View>
          <TouchableOpacity style={styles.btnAdd} onPress={() => { { setModalVisible(true) } { setCategoriesVisible(false) } }}>
            <Icon name="add" size={40} color="white" />
     
          </TouchableOpacity>

        </View>

      </View>


      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>New Category</Text>
          </View>
          <View style={styles.modalBody}>
            <TextInput style={styles.modalTextInput} placeholder="Note Category" onChangeText={(text) => setNewCaegoryName(text)} value={newCaegoryName} />

          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.saveButtonContainer} onPress={addNewCategory}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButtonContainer} onPress={() => { { setNewCaegoryName('') } { setModalVisible(false) } { setCategoriesVisible(true) } }}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View style={styles.activeCategoryList&&{ display: activeCategory != null ? 'flex' : 'none' }}>
        {activeCategory && <Notes onAdd={addNewNote} onDelete={deleteNote} backToAllNotes={viewAll} notes={activeCategory.notes} category={activeCategory.name} categoryId={activeCategory.id} />}
      </View>

      <StatusBar style="auto" />
    </View>
  )
}
//style
const styles = StyleSheet.create({
  
  headerOfTheApp: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, 

  },
  btnAdd:{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
},
activeCategoryList: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
},
categoriesItemesTxt: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'red',
},


  categoriesItemes: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: Dimensions.get('window').width*0.8,
   
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

   

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    
  
  },
  notes: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
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
    height: 55,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 15,

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
