import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {useIsFocused} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";
import ClinicInfoScreen from "../ownerScreens/ClinicInfoScreen";
import HistoryScreen from "../ownerScreens/HistoryScreen";
import ManageProceduresScreen from "../ownerScreens/ManageProceduresScreen";
import CustomHeader from '../../components/CustomHeader';
import ScheduleSettingsScreen from '../ownerScreens/ScheduleSettingsScreen';
import MeetingsScreen from './MeetingsScreen';
import { useState, useEffect } from "react";


const Drawer = createDrawerNavigator();

function HomeScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params.isOwner);
    return (
        <Drawer.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, drawerActiveBackgroundColor: 'pink', headerTitleAlign: 'center', headerTitleStyle: {color: "white"}, }}  initialRouteName="procedures">
            <Drawer.Screen name="procedures" component={ManageProceduresScreen} options = {{header: ({ navigation }) => <CustomHeader navigation={navigation} />,}} initialParams={{token: route.params.token, isOwner: isOwner, ip: ip}} />
            <Drawer.Screen name="schedule" component={MeetingsScreen} options={{header: ({ navigation }) => <CustomHeader navigation={navigation} />,}} initialParams={{isOwner: isOwner, ip: ip, token: route.params.token}} />
            <Drawer.Screen name="history" component={HistoryScreen} options={{header: ({ navigation }) => <CustomHeader navigation={navigation} />,}} initialParams={{isOwner: isOwner, ip: ip, token: route.params.token}} />
            <Drawer.Screen name="about" component={ClinicInfoScreen} options={{header: ({ navigation }) => <CustomHeader navigation={navigation} />,}} initialParams={{isOwner: isOwner, ip: ip}} />
            <Drawer.Screen name="settings" component={ScheduleSettingsScreen} options={{header: ({ navigation }) => <CustomHeader navigation={navigation} />, drawerIcon: ({ focused, color, size }) => (
            <Icon
              name={'cog'}
              size={size}
              color={color}
            />
          ),}} initialParams={{isOwner: isOwner, ip: ip}} />
        </Drawer.Navigator> 
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;

