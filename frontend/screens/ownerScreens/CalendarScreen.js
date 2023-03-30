import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleSettingsScreen from "./ScheduleSettingsScreen";
import MeetingsScreen from "../globalScreens/MeetingsScreen";

const Tab = createMaterialTopTabNavigator();


function CalendarScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    return (
         <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} >
             <Tab.Screen name="settings" component={ScheduleSettingsScreen} options={{ title: 'Settings' }} initialParams={{ ip: ip}} />
             <Tab.Screen name="meetings" component={MeetingsScreen} options={{ title: 'Meetings' }} initialParams={{ isOwner: isOwner, type: "certificates", ip: ip}} />
        </Tab.Navigator> 
    );
}

const styles = StyleSheet.create({

});

export default CalendarScreen;