import { SafeAreaView, View, Alert, StyleSheet, ImageBackground, StatusBar,TextInput,Pressable, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import OptionsButton from "../buttons/OptionsButton";
import {decode} from 'base-64';

function CertificateItem ({certificate, onFocusChange, focusedName, inc, onView, startLoading, isOwner}) {
    const [isPressed, setIsPressed] = useState(false);
    const [decodedImage, setDecodedImage] = useState(null);

    useEffect(()=>{
         const decoding = decode(certificate.url);
         setDecodedImage(decoding);
    }, []);


    useEffect(()=>{
        if(certificate.key != focusedName){
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
                onFocusChange(certificate.key); 
            }
        }
    }

    async function removeCertificateHandler () {
        startLoading();
        const response = await fetch("http://192.168.137.154:3000/certificate/delete",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              target: certificate.key,
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
                <ImageBackground source={{ uri: `data:image/png;base64,${decodedImage}` }} style={styles.image} opacity= {isPressed ? 0.5 : 0.7} >
                    {isPressed &&   <View style={styles.buttonContainer}>
                                        <OptionsButton text="Delete" onPress={removeCertificateHandler} /> 
                                    </View>}
                </ImageBackground>
            </Pressable>
        ); 
    }
    else{
        return(
            <View style={styles.container} >
                    <ImageBackground source={{ uri: `data:image/png;base64,${decodedImage}` }} style={styles.image} >
                    </ImageBackground>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        height: 500,
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
        width: "40%",
    }
});

export default CertificateItem;