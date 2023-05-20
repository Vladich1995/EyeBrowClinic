import { View, Text, StyleSheet, Platform, Pressable} from "react-native";

function OptionsButton ({text, onPress, color}) {

    return (
        <View style={styles.wrapper}>
            <Pressable style={[styles.container, {backgroundColor: color, }]} android_ripple={{color: "sky-blue"}} onPress={onPress} >
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