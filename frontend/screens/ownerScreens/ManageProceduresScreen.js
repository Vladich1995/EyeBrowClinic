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
    const [isRendered, setIsRendered] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null);
    const [needView, setNeedView] = useState(false);
    const [viewProcedure, setViewProcedure] = useState(null);
    const [needPlus, setNeedPlus] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState(route.params["email"]);
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    const [procedureForOrder, setProcedureForOrder] = useState(null);
    const [isOrdering, setIsOrdering] = useState(false);
    const [timeOptions, setTimeOptions] = useState(null);

    const keyExtractor = (item, index) => item.id;

    useEffect(()=>{
        async function getTimeSettings () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/gettimes`).then((response) => {
                    return response.json();
                }).then((data) => {
                    const start = data.timeSettings[0]["start"];
                    const end = data.timeSettings[0]["end"];
                    let interval = data.timeSettings[1]["interval"];
                    interval = parseInt(interval);
                    const startHour = start.slice(0,2);
                    const startMin = start.slice(3,5);
                    const endHour = end.slice(0,2);
                    const endMin = end.slice(3,5);
                    const startTime = new Date(2000, 0, 1);
                    startTime.setHours(startHour);
                    startTime.setMinutes(startMin);
                    const endTime = new Date(2000, 0, 1);
                    endTime.setHours(endHour);
                    endTime.setMinutes(endMin);
                    const timeArray = [];
                    while(startTime.getHours() <= endTime.getHours()){
                        let time;
                        if(startTime.getMinutes() == 0){
                            time = (startTime.getHours()).toString() + ":" + (startTime.getMinutes()).toString() + "0";
                        }
                        else{
                            time = (startTime.getHours()).toString() + ":" + (startTime.getMinutes()).toString();
                        }
                        if(startTime.getHours() < endTime.getHours()){
                            timeArray.push(time);
                        }
                        if(startTime.getHours() == endTime.getHours()){
                            if(startTime.getMinutes() <= endTime.getMinutes()){
                                timeArray.push(time);
                            }
                        }
                        startTime.setMinutes(startTime.getMinutes() + interval);
                    }
                    setTimeOptions(timeArray);
                });
            } catch (err) {
                console.log(err);
            }
        }
        getTimeSettings();
    },[]);

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
        if(fetchedProcedureList != null && timeOptions != null){
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
                    {isOrdering && <OrderProcedureForm procedure={procedureForOrder} ip={ip} onCancel={cancelOrderHandler} timeOptions={timeOptions} />}
                    {needView && <ViewInfo procedure={viewProcedure} onClose={closeViewHandler} inc={()=>setCount(count+1)} isOwner={isOwner} email={email} ip={ip} />}
                    {addProcedure  ? <AddProcedureForm cancelHandler={()=>setAddProcedure(false)} inc={()=>setCount(count+1)} startLoading={()=>setIsLoading(true)} stopLoading={()=>setIsLoading(false)} ip={ip} /> : null}
                    {isRendered && <FlatList
                                        data={fetchedProcedureList}
                                        renderItem={({item}) => <ProcedureItem procedure={item} onFocusChange={handleFocusChange} onOrder={orderProcedureHandler} isOwner={isOwner} email={email}
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