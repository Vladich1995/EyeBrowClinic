import {View, Text, StyleSheet, Button, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import UpdateProcedureForm from "./UpdateProcedureForm";

function ViewInfo ({procedure, onClose}) { 
    const [propToUpdate, setPropToUpdate] = useState(null);



    return (
        <View style={styles.container}>
            <LinearGradient colors={["#FD03B9","#A603FD"]} style={styles.gradient} >
                {(propToUpdate != null) && <UpdateProcedureForm prop={propToUpdate} cancel={()=>setPropToUpdate(null)} procedure={procedure} /> }
                <Pressable style={styles.titleContainer} android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pName")} >
                    <Text style={styles.title} >{procedure.pName}</Text>
                </Pressable>
                <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pPrice")} >
                    <Text style={styles.price} >מחיר: {procedure.pPrice}</Text>
                </Pressable>
                <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pDuration")} >
                    <Text style={styles.duration} >זמן מוערך: {procedure.pDuration}</Text>
                </Pressable>
                <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pGoal")} >
                    <Text style={styles.goal} >מטרת הטיפול: {procedure.pGoal}</Text>
                </Pressable>
                <Pressable android_ripple={{color: "sky-blue"}} onLongPress={()=>setPropToUpdate("pDescription")} >
                    <Text style={styles.description} >על הטיפול: {procedure.pDescription}</Text>
                </Pressable>
                <View style={styles.buttonsContainer}>
                    <Button title="החלפת תמונה" onPress={()=>setPropToUpdate("pImage")} />
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
        zIndex: 0.8,
        borderRadius: 20,
    },
    titleContainer: {
        width: "100%",
        alignItems: "center"
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        alignItems: "center",
       
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
    }
});

export default ViewInfo;