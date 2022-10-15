import {View, Text, Pressable, StyleSheet, Modal, TextInput} from 'react-native'
import { LinearTextGradient } from 'react-native-text-gradient'
import { useContext, useState } from 'react'
import TodoContext from '../context/TodoContext'

const TodoItem = ({ item }) => {
    const { deleteItem } = useContext(TodoContext);
    const { editList } = useContext(TodoContext);
    const [modal, setModal] = useState(false);
    const [updateText, setUpdateText] = useState('');
    const [updatePayload, setUpdatePayload] = useState({
        id: null,
        userId: null,
        title: null,
        completed: false,
    })
    return(
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{ item.title }</Text>
            <Pressable style={styles.editButton} onPress={
                () => {
                        setUpdatePayload({
                            id: item.id,
                            userId: item.userId,
                            title: item.title,
                            completed: item.completed,
                        });

                        console.log(updatePayload);
                        setModal(true)
                    }
            }>
                {/* <Text style={styles.editText}>Edit</Text> */}
                <LinearTextGradient
                    style={styles.editText}
                    locations={[0, 1]}
                    colors={["#DD4AA4", "#985AF0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    >
                    <Text>Edit</Text>
                </LinearTextGradient>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(false)}>
                    <View style={styles.modal}>
                        <View style={styles.modalFormWrapper}>
                            <TextInput
                                placeholder="What do you have planned?"
                                placeholderTextColor={"#6C7481"}
                                style={styles.modalInputBox}
                                onChangeText={input => setUpdateText(input)}
                                defaultValue={updatePayload.title}
                            />
                            <Pressable style={styles.modalInputButton} onPress={() =>{ 
                                    editList(updatePayload.id, updateText === '' ? updatePayload.title : updateText)
                                    setModal(false)
                                    
                                }}>
                                <LinearTextGradient
                                    style={styles.modalInputButtonText}
                                    locations={[0, 1]}
                                    colors={["#DD4AA4", "#985AF0"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    >
                                    <Text>Update Item</Text>
                                </LinearTextGradient>
                            </Pressable>
                            <Pressable style={styles.modalInputButton} onPress={() =>{ 
                                    setModal(false)
                                }}>
                                
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#0F1726',
        display: 'flex',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 15,
    },
    itemTitle: {
        color: '#fff',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    editButton: {
        padding: 10,
    },
    editText: {
        color: 'yellow',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        padding: 10,
    },
    deleteText: {
        color: '#E3123B',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modal: {
        backgroundColor: '#0F1726',
        flex: 1,
    },
    modalFormWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    modalInputBox: {
        backgroundColor: '#1E2836',
        borderRadius: 15,
        padding: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        width: '100%',
    },
    modalInputButton: {
        padding: 12,
    },
    modalInputButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalCancelButtonText: {
        color: '#E3123B',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
    }
})
export default TodoItem;