import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,ActivityIndicator, Keyboard, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddCertificateForm from "../../components/AddCertificateForm";
import CertificateItem from "../../components/CertificateItem";

function CertificatesScreen ({route}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [needPlus, setNeedPlus] = useState(true);
    const [addCertificate, setAddCertificate] = useState(false);
    const [fetchedCertificates, setFetchedCertificates] = useState(null);
    const [count, setCount] = useState(0);
    const [focusedItem, setFocusedItem] = useState(null);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);

    useEffect(()=>{
        async function getCertificates () {
            try{
                const response = await fetch("http://192.168.137.154:3000/certificate/get").then((response) => {
                    return response.json();
                }).then((data) => {
                    setFetchedCertificates(data.certificates);
                });
            } catch (err) {
                console.log(err);
            }
        }
        getCertificates();
    },[count]);

    useEffect(()=>{
        if(fetchedCertificates != null){
            setIsRendered(true);
            setIsLoading(false);
        }
    }, [fetchedCertificates]);


    function cancelAddHandler () {
        setAddCertificate(false);
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
                    {addCertificate && <AddCertificateForm onCancel={cancelAddHandler} inc={()=>setCount(count+1)} />}
                    {isRendered && <FlatList
                                        data={fetchedCertificates}
                                        renderItem={({item}) => <CertificateItem certificate={item} onFocusChange={handleFocusChange} isOwner={isOwner}
                                        focusedName={focusedItem} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)}  />}
                                        keyExtractor={item => item.pDescription}
                                        showsVerticalScrollIndicator={false}
                                    />}
                    {(needPlus && !addCertificate && isOwner) ? <AddButton onPress={setAddCertificate} /> : null}
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

export default CertificatesScreen;