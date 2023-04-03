import { Text, View, Dimensions, StyleSheet, Button, ActivityIndicator, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Picker} from "@react-native-picker/picker";

function OrderProcedureForm ({procedure, ip, onCancel, timeOptions, inc}) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [workingDays, setWorkingDays] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);
    const [vacationDays, setVacationDays] = useState(null);
    const [procedureTime, setProcedureTime] = useState(null);
    const screenHeight = Dimensions.get('window').height;
    const [ordersInDay, setOrdersInDay] = useState(null);
     

    useEffect(()=>{
        async function getWorkingDays () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/get`).then((response) => {
                    return response.json();
                }).then((data) => {
                   setWorkingDays(data.days);
                });
            } catch (err) {
                console.log(err);
            }
        }
        getWorkingDays();
    },[]);


    useEffect(()=>{
        async function getVacationDays () {
            try{
                const response = await fetch(`http://${ip}:3000/schedule/getvacations`).then((response) => {
                    return response.json();
                }).then((data) => {
                   setVacationDays(data.vacations);
                });
            } catch (err) {
                console.log(err);
            }
        }
        getVacationDays();
    },[workingDays]);

    

    useEffect(()=>{
        if(workingDays != null && vacationDays != null){
            const workingDates = {};
            //Get the date of the next Sunday
            let today = new Date();
            let daysUntilNextSunday = 7 - today.getDay();
            let nextSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilNextSunday);
            let timezoneOffset = nextSunday.getTimezoneOffset() * 60000;
            nextSunday = new Date(nextSunday.getTime() - timezoneOffset);
            
            // const nextSunday = new Date();
            // nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));
            let toDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            let toDayOffset = toDay.getTimezoneOffset() * 60000;
            tempDay = new Date(toDay.getTime() - toDayOffset);
            while(tempDay.getDay() != 0){
                    if(tempDay.getDay() == 0 && workingDays.sunday){
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 1 && workingDays.monday){
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 2 && workingDays.tuesday){ 
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 3 && workingDays.wednesday){  
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 4 && workingDays.thursday){ 
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 5 && workingDays.friday){
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    if(tempDay.getDay() == 6 && workingDays.saturday){ 
                        const dateString = tempDay.toISOString().split('T')[0];
                        workingDates[dateString] = { marked: true };
                    }
                    tempDay.setDate(tempDay.getDate() + 1);
            }

            // Mark all days from Sunday to Thursday for the next 52 weeks
            for (let i = 0; i < 52; i++) {
                if(workingDays.sunday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 0);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.monday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 1);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.tuesday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 2);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.wednesday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 3);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.thursday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 4);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.friday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 5);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                if(workingDays.saturday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 6);
                    const dateString = currentDate.toISOString().split('T')[0];
                    if(vacationDays.includes(dateString)){
                        workingDates[dateString] = { marked: true, dotColor: "red" };
                    }
                    else{
                        workingDates[dateString] = { marked: true };
                    }
                }
                setMarkedDates(workingDates);
                nextSunday.setDate(nextSunday.getDate() + 7);
            }
        }
        setIsLoading(false);
    }, [vacationDays]);

    useEffect(()=>{
        //update the list of timeOptions based on the orders in a specific day
    }, [ordersInDay]);

    async function daySelectHandler (day) {
        if(Object.keys(markedDates).includes(day.dateString.toString()) && !vacationDays.includes(day.dateString.toString())){
            setSelectedDay(day);
            try{
                const response = await fetch(`http://${ip}:3000/schedule/getorders/${day.dateString}`).then((response) => {
                    return response.json();
                }).then((data) => {
                   setOrdersInDay(data.orders);
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    function monthChangeHandler () {

    }

    async function completeOrderHandler () {
        console.log(selectedDay.dateString, procedureTime, procedure.pName);
        const response = await fetch(`http://${ip}:3000/schedule/order`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              day: selectedDay.dateString,
              time: procedureTime,
              pName: procedure.pName,
              duration: procedure.pDuration
            }),
          }).then((response) => {
            return response.json();
            }).then((data) => {
                if(data.success){
                    inc();
                }
                else{
                    console.log(data.message);
                }
            });
    }
    
    function cancelHandler () {
        setSelectedDay(null);
        onCancel();
    }



    return (
        <View style={[styles.container,{height: screenHeight}]} >
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <View style={styles.calendarContainer}>
                    <Text style={{fontSize: 20, alignSelf: "center"}}>Select date:</Text>
                    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Calendar onDayPress={daySelectHandler} onMonthChange={monthChangeHandler} markedDates={markedDates} />}
                </View>
                {(selectedDay != null) && <View style={styles.selectionContainer}>
                    <Text style={{fontSize: 20, alignSelf: "center"}}>Select an hour:</Text>
                    <View style={styles.select}>
                        <View style={styles.dropDown}>
                            <Picker
                                selectedValue={procedureTime}
                                onValueChange={setProcedureTime}
                                style={{backgroundColor: "white"}}
                            >
                                {timeOptions.map((time) => (
                                <Picker.Item key={time} label={time} value={time} />
                                ))}
                            </Picker>
                        </View>
                        {(procedureTime != null) &&
                        <View style={styles.completion}>
                            <Button title="Complete order" onPress={completeOrderHandler} />
                        </View>}
                    </View>
                </View>}
                <View style={styles.cancelContainer}>
                    <Button title="Cancel" onPress={cancelHandler} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        zIndex: 0.8,
        position: "absolute"
    },
    gradient: {
        flex: 1,
        alignItems: "center"
    },
    calendarContainer: {
        height: 400,
        width: "100%",
    },
    selectionContainer: {
        height: 200,
        width: "100%"
    },
    select: {
        flex: 1,
    },
    dropDown: {
        alignSelf: "center",
        height: 30,
        width: "60%"
    },
    completion: {
        height: 40,
        width: "100%",
        alignItems: "center",
        marginTop: 50
    },
    cancelContainer: {
        height: 40,
        width: "100%",
        alignItems: "center",
    }
});

export default OrderProcedureForm;