import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import ClinicInfoScreen from "../ownerScreens/ClinicInfoScreen";
import HistoryScreen from "../ownerScreens/HistoryScreen";
import ManageProceduresScreen from "../ownerScreens/ManageProceduresScreen";
import CalendarScreen from "../ownerScreens/CalendarScreen";
import { useState, useEffect } from "react";


const Drawer = createDrawerNavigator();

function HomeScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params.isOwner);
    return (
        <Drawer.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, drawerActiveBackgroundColor: 'pink', headerTitleAlign: 'center' }} initialRouteName="procedures">
            <Drawer.Screen name="procedures" component={ManageProceduresScreen} options={{ title: 'Procedures' }} initialParams={{token: route.params.token, isOwner: isOwner, ip: ip}} />
            <Drawer.Screen name="schedule" component={CalendarScreen} options={{ title: 'Schedule' }} initialParams={{isOwner: isOwner, ip: ip, token: route.params.token}} />
            <Drawer.Screen name="history" component={HistoryScreen} options={{ title: 'History' }} initialParams={{isOwner: isOwner, ip: ip, token: route.params.token}} />
            <Drawer.Screen name="about" component={ClinicInfoScreen} options={{ title: 'About' }} initialParams={{isOwner: isOwner, ip: ip}} />
        </Drawer.Navigator> 
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;

