import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function HistoryScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params.isOwner);
    const [token, setToken] = useState(route.params.token);
    const [allHistoryOrders, setAllHistoryOrders] = useState(null);
    const [historyOrdersByClient, setHistoryOrdersByClient] = useState(null);

    useEffect(()=>{
        async function getOwnerHistoryOrders () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/getallhistoryorders`).then((response) => {
                    return response.json();
                }).then((data) => {
                    const allHistoryOrdersSorted = data.orders.sort((a, b) => {
                        // Compare the dates first
                        if (a.day !== b.day) {
                          return a.day.localeCompare(b.day);
                        }
                      
                        // If the dates are the same, compare the times
                        const timeA = a.time.split(":");
                        const timeB = b.time.split(":");
                      
                        // Compare the hours first
                        if (timeA[0] !== timeB[0]) {
                          return parseInt(timeA[0]) - parseInt(timeB[0]);
                        }
                      
                        // If the hours are the same, compare the minutes
                        return parseInt(timeA[1]) - parseInt(timeB[1]);
                      });
                    setAllHistoryOrders(allHistoryOrdersSorted);
                });
            } catch (err) {
                console.log(err);
            }
        }

        async function getClientHistoryOrders () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/gethistoryordersbyclient`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail: token.email
                }),
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    //const ordersByClientSorted = data.ordersByClient.sort((a, b) => parseInt(a["time"].split(":")) - parseInt(b["time"].split(":")));
                    const historyOrdersByClientSorted = data.orders.sort((a, b) => {
                        // Compare the dates first
                        if (a.day !== b.day) {
                          return a.day.localeCompare(b.day);
                        }
                      
                        // If the dates are the same, compare the times
                        const timeA = a.time.split(":");
                        const timeB = b.time.split(":");
                      
                        // Compare the hours first
                        if (timeA[0] !== timeB[0]) {
                          return parseInt(timeA[0]) - parseInt(timeB[0]);
                        }
                      
                        // If the hours are the same, compare the minutes
                        return parseInt(timeA[1]) - parseInt(timeB[1]);
                      });
                    setHistoryOrdersByClient(historyOrdersByClientSorted);
                });
            } catch (err) {
                console.log(err);
            }
        }

        if(isOwner){
            getOwnerHistoryOrders();
        } else {
            getClientHistoryOrders();
        }

    }, []);

    useEffect(()=>{
        if(allHistoryOrders != null){
            console.log(allHistoryOrders)
        }
        if(historyOrdersByClient != null){
            console.log(historyOrdersByClient)
        }
    }, [historyOrdersByClient, allHistoryOrders])

    return (
        <View><Text>HistoryScreen</Text></View>
    );
}

const styles = StyleSheet.create({

});

export default HistoryScreen;