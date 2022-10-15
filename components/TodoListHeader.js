import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import { LinearTextGradient } from 'react-native-text-gradient'
import { useContext, useState } from 'react'
import TodoContext from '../context/TodoContext'

const TodoListHeader = () => {
    const [newItem, setNewitem] = useState('');
    const { addItem } = useContext(TodoContext);

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Todo List</Text>
            <View style={styles.formWrapper}>
                <TextInput
                    placeholder="What do you have planned?"
                    placeholderTextColor={"#6C7481"}
                    style={styles.inputBox}
                    onChangeText={input => setNewitem(input)}
                    defaultValue={newItem}
                />
                <Pressable style={styles.inputButton} onPress={() =>{ 
                        addItem(newItem)
                        setNewitem('')
                    }}>
                    <LinearTextGradient
                        style={styles.inputButtonText}
                        locations={[0, 1]}
                        colors={["#DD4AA4", "#985AF0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        >
                        <Text>Add Task</Text>
                    </LinearTextGradient>
                </Pressable>
            </View>
            <Text style={styles.subHeaderText}>Todos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#364150',
    },
    headerText: {
        color: "#6C7481",
        fontSize: 30,
        marginTop: 15,
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    inputBox: {
        backgroundColor: '#1E2836',
        borderRadius: 15,
        flex: 1,
        padding: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    inputButton: {
        padding: 12,
    },
    inputButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    subHeaderText: {
        color: '#6C7481',
        fontSize: 20,
        marginTop: 40,
        marginBottom: 10,
    },
})

export default TodoListHeader;