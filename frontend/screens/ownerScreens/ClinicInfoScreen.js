import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PortfolioScreen from "./PortfolioScreen";
import GalleryScreen from "./GalleryScreen";

const Tab = createMaterialTopTabNavigator();


function ClinicInfoScreen ({route}) {
    const ip = route.params.ip;
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    return (
         <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} >
             <Tab.Screen name="portfolio" component={GalleryScreen} options={{ title: 'Portfolio' }} initialParams={{ isOwner: isOwner, type: "portfolio", ip: ip}} />
             <Tab.Screen name="certificates" component={GalleryScreen} options={{ title: 'Certificates' }} initialParams={{ isOwner: isOwner, type: "certificates", ip: ip}} />
        </Tab.Navigator> 
    );
}

const styles = StyleSheet.create({

});

export default ClinicInfoScreen;