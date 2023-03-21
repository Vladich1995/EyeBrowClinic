import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,FlatList,TouchableWithoutFeedback, Keyboard, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddProcedureForm from "../../components/AddProcedureForm";
import ProcedureItem from "../../components/ProcedureItem";
import ViewInfo from "../../components/ViewInfo";

function ManageProceduresScreen () {
    const [addProcedure,setAddProcedure] = useState(false);
    const [fetchedProcedureList, setFetchedProcedureList] = useState(null);
    const [count, setCount] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null);
    const [needView, setNeedView] = useState(false);
    const [viewProcedure, setViewProcedure] = useState(null);
    const [needPlus, setNeedPlus] = useState(true);

    useEffect(()=>{
        async function displayProcedures () {
            try{
                const response = await fetch("http://192.168.137.154:3000/procedure/getList").then((response) => {
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


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.page} >
                <View style={styles.container} >
                    {needView && <ViewInfo procedure={viewProcedure} onClose={closeViewHandler} />}
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} inc={()=>setCount(count+1)} /> : null}
                    {isRendered && <FlatList
                                        data={fetchedProcedureList}
                                        renderItem={({item}) => <ProcedureItem procedure={item} onFocusChange={handleFocusChange}
                                            focusedName={focusedItem} inc={()=>setCount(count+1)} onView={viewInfoHandler}  />}
                                        keyExtractor={item => item.pDescription}
                                        showsVerticalScrollIndicator={false}
                                    />}  
                </View>
                {(needPlus && !addProcedure) ? <AddButton onPress={setAddProcedure} /> : null}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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