import { Text, View, Dimensions, StyleSheet, Button, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

function OrderProcedureForm ({procedure, ip, onCancel}) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [workingDays, setWorkingDays] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);
    const [vacationDays, setVacationDays] = useState(null);
    const screenHeight = Dimensions.get('window').height;

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
            // Get the date of the next Sunday
            const nextSunday = new Date();
            nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));
            let tempDay = new Date();
            tempDay = new Date(tempDay.getTime());
            while(tempDay < nextSunday){
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
    }, [vacationDays]);

    function daySelectHandler (day) {
        setSelectedDay(day);

    }

    function monthChangeHandler () {

    }
    
    function cancelHandler () {
        onCancel();
    }



    return (
        <View style={[styles.container,{height: screenHeight}]} >
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <View style={styles.calendarContainer}>
                    <Text style={{fontSize: 20, alignSelf: "center"}}>Select date:</Text>
                    <Calendar onDayPress={daySelectHandler} onMonthChange={monthChangeHandler} markedDates={markedDates} />
                </View>
                {(selectedDay != null) && <View style={styles.selectionContainer}>
                    <Text style={{fontSize: 20, paddingTop: 50, alignSelf: "center"}}>Select an hour:</Text>
                    <View style={styles.select}>
                        <View style={styles.dropDown}>

                        </View>
                        <View style={styles.accept}>

                        </View>
                    </View>
                </View>}
                <Button title="Cancel" onPress={cancelHandler} />
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
        height: 300,
        width: "100%",
    },
    selectionContainer: {
        height: 300,
        width: "100%"
    },
    select: {
        flex: 1,
        flexDirection: "row"
    },
    dropDown: {
        flex: 1,
        backgroundColor: "green"
    },
    accept: {
        flex: 1,
        backgroundColor: "blue"
    }
});

export default OrderProcedureForm;