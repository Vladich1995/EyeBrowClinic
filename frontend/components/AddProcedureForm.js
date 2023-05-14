import { SafeAreaView, View, Alert, StyleSheet, Dimensions, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { useEffect, useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {encode} from 'base-64';
import * as ImageManipulator from 'expo-image-manipulator';
import RegisterButton from "../buttons/RegisterButton";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function AddProcedureForm ({cancelHandler, inc, startLoading, stopLoading, ip}) {
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
        if(procedureName != "" && procedureDuration != "" && procedurePrice != "" && procedureGoal != "" && procedureDescription != ""){
            startLoading();
            try{
                const response = await fetch(`http://${ip}:3000/procedure/add`,{
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
        
    }

    // const imageUploadHandler = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         quality: 1,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         base64: false,
    //     });
      
    //     if (!result.canceled) {
    //       const asset = result.assets[0];
    //       const response = await fetch(asset.uri);
    //       const blob = await response.blob();
    //       const reader = new FileReader();
    //       reader.readAsDataURL(blob);
    //       reader.onloadend = () => {
    //         const base64data = reader.result.replace("data:", "").replace(/^.+,/, "");
    //         const encodedImage = encode(base64data);
    //         setPimage(encodedImage);
    //       }
    //     }
    //   };
    const imageUploadHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsEditing: true,
          aspect: [1, 1],
          base64: false,
        });
            
        if (!result.canceled) {
          const asset = result.assets[0];
          const compressedAsset = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: 500 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
          const response = await fetch(compressedAsset.uri);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result.replace("data:", "").replace(/^.+,/, "");
            const encodedImage = encode(base64data);
            setPimage(encodedImage);
          }
        }
      };
      
      
      
      
      
      

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                    <TextInput style={[styles.shortInput]} placeholderTextColor={"white"} placeholder="Procedure name" onFocus={()=>setNameFocused(true)} onBlur={()=>setNameFocused(false)} onChangeText={setProcedureName} value={procedureName} />
                    <TextInput style={[styles.shortInput]} placeholderTextColor={"white"} placeholder="duration" onFocus={()=>setDurationFocused(true)} onBlur={()=>setDurationFocused(false)} onChangeText={setProcedureDuration} value={procedureDuration} />
                    <TextInput style={[styles.shortInput]} placeholderTextColor={"white"} placeholder="Price" onFocus={()=>setPriceFocused(true)} onBlur={()=>setPriceFocused(false)} onChangeText={setProcedurePrice} value={procedurePrice} />
                    <TextInput style={[styles.shortInput]} placeholderTextColor={"white"} placeholder="Goal" onFocus={()=>setGoalFocused(true)} onBlur={()=>setGoalFocused(false)} onChangeText={setProcedureGoal} value={procedureGoal} />
                    <View style={{marginTop: 0.027*height,}}>
                        <Button title="Browse image" onPress={imageUploadHandler} />
                    </View>
                    <TextInput style={[styles.longInput]} placeholderTextColor={"white"} placeholder="Description" onFocus={()=>setDescriptionFocused(true)} onBlur={()=>setDescriptionFocused(false)} onChangeText={setProcedureDescription} value={procedureDescription} multiline={true} textAlignVertical="top" />
                    <RegisterButton text="Submit" onPress={addProcedureHandler} />
                    <RegisterButton text="Cancel" onPress={cancelHandler} />
                </LinearGradient>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: 0.73*height,
        width: 0.8*width,
        top: 0.12*height,
        borderWidth: 1,
        borderRadius: 30,
        zIndex: 1,
    },
    gradient: {
        height: 0.73*height,
        alignItems: "center",
        borderRadius: 30,
    },
    shortInput: {
        height: 0.07*0.6*height,
        width: 0.8*0.8*width,
        marginTop: 0.027*height,
        textAlign: "left",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        color: "white"
    },
    longInput: {
        height: 0.2*0.6*height,
        width: 0.8*0.8*width,
        marginTop: 0.027*height,
        color: "white",
        borderWidth: 1,
        borderColor: "white"
    },
});

export default AddProcedureForm;