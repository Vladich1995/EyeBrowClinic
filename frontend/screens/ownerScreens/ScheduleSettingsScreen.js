import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Button, CheckBox } from 'react-native-elements';

function ScheduleSettingsScreen () {
    const [sundayChecked, setSundayChecked] = useState(false);
    const [mondayChecked, setMondayChecked] = useState(false);
    const [tuesdayChecked, setTuesdayChecked] = useState(false);
    const [wednesdayChecked, setWednesdayChecked] = useState(false);
    const [thursdayChecked, setThursdayChecked] = useState(false);
    const [fridayChecked, setFridayChecked] = useState(false);
    const [saturdayChecked, setSaturdayChecked] = useState(false);
    const [workingDays, setWorkingDays] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        async function getWorkingDays () {
            try{
                const response = await fetch("http://192.168.137.154:3000/schedule/get").then((response) => {
                    return response.json();
                }).then((data) => {
                   setWorkingDays(data.days);
                });
            } catch (err) {
                console.log(err);
            }
        }
        getWorkingDays();
    },[count]);

    useEffect(()=>{
        if(workingDays != null){
            setSundayChecked(workingDays.sunday);
            setMondayChecked(workingDays.monday);
            setTuesdayChecked(workingDays.tuesday);
            setWednesdayChecked(workingDays.wednesday);
            setThursdayChecked(workingDays.thursday);
            setFridayChecked(workingDays.friday);
            setSaturdayChecked(workingDays.saturday);

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
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.monday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 1);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.tuesday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 2);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.wednesday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 3);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.thursday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 4);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.friday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 5);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                if(workingDays.saturday) { 
                    const currentDate = new Date(nextSunday.getTime());
                    currentDate.setDate(currentDate.getDate() + 6);
                    const dateString = currentDate.toISOString().split('T')[0];
                    workingDates[dateString] = { marked: true };
                }
                setMarkedDates(workingDates);
                nextSunday.setDate(nextSunday.getDate() + 7);
            }
        }
    }, [workingDays]);

    
    
    async function daySelectHandler (day) {
        const response = await fetch("http://192.168.137.154:3000/schedule/updatevacation",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              day: day.dateString
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            setCount(count+1);
        });
        markedDates[day.dateString] = { marked: true, dotColor: "red" };
    }


    async function saveSelectionHandler () {
        const days = {
            sunday: sundayChecked,
            monday: mondayChecked,
            tuesday: tuesdayChecked,
            wednesday: wednesdayChecked,
            thursday: thursdayChecked,
            friday: fridayChecked,
            saturday: saturdayChecked
        };
        const response = await fetch("http://192.168.137.154:3000/schedule/set",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              schedule: days
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            setCount(count+1);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
            <View style={styles.calendarContainer}>
                <Calendar onDayLongPress={daySelectHandler} markedDates={markedDates} />
            </View>
            <View style={styles.selection}>
                <Text style={styles.selectTitle}>Select working days:</Text>
                <CheckBox
                    title='Sunday'
                    checked={sundayChecked}
                    onPress={() => setSundayChecked(!sundayChecked)}
                />
                <CheckBox
                    title='Monday'
                    checked={mondayChecked}
                    onPress={() => setMondayChecked(!mondayChecked)}
                />
                <CheckBox
                    title='Tuesday'
                    checked={tuesdayChecked}
                    onPress={() => setTuesdayChecked(!tuesdayChecked)}
                />
                <CheckBox
                    title='Wednesday'
                    checked={wednesdayChecked}
                    onPress={() => setWednesdayChecked(!wednesdayChecked)}
                />
                <CheckBox
                    title='Thursday'
                    checked={thursdayChecked}
                    onPress={() => setThursdayChecked(!thursdayChecked)}
                />
                <CheckBox
                    title='Friday'
                    checked={fridayChecked}
                    onPress={() => setFridayChecked(!fridayChecked)}
                />
                <CheckBox
                    title='Saturday'
                    checked={saturdayChecked}
                    onPress={() => setSaturdayChecked(!saturdayChecked)}
                />
                <View style={styles.saveSelectionContainer}>
                    <Button title="Save" onPress={saveSelectionHandler} />
                </View>
            </View>
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: "center"
    },
    calendarContainer: {
        width: "100%",
        paddingTop: 20
    },
    selection: {
        height: 470,
        width: "100%",
    },
    selectTitle: {
        fontSize: 20
    },
    saveSelectionContainer: {
        width: "50%",
        alignSelf: "center"
    }
});

export default ScheduleSettingsScreen;