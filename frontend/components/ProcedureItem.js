import { View, ImageBackground, Pressable, StyleSheet, Platform, StatusBar,Dimensions,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import OptionsButton from "../buttons/OptionsButton";
import {decode} from 'base-64';
import { Buffer } from 'buffer';
import * as ImageManipulator from 'expo-image-manipulator';

function ProcedureItem ({procedure, onFocusChange, focusedName, inc, onOrder, onView, startLoading, isOwner, email, ip}) {
    const [isPressed, setIsPressed] = useState(false);
    const [decodedImage, setDecodedImage] = useState(null);

    useEffect(()=>{
         const decoding = decode(procedure.pImage);
         setDecodedImage(decoding);
    }, []);


    useEffect(()=>{
        if(procedure.pName != focusedName){
            setIsPressed(false);
        }
    },[focusedName]);

    function pressHandler () {
        if(isPressed){
            setIsPressed(false);
            onFocusChange(null);
        }
        else{
            if(focusedName != null){
                onFocusChange(null);
            }
            else{
                setIsPressed(true);
                onFocusChange(procedure.pName); 
            }
        }
    }

    async function removeProcedureHandler () {
        startLoading();
        const response = await fetch(`http://${ip}:3000/procedure/delete`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              target: procedure.pName,
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            inc();
        });
    }

    function viewInfoHandler () {
        onView(procedure);
    }

    function orderProcedureHandler () {
        onOrder(procedure);
    }

   

    return (
        <Pressable style={styles.container} onPress={pressHandler} >
            <ImageBackground source={{ uri: `data:image/png;base64,${decodedImage}` }} style={styles.image} opacity= {isPressed ? 0.5 : 0.7} >
                {!(isPressed) && <Text style={styles.text}>{procedure.pName}</Text>}
                {isPressed && <View style={styles.buttonContainer}>
                    {isOwner ? <OptionsButton text="Delete" onPress={removeProcedureHandler} /> : <OptionsButton text="Order" onPress={orderProcedureHandler} /> }
                    <OptionsButton text="View" onPress={viewInfoHandler} />
                </View>}
            </ImageBackground>
        </Pressable>
    );    
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        minWidth: "100%",
        maxWidth: "100%",
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 40,
        color: "white"
    },
    image: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: 'cover',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
    }
});

export default ProcedureItem;