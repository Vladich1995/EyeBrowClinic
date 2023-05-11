import { SafeAreaView, View, StyleSheet, FlatList, PanResponder, Animated, } from "react-native";
import {useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar} from 'react-native-calendars';
import colors from '../../Utility/colors'
import OrderItem from "../../components/OrderItem";

function MeetingsScreen ({route, isOwner2, ip2}) {
    const [isOwner, setIsOwner] = useState(null);
    const [ip, setIp] = useState(null);
    const [allOrders, setAllOrders] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [ordersInSelectedDay, setOrdersInSelectedDay] = useState(null);
    const timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;
    useEffect(()=>{
        if(route){
            setIp(route.params.ip);
            setIsOwner(route.params.isOwner);
        }else{
            setIp(ip2);
            setIsOwner(isOwner2);
        }
    }, [])
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
        if(ip != null){
            getAllOrders();
        }
      }, [isOwner, ip]);

    
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
        setOrdersInSelectedDay(orders);
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
                        renderItem={({item}) => <OrderItem order={item} />}
                        
                    />
                </View>
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