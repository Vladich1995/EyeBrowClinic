import { View, Text, StyleSheet, Platform, Pressable} from "react-native";

function LoginButton ({text,onPress}) {
    return (
        <View style={styles.wrapper}>
            <Pressable style={styles.container} android_ripple={{color: "sky-blue"}} onPress={onPress}>
                <Text style={styles.text}> {text} </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "center",
        width: "95%",
        height: "10%",
        borderRadius: 30,
        overflow: "hidden",
        marginTop: 20,
    },
    container: {
        alignSelf: "center",
        backgroundColor: "#A500FD",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderColor: "white",
        borderWidth: 0.7,
        width: "95%",
        height: "100%",
        
    },
    text: {
        fontSize: 20,
        color: "white",
    }
});

export default LoginButton;

