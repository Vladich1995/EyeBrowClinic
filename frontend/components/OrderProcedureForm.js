import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

function OrderProcedureForm () {
    const [selectedDay, setSelectedDay] = useState(null);
    const markedDates = {};

    // Get the date of the next Sunday
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));

    // Mark all days from Sunday to Thursday for the next 52 weeks
    for (let i = 0; i < 52; i++) {
        for (let j = 1; j < 6; j++) { // 5 days from Sunday to Thursday
        const currentDate = new Date(nextSunday.getTime());
        currentDate.setDate(currentDate.getDate() + j);
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = { marked: true };
        }
        nextSunday.setDate(nextSunday.getDate() + 7);
    }

    function daySelectHandler (day) {
        setSelectedDay(day);
    }

    function monthChangeHandler () {

    }



    return (
        <View style={styles.container}>
            <View>

            </View>
            <View style={styles.calendarContainer}>
                <Calendar onDayPress={daySelectHandler} onMonthChange={monthChangeHandler} markedDates={markedDates} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:300,
        width: "100%",
        position: "absolute",
        top: 30,
        zIndex: 0.8,
        borderRadius: 20,
    },
    calendarContainer: {
        width: "100%",
        height: "100%"
    }
});

export default OrderProcedureForm;