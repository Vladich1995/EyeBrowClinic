import { SafeAreaView, View, Alert, StyleSheet, Picker, Button,TextInput,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function UpdateProcedureForm ({prop, cancel, procedure}) {
    const [title, setTitle] = useState("");
    const [needUpdateImage, setNeedUpdateImage] = useState(false);
    const [newValue, setNewValue] = useState("");
    
    useEffect(()=>{
        if(prop == "pName"){
            setTitle("שם פרוצדורה");
        }
        if(prop == "pPrice"){
            setTitle("מחיר");
        }
        if(prop == "pDuration"){
            setTitle("זמן טיפול");
        }
        if(prop == "pGoal"){
            setTitle("מטרת הטיפול");
        }
        if(prop == "pDescription"){
            setTitle("הסבר על הטיפול");
        }
        if(prop == "pImage"){
            setNeedUpdateImage(true);
        }
    },[]);


    async function updateHandler() {
        //prop-> name of the prop
        //newValue -> the new information we want to insert
        const response = await fetch("http://192.168.137.154:3000/procedure/update",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: procedure.pName,
                property: prop,
                value: newValue
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.message);
        });
    }


    function cancelHandler() {
        cancel();
    }

    return (
        <View style={styles.container} >
            <View style={styles.titleContainer} >
                <Text>הזיני ערך חדש ל"{title}"</Text>
            </View>
            <View style={styles.inputContainer} >
                <TextInput style={styles.input} multiline={true} textAlignVertical="top" onChangeText={setNewValue} value={newValue} placeholder="הפרטים החדשים שתרצי לשמור" />
            </View>
            <Button title="עדכן" onPress={updateHandler} />
            <Button title="בטל" onPress={cancelHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: "80%",
        backgroundColor: "green",
        zIndex: 1,
        position: "absolute"
    },
    titleContainer: {
        alignItems: "center"
    },
    inputContainer: {
        flex: 1,
    },
    input:{
        flex: 1,
        backgroundColor: "white",
        
    }
});

export default UpdateProcedureForm;