import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from "react-native";
import ProcedureScreen from "./ProcedureScreen";
import PersonalScreen from "./PersonalScreen";
import AboutScreen from "./AboutScreen";



const Tab = createMaterialTopTabNavigator();


function HomeScreen () {
    return (
        <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }}} initialRouteName="procedures">
            <Tab.Screen name="about" component={AboutScreen} options={{ title: 'About' }} />
            <Tab.Screen name="personal" component={PersonalScreen} options={{ title: 'Personal Info' }} />
            <Tab.Screen name="procedures" component={ProcedureScreen} options={{ title: 'Available Procedures' }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default HomeScreen;

