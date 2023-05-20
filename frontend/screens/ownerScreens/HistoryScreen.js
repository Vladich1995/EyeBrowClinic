import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import HistoryOrderClient from "../../components/HistoryOrderClient";


function HistoryScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params.isOwner);
    const [token, setToken] = useState(route.params.token);
    const [allHistoryOrders, setAllHistoryOrders] = useState(null);
    const [historyOrdersByClient, setHistoryOrdersByClient] = useState(null);
    const [searchWord, setSearchWord] = useState("");

    function formatDateString(dateString) {
        const parts = dateString.split("-");
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
    }

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
        <SafeAreaView style={styles.container}>
            {(!isOwner) && 
            (<View>
                <TextInput style={styles.clientSearch} placeholder="חפש/י לפי שם פרוצדורה או תאריך" onChangeText={setSearchWord} />
                <FlatList
                    data={historyOrdersByClient}
                    renderItem={({item}) => searchWord == "" ? <HistoryOrderClient order={item} />: (searchWord != "" && (item.pName.includes(searchWord) || formatDateString(item.day).includes(searchWord)) ? <HistoryOrderClient order={item} /> : null) }
                    keyExtractor={item => Math.random()}
                />
            </View>)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    clientSearch: {
        borderWidth: 0.5,
        fontSize: 15,
        backgroundColor: 'white',
        textAlign: "center"
    }
});

export default HistoryScreen;