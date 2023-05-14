import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,ActivityIndicator, Keyboard, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {encode} from 'base-64';
import * as ImageManipulator from 'expo-image-manipulator';
import AddButton from "../../buttons/AddButton";
import AddGalleryForm from "../../components/AddGalleryForm";
import GalleryItem from "../../components/GalleryItem";

function GalleryScreen ({route}) {
    const ip = route.params.ip;
    const [isLoading, setIsLoading] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [needPlus, setNeedPlus] = useState(true);
    const [fetchedGallery, setFetchedGallery] = useState(null);
    const [count, setCount] = useState(0);
    const [focusedItem, setFocusedItem] = useState(null);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    const [type, setType] = useState(route.params["type"]);
    const [cImage, setCimage] = useState(null);

    useEffect(()=>{
        async function update () {
            if(cImage != null){
                const response = await fetch((type == "certificates") ? `http://${ip}:3000/certificate/add` : `http://${ip}:3000/portfolio/addportfolio`,{
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
    

    useEffect(()=>{
        async function getGallery () {
            try{
                const response = await fetch((type == "certificates") ? `http://${ip}:3000/certificate/get` : `http://${ip}:3000/portfolio/getportfolio`).then((response) => {
                    return response.json();
                }).then((data) => {
                    setFetchedGallery(data.images);
                });
            } catch (err) {
                console.log(err);
            }
        }   
        getGallery();
    },[count, type]);

    useEffect(()=>{
        if(fetchedGallery != null){
            setIsRendered(true);
            setIsLoading(false);
        }
    }, [fetchedGallery]);


    function cancelAddHandler () {
        setAddGallery(false);
        setNeedPlus(true);
    }

    function handleFocusChange (name) {
        setFocusedItem(name);
    }


    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    else{
        return(
            <SafeAreaView style={styles.page}>
                <View style={styles.container} >
                    {isRendered && <FlatList
                                        data={fetchedGallery}
                                        renderItem={({item}) => <GalleryItem galleryItem={item} onFocusChange={handleFocusChange} isOwner={isOwner} type={type}
                                        focusedName={focusedItem} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)} ip={ip}  />}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false} 
                                        horizontal={(type=="portfolio") && true}
                                    />}
                    {(needPlus && isOwner) ? <AddButton onPress={imageUploadHandler} /> : null}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0.5,
    },
    page: {
        flex: 1,
    },
});

export default GalleryScreen;