import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import LoginButton from "../buttons/LoginButton";

function AddProcedureForm ({cancelHandler,inc}) {
    const [procedureName, setProcedureName] = useState("");
    const [procedureDuration, setProcedureDuration] = useState("");
    const [procedurePrice, setProcedurePrice] = useState("");
    const [procedureGoal, setProcedureGoal] = useState("");
    const [procedureDescription, setProcedureDescription] = useState("");
    const [pImage, setPimage] = useState("");

    const [nameFocused, setNameFocused] = useState(false);
    const [durationFocused, setDurationFocused] = useState(false);
    const [priceFocused, setPriceFocused] = useState(false);
    const [goalFocused, setGoalFocused] = useState(false);
    const [descriptionFocused, setDescriptionFocused] = useState(false);

    async function addProcedureHandler() {
        try{
            const response = await fetch("http://192.168.1.12:3000/procedure/add",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pName: procedureName,
              pDuration: procedureDuration,
              pPrice: procedurePrice,
              pGoal: procedureGoal,
              pDescription: procedureDescription,
              pImage: pImage
            }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                inc();
                cancelHandler();
                if(!data.success){
                    Alert.alert(data.message, "Something went wrong..",[
                        {text: "ok", style: "cancel"},
                    ])
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function imageUploadHandler() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setPimage(result.assets[0].uri);
        }
      };


    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <TextInput style={[styles.shortInput,{borderWidth: nameFocused ? 1 : 0}]} placeholder="Procedure name" onFocus={()=>setNameFocused(true)} onBlur={()=>setNameFocused(false)} onChangeText={setProcedureName} value={procedureName} />
                <TextInput style={[styles.shortInput,{borderWidth: durationFocused ? 1 : 0}]} placeholder="duration" onFocus={()=>setDurationFocused(true)} onBlur={()=>setDurationFocused(false)} onChangeText={setProcedureDuration} value={procedureDuration} />
                <TextInput style={[styles.shortInput,{borderWidth: priceFocused ? 1 : 0}]} placeholder="Price" onFocus={()=>setPriceFocused(true)} onBlur={()=>setPriceFocused(false)} onChangeText={setProcedurePrice} value={procedurePrice} />
                <TextInput style={[styles.shortInput,{borderWidth: goalFocused ? 1 : 0}]} placeholder="Goal" onFocus={()=>setGoalFocused(true)} onBlur={()=>setGoalFocused(false)} onChangeText={setProcedureGoal} value={procedureGoal} />
                <Button title="Browse image" style={styles.nativeButton} onPress={imageUploadHandler} />
                <TextInput style={[styles.longInput,{borderWidth: descriptionFocused ? 1 : 0, textAlign: !descriptionFocused ? "center" : "auto"}]} placeholder="Description" onFocus={()=>setDescriptionFocused(true)} onBlur={()=>setDescriptionFocused(false)} onChangeText={setProcedureDescription} value={procedureDescription} multiline={true} textAlignVertical="top" />
                <View style={styles.buttonsContainer}>
                    <LoginButton text="Submit" onPress={addProcedureHandler} />
                    <LoginButton text="Cancel" onPress={cancelHandler} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 450,
        width: 250,
        top: 100,
        zIndex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: "center"
    },
    shortInput: {
        height: 30,
        width: "80%",
        backgroundColor: "white",
        marginTop: 20,
        textAlign: "center",
    },
    longInput: {
        height: 100,
        width: "80%",
        backgroundColor: "white",
        marginTop: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    },
    nativeButton: {
        marginTop: 20,
    }
});

export default AddProcedureForm;