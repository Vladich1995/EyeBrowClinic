import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,FlatList,TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AddButton from "../../buttons/AddButton";
import AddProcedureForm from "../../components/AddProcedureForm";
import ProcedureItem from "../../components/ProcedureItem";
import ViewInfo from "../../components/ViewInfo";
import OrderProcedureForm from "../../components/OrderProcedureForm";

function ManageProceduresScreen ({route}) {
    const ip = route.params.ip;
    const [addProcedure,setAddProcedure] = useState(false);
    const [fetchedProcedureList, setFetchedProcedureList] = useState(null);
    const [count, setCount] = useState(0);
    const [countTimes, setCountTimes] = useState(0);
    const [isRendered, setIsRendered] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null);
    const [needView, setNeedView] = useState(false);
    const [viewProcedure, setViewProcedure] = useState(null);
    const [needPlus, setNeedPlus] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    const [token, setToken] = useState(route.params.token);
    const [procedureForOrder, setProcedureForOrder] = useState(null);
    const [isOrdering, setIsOrdering] = useState(false);
    const [timeOptions, setTimeOptions] = useState(null);

    const keyExtractor = (item, index) => item.id;

    useEffect(()=>{
        async function getTimeSettings () {
            if(!isOwner){
                try{
                    const response = await fetch(`http://${ip}:3000/schedule/gettimes`).then((response) => {
                        return response.json();
                    }).then((data) => {
                        setTimeOptions(data.timeOptions);
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getTimeSettings();
    },[countTimes]);

    useEffect(()=>{
        async function displayProcedures () {
            try{
                const response = await fetch(`http://${ip}:3000/procedure/getList`).then((response) => {
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
        if(fetchedProcedureList != null && timeOptions == isOwner ? null : !null){
            setIsRendered(true);
            setIsLoading(false);
        }
    }, [fetchedProcedureList, timeOptions]);

    useEffect(()=>{
        if(viewProcedure != null){
            setNeedView(true);
            setNeedPlus(false);
        }
    }, [viewProcedure]);

    useEffect(()=>{
        if(procedureForOrder != null){
            setIsOrdering(true);
        }
    },[procedureForOrder]);

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

    function orderProcedureHandler (procedure) {
        setProcedureForOrder(procedure);
    }

    function cancelOrderHandler () {
        setIsOrdering(false);
        setProcedureForOrder(null);
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
                    {isOrdering && <OrderProcedureForm procedure={procedureForOrder} ip={ip} onCancel={cancelOrderHandler} timeOptions={timeOptions} inc={()=>setCountTimes(countTimes+1)} token={token} />}
                    {needView && <ViewInfo procedure={viewProcedure} onClose={closeViewHandler} inc={()=>setCount(count+1)} isOwner={isOwner} token={token} ip={ip} />}
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)} ip={ip} /> : null}
                    {isRendered && <FlatList
                                        data={fetchedProcedureList}
                                        renderItem={({item}) => <ProcedureItem procedure={item} onFocusChange={handleFocusChange} onOrder={orderProcedureHandler} isOwner={isOwner} token={token}
                                        focusedName={focusedItem} inc={()=>setCount(count+1)} onView={viewInfoHandler} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)} ip={ip}  />}
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