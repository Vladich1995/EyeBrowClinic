import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from "react-native";
import ProcedureScreen from "../userScreens/ProcedureScreen";
import PersonalScreen from "../userScreens/PersonalScreen";
import AboutScreen from "../userScreens/AboutScreen";
import ClinicInfoScreen from "../ownerScreens/ClinicInfoScreen";
import HistoryScreen from "../ownerScreens/HistoryScreen";
import ManageProceduresScreen from "../ownerScreens/ManageProceduresScreen";
import CalendarScreen from "../ownerScreens/CalendarScreen";


const Tab = createMaterialTopTabNavigator();


// function HomeScreen ({route}) {
//     if(route.params.isOwner){
//         return (
//             <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} initialRouteName="manageProcedures" >
//                 <Tab.Screen name="calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
//                 <Tab.Screen name="history" component={HistoryScreen} options={{ title: 'History' }} />
//                 <Tab.Screen name="clinicInfo" component={ClinicInfoScreen} options={{ title: 'Clinic Info' }} />
//                 <Tab.Screen name="manageProcedures" component={ManageProceduresScreen} options={{ title: 'Manage Procedures' }} />
//             </Tab.Navigator>
//         );
//     }
//     else{
//         return (
//             <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }}} initialRouteName="procedures">
//                 <Tab.Screen name="about" component={AboutScreen} options={{ title: 'About' }} />
//                 <Tab.Screen name="personal" component={PersonalScreen} options={{ title: 'Personal Info' }} />
//                 <Tab.Screen name="procedures" component={ProcedureScreen} options={{ title: 'Available Procedures' }} />
//             </Tab.Navigator>
//         );
//     }
// }

function HomeScreen ({route}) {
    if(route.params.isOwner){
        return (
            <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} initialRouteName="manageProcedures" >
                <Tab.Screen name="calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
                <Tab.Screen name="history" component={HistoryScreen} options={{ title: 'History' }} />
                <Tab.Screen name="clinicInfo" component={ClinicInfoScreen} options={{ title: 'Clinic Info' }} />
                <Tab.Screen name="manageProcedures" component={ManageProceduresScreen} options={{ title: 'Manage Procedures' }} initialParams={{email: route.params.email}} />
            </Tab.Navigator> 
        );
    }
    else{
        return (
            <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }}} initialRouteName="procedures">
                <Tab.Screen name="about" component={AboutScreen} options={{ title: 'About' }} />
                <Tab.Screen name="personal" component={PersonalScreen} options={{ title: 'Personal Info' }} />
                <Tab.Screen name="procedures" component={ProcedureScreen} options={{ title: 'Available Procedures' }} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;

