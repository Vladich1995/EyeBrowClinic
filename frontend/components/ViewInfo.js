import {View, Text,ScrollView, StyleSheet, Button, Pressable, TouchableWithoutFeedback} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {encode} from 'base-64';
import * as ImageManipulator from 'expo-image-manipulator';
import UpdateProcedureForm from "./UpdateProcedureForm";

function ViewInfo ({procedure, onClose, inc, isOwner, ip}) { 
    const [propToUpdate, setPropToUpdate] = useState(null);
    const [updateImage, setUpdateImage] = useState(false);
    const [name, setName] = useState(procedure.pName);
    const [price, setPrice] = useState(procedure.pPrice);
    const [duration, setDuration] = useState(procedure.pDuration);
    const [goal, setGoal] = useState(procedure.pGoal);
    const [description, setDescription] = useState(procedure.pDescription);
    const [pImage, setPimage] = useState(null);


    useEffect(()=>{
        async function update () {
            if(pImage != null){
                const response = await fetch(`http://${ip}:3000/procedure/update`,{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: procedure.pName,
                    property: "pImage",
                    value: pImage
                }),
                }).then((response) => {
                return response.json();
                }).then((data) => {
                    if(data.success){
                        inc();
                    }
                });
            }
        }
        update();
        
        setPimage(null);
    },[pImage]);

    function setNewValue(prop, value){
        if(prop == "pName"){
            setName(value);
        }
        if(prop == "pPrice"){
            setPrice(value);
        }
        if(prop == "pDuration"){
            setDuration(value);
        }
        if(prop == "pGoal"){
            setGoal(value);
        }
        if(prop == "pDescription"){
            setDescription(value);
        }
    }

    async function imageUpdateHandler () {
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
    }

    if(isOwner){
        if(!updateImage){
            return (
                <View style={styles.container}>
                    <LinearGradient colors={["#FF67B3","#422D74"]} style={styles.gradient} >
                        {(propToUpdate != null) && <UpdateProcedureForm prop={propToUpdate} cancel={()=>setPropToUpdate(null)} procedure={procedure} inc={()=>inc()} pageUpdate={setNewValue} ip={ip} /> }
                        <ScrollView style={styles.scroll} scrollEventThrottle={25}>
                            <Pressable style={styles.titleContainer} android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pName")} >
                                <Text style={styles.title} >{name}</Text>
                            </Pressable>
                            <Pressable android_ripple={{color: "sky-blue"}}  onLongPress={()=>setPropToUpdate("pPrice")} >
                                <Text style={styles.price} >מחיר: {price}</Text>
                            </Pressable>
                            <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pDuration")} >
                                <Text style={styles.duration} >זמן מוערך: {duration}</Text>
                            </Pressable>
                            <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pGoal")} >
                                <Text style={styles.goal} >מטרת הטיפול: {goal}</Text>
                            </Pressable>
                            <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pDescription")} >
                                <Text style={styles.description} >על הטיפול: {description}</Text>
                            </Pressable>
                        </ScrollView>
                        <View style={styles.buttonsContainer}>
                            {isOwner && <Button title="החלפת תמונה" onPress={()=>setUpdateImage(true)} />}
                            <Button title="סגירה" onPress={()=>onClose()} />
                        </View>
                    </LinearGradient>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <LinearGradient colors={["#FF67B3","#422D74"]} style={styles.gradient} >
                        <View style={styles.imageButtons}>
                            <Button title="Browse" onPress={imageUpdateHandler} />
                            <Button title="cancel" onPress={()=>setUpdateImage(false)} />
                        </View>
                    </LinearGradient>
                </View>
            );
        }
    }
    else{
        return (
            <View style={styles.container}>
                <LinearGradient colors={["#FF67B3","#422D74"]} style={styles.gradient} >
                    <ScrollView style={styles.scroll} scrollEventThrottle={25}>
                    <View style={styles.titleContainer} >
                        <Text style={styles.title} >{name}</Text>
                    </View>
                    <View >
                        <Text style={styles.price} >מחיר: {price}</Text>
                    </View>
                    <View>
                        <Text style={styles.duration} >זמן מוערך: {duration}</Text>
                    </View>
                    <View>
                        <Text style={styles.goal} >מטרת הטיפול: {goal}</Text>
                    </View>
                    <View>
                        <Text style={styles.description} >על הטיפול: {description}</Text>
                    </View>
                    </ScrollView>
                </LinearGradient>
                <View style={styles.buttonsContainer}>
                        <Button title="סגירה" onPress={()=>onClose()} />
                </View>
            </View>
        );
     }
}

const styles = StyleSheet.create({
    container: {
        height:600,
        width: 320,
        position: "absolute",
        top: 30,
        zIndex: 0.8,
        borderRadius: 20,
    },
    titleContainer: {
        width: "100%",
        alignItems: "center"
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        alignItems: "center",
       
    },
    priceContainer: {

    },
    durationContainer: {

    },
    goalContainer: {

    },
    description: {
        flex: 1
    },
    buttonsContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
    },
    scroll: {
        borderRadius: 20,
    }
});

export default ViewInfo;