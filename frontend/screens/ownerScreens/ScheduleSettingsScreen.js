import { SafeAreaView, View, Alert, StyleSheet, StatusBar,TextInput, ActivityIndicator, ScrollView, Text } from "react-native";
import {Picker} from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Button, CheckBox } from 'react-native-elements';

function ScheduleSettingsScreen ({route}) {
    const ip = route.params.ip;
    const timeZoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;
    const [isLoading, setIsLoading] = useState(true);
    const [sundayChecked, setSundayChecked] = useState(false);
    const [mondayChecked, setMondayChecked] = useState(false);
    const [tuesdayChecked, setTuesdayChecked] = useState(false);
    const [wednesdayChecked, setWednesdayChecked] = useState(false);
    const [thursdayChecked, setThursdayChecked] = useState(false);
    const [fridayChecked, setFridayChecked] = useState(false);
    const [saturdayChecked, setSaturdayChecked] = useState(false);
    const [workingDays, setWorkingDays] = useState(null);
    const [markedDates, setMarkedDates] = useState(null);
    const [vacationDays, setVacationDays] = useState(null);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('16:00');
    const [timeInterval, setTimeInterval] = useState("10");
    const timeOptions = [
        '07:00', '07:30',
        '08:00', '08:30',
        '09:00', '09:30',
        '10:00', '10:30',
        '11:00', '11:30',
        '12:00', '12:30',
        '13:00', '13:30',
        '14:00', '14:30',
        '15:00', '15:30',
        '16:00', '16:30',
        '17:00', '17:30',
        '18:00', '18:30',
        '19:00', '19:30',
        '20:00', '20:30',
        '21:00', '21:30',
      ];
    const intervalOptions = [
        '10' , '20',
        '30' , '40',
        '60',
    ]

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
    },[count]);


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
            setSundayChecked(workingDays.sunday);
            setMondayChecked(workingDays.monday);
            setTuesdayChecked(workingDays.tuesday);
            setWednesdayChecked(workingDays.wednesday);
            setThursdayChecked(workingDays.thursday);
            setFridayChecked(workingDays.friday);
            setSaturdayChecked(workingDays.saturday);
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

    
    
    async function daySelectHandler (day) {
        if(!vacationDays.includes(day.dateString)){
            const response = await fetch(`http://${ip}:3000/schedule/updatevacation`,{
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
        }
        else{

        }
    }


    async function saveSelectionHandler () {
        setIsLoading(true);
        const days = {
            sunday: sundayChecked,
            monday: mondayChecked,
            tuesday: tuesdayChecked,
            wednesday: wednesdayChecked,
            thursday: thursdayChecked,
            friday: fridayChecked,
            saturday: saturdayChecked
        };
        const response = await fetch(`http://${ip}:3000/schedule/set`,{
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


    async function saveTimesHandler () {
        if(startTime > endTime){
            Alert.alert("איך את רוצה לסיים לעבוד לפני שהתחלת?", "נראלי עדיף לשנות..",[
                {text: "אה נכון", style: "cancel"},
            ])
        }
        else{
            const response = await fetch(`http://${ip}:3000/schedule/settimes`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              start: startTime,
              end: endTime
            }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                
            });
        }
    }

    async function saveIntervalsHandler () {
        const response = await fetch(`http://${ip}:3000/schedule/setinterval`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              interval: timeInterval
            }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                
            });
    }


    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <View style={styles.calendarContainer}>
                    {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Calendar onDayLongPress={daySelectHandler} markedDates={markedDates} timeZoneOffsetInSeconds={timeZoneOffsetInSeconds} /> }
                </View>
                <View style={styles.daySelection}>
                    <Text style={styles.selectDayTitle}>Select working days:</Text>
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
                    <View style={[styles.saveSelectionContainer, {marginTop: 20}]}>
                        <Button title="Save" onPress={saveSelectionHandler} />
                    </View>
                </View>
                <Text style={{fontSize: 20}}>Select working hours:</Text>
                <View style={styles.timeSelection}>
                    <View style={styles.picker}>
                        <Text style={{fontSize: 20, flex: 1}}>Start:</Text>
                        <Picker
                            selectedValue={startTime}
                            onValueChange={setStartTime}
                            style={{backgroundColor: "white", flex: 4}}
                        >
                            {timeOptions.map((time) => (
                            <Picker.Item key={time} label={time} value={time} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={{fontSize: 20, flex: 1}}>End:</Text>
                        <Picker
                            selectedValue={endTime}
                            onValueChange={setEndTime}
                            style={{backgroundColor: "white", flex: 4}}
                        >
                            {timeOptions.map((time) => (
                            <Picker.Item key={time} label={time} value={time} />
                            ))}
                        </Picker>
                    </View>
                    <View style={[styles.saveSelectionContainer, {marginTop: 30}]}>
                        <Button title="Save" onPress={saveTimesHandler} />
                    </View>
                </View>
                <View style={styles.selectInterval}>
                    <Text style={{fontSize: 20, flex: 2}}>Time Intervals:</Text>
                    <Picker
                        selectedValue={timeInterval}
                        onValueChange={setTimeInterval}
                        style={{backgroundColor: "white", flex: 4}}
                    >
                        {intervalOptions.map((time) => (
                        <Picker.Item key={time} label={time + " minutes"} value={time} />
                        ))}
                    </Picker>
                </View>
                <View style={[styles.saveSelectionContainer]}>
                    <Button title="Save" onPress={saveIntervalsHandler} />
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
    daySelection: {
        height: 490,
        width: "100%",
    },
    selectDayTitle: {
        fontSize: 20
    },
    saveSelectionContainer: {
        width: "50%",
        alignSelf: "center",
    },
    selectTimeTitle: {
        fontSize: 20
    },
    timeSelection: {
        height: 230,
        width: "100%",
        alignItems: "center"
    },
    picker: {
        height: 40,
        width: "90%",
        flexDirection: "row-reverse",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    selectInterval: {
        height: 100,
        width: "90%",
        alignItems: "center",
        flexDirection: "row-reverse",
    }
});

export default ScheduleSettingsScreen;