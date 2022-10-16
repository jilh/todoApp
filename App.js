import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, ToastAndroid, ActivityIndicator, Pressable, Text} from 'react-native'
import TodoItem from './components/TodoItem';
import TodoListHeader from './components/TodoListHeader';
import TodoContext from './context/TodoContext';
const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListItem();
  }, []);

  useEffect(() => {
    storeListItem(todoList)
  }, [todoList]);
  
  const storeListItem = async (value) => {
    try {
      await AsyncStorage.setItem('todolist', JSON.stringify(value));
    }catch ( error ){
      console.log('Unable to save data');
    }
  }

  const getListItem = async () => {
    try{
      const savedList = await AsyncStorage.getItem('todolist');
      if(savedList != null && JSON.parse(savedList).length != 0){
        setTodoList(JSON.parse(savedList));
        setLoading(false);
      }else{
        fetch('http://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((json) => {
          if( json.length > 5 ) {json.length = 5}
          setTodoList(json);
          setLoading(false);
        })
        .catch((error) => console.error(error))
      }
    }catch{
      console.log("Unable to retrived saved list")
    }
  }
  
  const addItem = (text) => {
    if(text === ''){
      // alert("You cannot add empty text")
      ToastAndroid.showWithGravity(
        "You cannot add empty text",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
        );
    }else{
      let lastElementInList = todoList.slice(-1);
      
      let uniqueID = lastElementInList.length === 0 ? 0 : lastElementInList[0].id + 1;
      setTodoList([...todoList, {id: uniqueID, userId: 1, title: text, completed: false}])
    }
  }

  const editList = (id, text) => {
    const newList = [...todoList]
    const itemIndex = todoList.findIndex( f => f.id === id);

    newList[itemIndex].title = text;

    setTodoList(newList);
  }

  const deleteItem = (itemId) => {
    setTodoList(todoList.filter(list => list.id !== itemId))
  }

  

  return(
      <TodoContext.Provider value={{todoList, addItem, editList, deleteItem}}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={todoList}
            renderItem={({item, index}) => <TodoItem item={item} key={index} />}
            keyExtractor={todoItem => todoItem.id}
            ListHeaderComponent={TodoListHeader}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListEmptyComponent={<Text style={styles.emptyList}>You don't have any todo item yet</Text>}
          />
        </SafeAreaView>
        { loading && 
          <View style={styles.loadingScreen}>
            <ActivityIndicator size={"large"} color="#DD4AA4" />
            <Text style={styles.infoText}>Getting local or remote tasks...</Text>
            <Pressable style={styles.button} onPress={() => setLoading(false)}>
              <Text style={styles.buttonText}>Skip</Text>
            </Pressable>
          </View> }
      </TodoContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#364150",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingScreen: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
    width: '100%',
    height: '100%',
  },
  infoText: {
    color: '#fff',
  },
  button: {
    padding: 12,
    backgroundColor: '#DD4AA4',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
  },
  emptyList: {
    color: '#fff',
  }
})

export default App;











































// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next: Trust you're doing
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
