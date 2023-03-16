import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import LoginButton from "../buttons/LoginButton";

function LoginScreen ({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    let token;

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
        const response = await fetch("http://192.168.137.154:3000/login/new",{
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
                setEmail("");
                setPassword("");
                navigation.navigate("home");
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

    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar style="auto" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                        <View style={styles.loginContainer}>
                            <TextInput style={[styles.input,{borderWidth: emailFocused ? 1 : 0}]} placeholder="Email" onFocus={emailFocusHandler} onBlur={emailBlurHandler} onChangeText={setEmail} value={email}/>
                            <TextInput style={[styles.input,{borderWidth: passwordFocused ? 1 : 0}]} placeholder="Password" onFocus={passwordFocusHandler} onBlur={passwordBlurHandler} onChangeText={setPassword} value={password} secureTextEntry={true} />
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
        flex: 1,
        alignItems: "center",
    },
    loginContainer: {
        height: 300,
        width: 250,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        position: "absolute",
        top: 100,
        alignItems: "center",
    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: "white",
        textAlign: "center",
        marginTop: 20
    }
});

export default LoginScreen;