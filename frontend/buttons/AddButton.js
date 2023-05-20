import { SafeAreaView, View, Alert, StyleSheet, Platform, Pressable,TextInput,KeyboardAvoidingView, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function AddButton ({onPress}) {
    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            <Pressable style={styles.button} android_ripple={{color: "sky-blue"}} onPress={() =>onPress(true)} >
                    <Text style={styles.text}>+</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        width: 50,
        borderRadius: 50,
        overflow: "hidden",
        position: "absolute",
        bottom: 50,
        left: 50,
        zIndex: 1
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#422D74"
    },
    text: {
        fontSize: 20,
        color: "white",
    },
});

export default AddButton;