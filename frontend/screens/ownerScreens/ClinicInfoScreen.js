import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PortfolioScreen from "./PortfolioScreen";
import CertificatesScreen from "./CertificatesScreen";

const Tab = createMaterialTopTabNavigator();

function ClinicInfoScreen ({route}) {
    const [isOwner, setIsOwner] = useState(route.params["isOwner"]);
    return (
        <Tab.Navigator screenOptions={{tabBarLabelStyle: { textTransform: 'none' }, swipeEnabled: false}} >
            <Tab.Screen name="portfolio" component={PortfolioScreen} options={{ title: 'Portfolio' }} />
            <Tab.Screen name="certificates" component={CertificatesScreen} options={{ title: 'Certificates' }} initialParams={{ isOwner: isOwner}} />
        </Tab.Navigator> 
    );
}

const styles = StyleSheet.create({

});

export default ClinicInfoScreen;