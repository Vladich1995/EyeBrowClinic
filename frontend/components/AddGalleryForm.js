import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {encode} from 'base-64';
import * as ImageManipulator from 'expo-image-manipulator';

function AddGalleryForm ({onCancel, inc, type}) {
    const [cImage, setCimage] = useState(null);

    useEffect(()=>{
        async function update () {
            if(cImage != null){
                const response = await fetch((type == "certificates") ? "http://192.168.137.154:3000/certificate/add" : "http://192.168.137.154:3000/portfolio/addportfolio",{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value: cImage
                }),
                }).then((response) => {
                return response.json();
                }).then((data) => {
                    if(data.success){
                        onCancel();
                        inc();
                    }
                });
            }
        }
        update();
        
        setCimage(null);
    },[cImage]);

    async function imageUploadHandler () {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: false,
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
              setCimage(encodedImage);
            }
          }
    }


    return (
        <View style={styles.container} >
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <Button title="Browse" onPress={imageUploadHandler} />
                <Button title="Cancel" onPress={onCancel}/>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 150,
        position: "absolute",
        zIndex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
});

export default AddGalleryForm;