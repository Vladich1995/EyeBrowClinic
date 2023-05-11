import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import LoginButton from "../../buttons/LoginButton";

function RegistrationScreen ({route, navigation}) {
    const ip = route.params.ip;
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [userToken, setUserToken] = useState(null);
    let token;
    const [nameFocused, setnameFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [email2Focused, setEmail2Focused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password2Focused, setPassword2Focused] = useState(false);

    const [isOwner, setIsOwner] = useState(null);

    function nameFocusHandler () {
        setnameFocused(true);
    }

    function nameBlurHandler () {
        setnameFocused(false);
    }

    function phoneNumberFocusHandler () {
        setPhoneNumberFocused(true);
    }

    function phoneNumberBlurHandler () {
        setPhoneNumberFocused(false);
    }

    function emailFocusHandler () {
        setEmailFocused(true);
    }

    function emailBlurHandler () {
        setEmailFocused(false);
    }

    function email2FocusHandler () {
        setEmail2Focused(true);
    }

    function email2BlurHandler () {
        setEmail2Focused(false);
    }

    function passwordFocusHandler () {
        setPasswordFocused(true);
    }

    function passwordBlurHandler () {
        setPasswordFocused(false);
    }

    function password2FocusHandler () {
        setPassword2Focused(true);
    }

    function password2BlurHandler () {
        setPassword2Focused(false);
    }

    async function submitHandler () {
        const response = await fetch(`http://${ip}:3000/register/`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              phoneNumber: "+972" + phoneNumber.slice(1,10),
              email: email,
              password: password
            }),
          }).then((response) => {
            return response.json();
        }).then(async (data) => {
            if(!data.success){
                Alert.alert(data.message, "You can try to register with different email",[
                    {text: "ok", style: "cancel"},
                ])
            }
            else{
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
                        Alert.alert(data.message, "",[
                            {text: "ok", style: "cancel"},
                        ])
                    }
                    else{
                        token = data.idToken;
                        storeToken(token);
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
        });
    }

    useEffect(()=>{
        if(isOwner != null){
            navigation.navigate("home", {isOwner: isOwner, token: userToken});
        }
    }, [isOwner]);

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
                            <TextInput style={[styles.input,{borderWidth: nameFocused ? 1 : 0}]} placeholder="Name" onFocus={nameFocusHandler} onBlur={nameBlurHandler} onChangeText={setName}/>
                            <TextInput style={[styles.input,{borderWidth: phoneNumberFocused ? 1 : 0}]} placeholder="Phone number" onFocus={phoneNumberFocusHandler} onBlur={phoneNumberBlurHandler} onChangeText={setPhoneNumber}/>
                            <TextInput style={[styles.input,{borderWidth: emailFocused ? 1 : 0}]} placeholder="Email" onFocus={emailFocusHandler} onBlur={emailBlurHandler} onChangeText={setEmail}/>
                            <TextInput style={[styles.input,{borderWidth: email2Focused ? 1 : 0}]} placeholder="Confirm Email" onFocus={email2FocusHandler} onBlur={email2BlurHandler} onChangeText={setEmail2}/>
                            <TextInput style={[styles.input,{borderWidth: passwordFocused ? 1 : 0}]} placeholder="Password" onFocus={passwordFocusHandler} onBlur={passwordBlurHandler} onChangeText={setPassword} secureTextEntry={true} />
                            <TextInput style={[styles.input,{borderWidth: password2Focused ? 1 : 0}]} placeholder="Confirm Password" onFocus={password2FocusHandler} onBlur={password2BlurHandler} onChangeText={setPassword2} secureTextEntry={true} />
                            <LoginButton text="Submit" onPress={submitHandler} />
                            <LoginButton text="Back" onPress={navigation.goBack} />
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
        height: 480,
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

export default RegistrationScreen;