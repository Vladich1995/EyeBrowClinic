import {View, StyleSheet, Text, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import OptionsButton from "../buttons/OptionsButton";


function ClientOrderItem ({order, ip, inc}) {
    const [isDeleting, setIsDeleting] = useState(false);

    function formatDateString(dateString) {
        const parts = dateString.split("-");
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
    }

    function cancelOrderHandler () {
        setIsDeleting(true);
    }

    function editOrderHandler () {

    }

    function cancelDeleteHandler () {
        setIsDeleting(false);
    }

    async function deleteOrderHandler () {
        try{
            const response = await fetch(`http://${ip}:3000/schedule/deleteorder`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: order["day"],
                time: order["time"]
            }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                inc();
                setIsDeleting(false);
            });
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        (!isDeleting) ?<View style={styles.container} >
            <Text style={styles.text}>{formatDateString(order["day"])}</Text>
            <Text style={styles.text}>{order["time"]}</Text>
            <Text style={styles.text}>{order["pName"]}</Text>
            <View style={styles.buttonsContainer}>
                <View style={{marginTop: -15}}>
                    <OptionsButton text=" ביטול תור" onPress={cancelOrderHandler} color="#18C3F8" />
                </View>
            </View>
        </View>
        :
        <View style={styles.container} >
            <Text style={styles.deleteText}>האם את/ה בטוח/ה שברצונך לבטל את התור ל{order["pName"]} שנקבע לתאריך {order["day"]} בשעה {order["time"]} ? </Text>
            <View style={styles.buttonsContainer}>
                <View style={{marginRight: 10, marginTop: -15}}>
                    <OptionsButton text="אישור" onPress={deleteOrderHandler} color="#18C3F8"/>
                </View>
                <View style={{marginLeft: 10, marginTop: -15}}>
                    <OptionsButton text="ביטול" onPress={cancelDeleteHandler} color="#18C3F8" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 130,
        borderBottomWidth: 0.5
    },
    text: {
        textAlign: "center",
        fontSize: 20
    },
    buttonsContainer: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "center",
    },
    deleteText: {
        textAlign: "center",
        fontSize: 20
    }
});

export default ClientOrderItem;