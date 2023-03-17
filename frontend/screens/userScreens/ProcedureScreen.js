import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ProcedureScreen () {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <Text>ProcedureScreen</Text>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    }
});

export default ProcedureScreen;