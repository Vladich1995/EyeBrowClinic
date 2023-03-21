import {View, Text, StyleSheet, Button} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ViewInfo ({procedure, onClose}) {

    

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title} >{procedure.pName}</Text>
                </View>
                <Text style={styles.price} >מחיר: {procedure.pPrice}</Text>
                <Text style={styles.duration} >זמן מוערך: {procedure.pDuration}</Text>
                <Text style={styles.goal} >מטרת הטיפול: {procedure.pGoal}</Text>
                <Text style={styles.description} >על הטיפול: {procedure.pDescription}</Text>
                <View style={styles.buttonsContainer}>
                    <Button title="עדכון פרטים" />
                    <Button title="סגירה" onPress={()=>onClose()} />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height:600,
        width: 320,
        position: "absolute",
        top: 30,
        zIndex: 1,
        borderRadius: 20,
    },
    titleContainer: {
        width: "100%",
        alignItems: "center"
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
    },
    title:{
        alignItems: "center"
    },
    price: {

    },
    duration: {

    },
    goal: {

    },
    description: {
        marginTop: 20
    },
    buttonsContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        justifyContent: "space-between",
        height: 80
        
    }
});

export default ViewInfo;