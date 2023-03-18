import { SafeAreaView, View, Alert, StyleSheet, Platform, StatusBar,TextInput,TouchableWithoutFeedback, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import LoginButton from "../../buttons/LoginButton";

function RegistrationScreen ({navigation}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [nameFocused, setnameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [email2Focused, setEmail2Focused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [password2Focused, setPassword2Focused] = useState(false);

    function nameFocusHandler () {
        setnameFocused(true);
    }

    function nameBlurHandler () {
        setnameFocused(false);
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
        const response = await fetch("http://192.168.1.12:3000/register/",{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password
            }),
          }).then((response) => {
            return response.json();
        }).then((data) => {
            if(!data.success){
                Alert.alert(data.message, "You can try to register with different email",[
                    {text: "ok", style: "cancel"},
                ])
            }
            else{
                navigation.navigate("home");
            }
        });
    }


    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar style="auto" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                        <View style={styles.loginContainer}>
                            <TextInput style={[styles.input,{borderWidth: nameFocused ? 1 : 0}]} placeholder="name" onFocus={nameFocusHandler} onBlur={nameBlurHandler} onChangeText={setName}/>
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
        height: 420,
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