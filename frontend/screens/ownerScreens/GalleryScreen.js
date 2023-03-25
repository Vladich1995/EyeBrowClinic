import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,ActivityIndicator, Keyboard, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddGalleryForm from "../../components/AddGalleryForm";
import GalleryItem from "../../components/GalleryItem";

function GalleryScreen ({route}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [needPlus, setNeedPlus] = useState(true);
    const [addGallery, setAddGallery] = useState(false);
    const [fetchedGallery, setFetchedGallery] = useState(null);
    const [count, setCount] = useState(0);
    const [focusedItem, setFocusedItem] = useState(null);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    const [type, setType] = useState(route.params["type"]);

    const keyExtractor = (item, index) => item.id;
    

    useEffect(()=>{
        async function getGallery () {
            try{
                const response = await fetch((type == "certificates") ? "http://192.168.1.12:3000/certificate/get" : "http://192.168.1.12:3000/portfolio/getportfolio").then((response) => {
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
                    {addGallery && <AddGalleryForm onCancel={cancelAddHandler} inc={()=>setCount(count+1)} type={type} />}
                    {isRendered && <FlatList
                                        data={fetchedGallery}
                                        renderItem={({item}) => <GalleryItem galleryItem={item} onFocusChange={handleFocusChange} isOwner={isOwner} type={type}
                                        focusedName={focusedItem} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)}  />}
                                        keyExtractor={keyExtractor}
                                        showsVerticalScrollIndicator={false} 
                                        horizontal={(type=="portfolio") && true}
                                    />}
                    {(needPlus && !addGallery && isOwner) ? <AddButton onPress={setAddGallery} /> : null}
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