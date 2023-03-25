import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import ClinicInfoScreen from "../ownerScreens/ClinicInfoScreen";
import HistoryScreen from "../ownerScreens/HistoryScreen";
import ManageProceduresScreen from "../ownerScreens/ManageProceduresScreen";
import CalendarScreen from "../ownerScreens/CalendarScreen";
import { useState, useEffect } from "react";


const Tab = createMaterialTopTabNavigator();


function HomeScreen ({route}) {
    const [isOwner, setIsOwner] = useState(route.params.isOwner);
    return (
        <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} initialRouteName="procedures" >
            <Tab.Screen name="schedule" component={CalendarScreen} options={{ title: 'Schedule' }} />
            <Tab.Screen name="history" component={HistoryScreen} options={{ title: 'History' }} />
            <Tab.Screen name="about" component={ClinicInfoScreen} options={{ title: 'About' }} initialParams={{email: route.params.email, isOwner: isOwner}} />
            <Tab.Screen name="procedures" component={ManageProceduresScreen} options={{ title: 'Procedures' }} initialParams={{email: route.params.email, isOwner: isOwner}} />
        </Tab.Navigator> 
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;

