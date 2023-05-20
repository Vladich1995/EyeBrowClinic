import { SafeAreaView, View, StyleSheet, FlatList, PanResponder, Animated, } from "react-native";
import {useEffect, useState} from "react";
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import {Calendar} from 'react-native-calendars';
import colors from '../../Utility/colors'
import OrderItem from "../../components/OrderItem";
import ClientOrderItem from "../../components/ClientOrderItem";

function MeetingsScreen ({route}) {
    const [count, setCount] = useState(0);
    const isFocused = useIsFocused();
    const [isOwner, setIsOwner] = useState(null);
    const [ip, setIp] = useState(null);
    const [allOrders, setAllOrders] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [ordersInSelectedDay, setOrdersInSelectedDay] = useState(null);
    const [ordersByClient, setOrdersByClient] = useState(null);
    const timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;


    useEffect(()=>{
            setIp(route.params.ip);
            setIsOwner(route.params.isOwner);  
    }, [])

    useEffect(()=>{
        console.log(isFocused)
    }, [isFocused])

      // 1-3,4-6,7-9,10+
      useEffect(()=>{
        async function getAllOrders () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/getallorders`).then((response) => {
                    return response.json();
                }).then((data) => {
                    setAllOrders(data.orders);
                    //console.log((data.orders[0]["pName"]).split('').reverse().join(''));
                    const updatedMarkedDates = {};
                    for (let i = 0; i < Object.keys(data.ordersInDay).length; i++) {
                        let color;
                        if (data.ordersInDay[Object.keys(data.ordersInDay)[i]] >= 1 && data.ordersInDay[Object.keys(data.ordersInDay)[i]] <= 3) {
                            color = colors["1"];
                        } else if (data.ordersInDay[Object.keys(data.ordersInDay)[i]] >= 4 && data.ordersInDay[Object.keys(data.ordersInDay)[i]] <= 6) {
                            color = colors["2"];
                        } else if (data.ordersInDay[Object.keys(data.ordersInDay)[i]] >= 7 && data.ordersInDay[Object.keys(data.ordersInDay)[i]] <= 9) {
                            color = colors["3"];
                        } else if (data.ordersInDay[Object.keys(data.ordersInDay)[i]] >= 10) {
                            color = colors["4"];
                        }
                        updatedMarkedDates[Object.keys(data.ordersInDay)[i]] = { customStyles: { container: { backgroundColor: color } } };
                    }
                    setMarkedDates(updatedMarkedDates);
                });
            } catch (err) {
                console.log(err);
            }
        }

        async function getOrdersByClient () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/getordersbyclient`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail: route.params.token.email
                }),
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    //const ordersByClientSorted = data.ordersByClient.sort((a, b) => parseInt(a["time"].split(":")) - parseInt(b["time"].split(":")));
                    const ordersByClientSorted = data.ordersByClient.sort((a, b) => {
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
                    setOrdersByClient(ordersByClientSorted);
                });
            } catch (err) {
                console.log(err);
            }
        }

        if(isOwner == true){
            if(ip != null){
                getAllOrders();
            }
        }
        else{
            if(ip != null){
                getOrdersByClient();
            }
        }
      }, [isOwner, ip, isFocused, count]);

    
      const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
      };


    function daySelectHandler (day) {
        const orders = [];
        for(let i = 0; i < allOrders.length; i++){
            if(allOrders[i]["day"] == day["dateString"]){
                orders.push(allOrders[i]);
            }
        }
        const ordersSorted = orders.sort((a, b) => parseInt(a["time"].split(":")) - parseInt(b["time"].split(":")));
        setOrdersInSelectedDay(ordersSorted);
    }

    if (isOwner == true) {
        return (
            <SafeAreaView style={styles.page}>
                <View style={styles.calendarContainer}>
                    <Calendar onDayPress={daySelectHandler} markedDates={markedDates} markingType={'custom'}  timeZoneOffsetInSeconds={timeZoneOffsetInSeconds} />
                </View>      
                <View style={styles.ordersContainer}>
                    <FlatList
                        data={ordersInSelectedDay}
                        renderItem={({item}) => <OrderItem order={item} ip={ip} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.page}>
                <FlatList
                        data={ordersByClient}
                        renderItem={({item}) => <ClientOrderItem order={item} ip={ip} inc={()=>setCount(count+1)} />}
                        keyExtractor={item => Math.random()}
                    />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    calendarContainer: {
        width: "100%",
        paddingTop: 20,
    },
    ordersContainer: {
        flex: 1
    }
});

export default MeetingsScreen;