import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,FlatList,TouchableWithoutFeedback, Keyboard, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddProcedureForm from "../../components/AddProcedureForm";
import ProcedureItem from "../../components/ProcedureItem";

function ManageProceduresScreen () {
    const [addProcedure,setAddProcedure] = useState(false);
    const [fetchedProcedureList, setFetchedProcedureList] = useState(null);
    const [count, setCount] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null);
    

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
        }
    }, [fetchedProcedureList]);

    function handleFocusChange (name) {
        setFocusedItem(name);
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.page} >
                <View style={styles.container} >
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} inc={()=>setCount(count+1)} /> : null}
                    {isRendered && <FlatList
                                        data={fetchedProcedureList}
                                        renderItem={({item}) => <ProcedureItem procedure={item} onFocusChange={handleFocusChange}
                                            focusedName={focusedItem} inc={()=>setCount(count+1)}  />}
                                        keyExtractor={item => item.pDescription}
                                        showsVerticalScrollIndicator={false}
                                    />}  
                </View>
                {!addProcedure ? <AddButton onPress={setAddProcedure} /> : null}
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