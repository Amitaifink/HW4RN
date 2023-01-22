import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Dimensions } from 'react-native';
import MyNotes from './Component/MyNotes';
import Note from './Component/Note';
import Notes from './Component/Notes';


export default function App() {
  
  return (
    
    <SafeAreaView style={styles.container}>
     <MyNotes style={styles.myNotes} /> 
     <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',


  },
  myNotes:{
    flex:1,
    backgroundColor: '#fff',
  }

});
