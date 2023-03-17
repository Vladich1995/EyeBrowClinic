import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddProcedureForm from "../../components/AddProcedureForm";

function ManageProceduresScreen () {
    const [addProcedure,setAddProcedure] = useState(false);
    const [fetchedProcedureList, setFetchedProcedureList] = useState([]);
    const [renderedProcedures, setRenderedProcedures] = useState([]);

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
    },[]);

    useEffect(()=>{
        setRenderedProcedures(fetchedProcedureList);
    },[fetchedProcedureList])

    function addProcedureHandler (obj) {
        setRenderedProcedures((prevList) => {
            return [...prevList, obj];
        });
    }

    useEffect(()=>{
        console.log(renderedProcedures);
    }, [renderedProcedures]);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.page} >
                <View style={styles.container}>
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} onAdd={addProcedureHandler} /> : null}
                </View>
                {!addProcedure ? <AddButton onPress={setAddProcedure} /> : null}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    page: {
        flex: 1,
    }
    
});

export default ManageProceduresScreen;