import { SafeAreaView, View, Alert, StyleSheet, Dimensions, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LoginButton from "../../buttons/LoginButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useFocusEffect } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function LoginScreen ({route, navigation}) {
    const ip = route.params.ip;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isOwner, setIsOwner] = useState(null);
    const [flag, setFlag] = useState(false);
    const [userToken, setUserToken] = useState(null);
    let token;
    


    useEffect(()=>{
        const removeToken = async () => {
            try {
              await AsyncStorage.removeItem('jwt_token');
            } catch (e) {
              console.error(e);
            }
          };
        //removeToken();

        const getToken = async () => {
            try {
              const token = await AsyncStorage.getItem('jwt_token');
              return token;
            } catch (e) {
              console.error(e);
            }
          };
      
          const checkAuthentication = async () => {
            try{
              const token = await getToken();
              if (token) {
                const decodedToken = jwtDecode(token);
                setUserToken(decodedToken);
                if(decodedToken.email == "vlad.charny@gmail.com"){
                    setIsOwner(true);
                }
                else{
                    setIsOwner(false);
                }
              }
            } catch (err) {
              console.log(err);
            }
          };
      
          checkAuthentication();
    }, []);

    useEffect(()=>{
        if(isOwner != null){
            navigation.navigate("home", {isOwner: isOwner, token: userToken});
        }
    }, [isOwner]);

    function emailFocusHandler () {
        setEmailFocused(true);
    }

    function emailBlurHandler () {
        setEmailFocused(false);
    }

    function passwordFocusHandler () {
        setPasswordFocused(true);
    }

    function passwordBlurHandler () {
        setPasswordFocused(false);
    }

    async function loginHandler () {
        const response = await fetch(`http://${ip}:3000/login/new`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            if(!data.success){
                Alert.alert(data.message, "Please verify the entered details",[
                    {text: "ok", style: "cancel"},
                ])
            }
            else{
                token = data.idToken;
                storeToken(token);
                setEmail("");
                setPassword("");
                const decodedToken = jwtDecode(token);
                setUserToken(decodedToken);
                if(decodedToken.email == "vlad.charny@gmail.com"){
                    setIsOwner(true);
                }
                else{
                    setIsOwner(false);
                }
            }
        });
    }

    function registerHandler () {
        setEmail("");
        setPassword("");
        navigation.navigate("register");
    }

    function guestHandler () {
        
    }

    const storeToken = async (token) => {
        try {
          await AsyncStorage.setItem('jwt_token', token);
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar style="auto" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                        <View style={styles.loginContainer}>
                            <TextInput style={[styles.input,]} placeholderTextColor={"white"} placeholder="Email" onFocus={emailFocusHandler} onBlur={emailBlurHandler} onChangeText={setEmail} value={email}/>
                            <TextInput style={[styles.input,]} placeholderTextColor={"white"} placeholder="Password" onFocus={passwordFocusHandler} onBlur={passwordBlurHandler} onChangeText={setPassword} value={password} secureTextEntry={true} />
                            <LoginButton text="Login" onPress={loginHandler} />
                            <LoginButton text="Register" onPress={registerHandler} />
                            <LoginButton text="Continue as a guest" onPress={guestHandler} />
                        </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    gradient: {
        height: height,
        alignItems: "center",
    },
    loginContainer: {
        height: 0.5*height,
        width: 0.8*width,
        borderRadius: 5,
        position: "absolute",
        top: 0.2*height,
        alignItems: "center",
    },
    input: {
        height: 0.12*0.5*height,
        width: 0.9*0.8*width,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        textAlign: "left",
        marginTop: 0.05*0.5*height,
        color: "white"
    }
});

export default LoginScreen;