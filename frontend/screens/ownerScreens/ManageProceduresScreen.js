import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,FlatList,TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddProcedureForm from "../../components/AddProcedureForm";
import ProcedureItem from "../../components/ProcedureItem";
import ViewInfo from "../../components/ViewInfo";

function ManageProceduresScreen ({route}) {
    const [addProcedure,setAddProcedure] = useState(false);
    const [fetchedProcedureList, setFetchedProcedureList] = useState(null);
    const [count, setCount] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null);
    const [needView, setNeedView] = useState(false);
    const [viewProcedure, setViewProcedure] = useState(null);
    const [needPlus, setNeedPlus] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState(route.params["email"]);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);

    const keyExtractor = (item, index) => item.id;

    useEffect(()=>{
        async function displayProcedures () {
            try{
                const response = await fetch("http://192.168.1.12:3000/procedure/getList").then((response) => {
                    return response.json();
                }).then((data) => {
                    setFetchedProcedureList(data.procedureList);
                });
            } catch (err) {
                console.log(err);
            }
        }
        displayProcedures();
    },[count]);

    useEffect(()=>{
        if(fetchedProcedureList != null){
            setIsRendered(true);
            setIsLoading(false);
        }
    }, [fetchedProcedureList]);

    useEffect(()=>{
        if(viewProcedure != null){
            setNeedView(true);
            setNeedPlus(false);
        }
    }, [viewProcedure]);

    function handleFocusChange (name) {
        setFocusedItem(name);
    }

    function viewInfoHandler (procedure) {
        setViewProcedure(procedure)
    }

    function closeViewHandler () {
        setNeedView(false);
        setViewProcedure(null);
        setNeedPlus(true);
    }

    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.page} >
                <View style={styles.container} >
                    {needView && <ViewInfo procedure={viewProcedure} onClose={closeViewHandler} inc={()=>setCount(count+1)} isOwner={isOwner} email={email} />}
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)} /> : null}
                    {isRendered && <FlatList
                                        data={fetchedProcedureList}
                                        renderItem={({item}) => <ProcedureItem procedure={item} onFocusChange={handleFocusChange} isOwner={isOwner} email={email}
                                        focusedName={focusedItem} inc={()=>setCount(count+1)} onView={viewInfoHandler} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)}  />}
                                        keyExtractor={keyExtractor}
                                        showsVerticalScrollIndicator={false}
                                    />}  
                </View>
                {(needPlus && !addProcedure && isOwner) ? <AddButton onPress={setAddProcedure} /> : null}
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
        zIndex: 0.5,
    },
    page: {
        flex: 1,
    },
});

export default ManageProceduresScreen;