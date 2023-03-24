import { View, Text, StyleSheet, Platform, Pressable} from "react-native";

function OptionsButton ({text, onPress}) {

    return (
        <View style={styles.wrapper}>
            <Pressable style={styles.container} android_ripple={{color: "sky-blue"}} onPress={onPress} >
                <Text style={styles.text}> {text} </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 20,
    },
    container: {
        alignSelf: "center",
        backgroundColor: "#A9B8B6",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 0.7,
        opacity: 0.5
    },
    text: {
        fontSize: 25,
        color: "white",
    }
});

export default OptionsButton;