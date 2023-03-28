import { SafeAreaView, View, Alert, StyleSheet, ImageBackground, StatusBar,TextInput,Pressable, Dimensions, Text } from "react-native";
import { useEffect, useState } from "react";
import OptionsButton from "../buttons/OptionsButton";
import {decode} from 'base-64';

function GalleryItem ({galleryItem, onFocusChange, focusedName, inc, onView, startLoading, isOwner, type}) {
    const [isPressed, setIsPressed] = useState(false);
    const [decodedImage, setDecodedImage] = useState(null);
    const screenWidth = Dimensions.get('window').width;

    useEffect(()=>{
         const decoding = decode(galleryItem.url);
         setDecodedImage(decoding);
    }, []);


    useEffect(()=>{
        if(galleryItem.key != focusedName){
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
                onFocusChange(galleryItem.key); 
            }
        }
    }

    async function removeGalleryItemHandler () {
        startLoading();
        const response = await fetch((type == "certificates") ? "http://192.168.137.154:3000/certificate/delete" : "http://192.168.137.154:3000/portfolio/deleteportfolio",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              target: galleryItem.key,
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            inc();
        });
    }

    if(isOwner){
        return (
            <Pressable style={styles.container} onPress={pressHandler} >
                <ImageBackground source={{ uri: `data:image/png;base64,${decodedImage}` }} style={[styles.image,{width: (type == "certificates") ? "100%" : screenWidth}]} opacity= {isPressed ? 0.5 : 0.7} >
                    {isPressed &&   <View style={styles.buttonContainer}>
                                        <OptionsButton text="Delete" onPress={removeGalleryItemHandler} /> 
                                    </View>}
                </ImageBackground>
            </Pressable>
        ); 
    }
    else{
        return(
            <View style={styles.container} >
                    <ImageBackground source={{ uri: `data:image/png;base64,${decodedImage}` }} style={[styles.image,{width: (type == "certificates") ? "100%" : screenWidth}]} >
                    </ImageBackground>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        height: 500,
        minWidth:  Dimensions.get('window').width,
        maxWidth:  Dimensions.get('window').width,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 40,
        color: "white"
    },
    image: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: 'cover',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    buttonContainer: {
        width: "40%",
    }
});

export default GalleryItem;