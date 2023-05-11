import {View, Text, StyleSheet, Linking} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function OrderItem ({order}) {
    const number = '0' + (order["phoneNumber"]).slice(4,13);

    const numberPressHandler = (event) => {
        Linking.openURL(`whatsapp://send?phone=${number}`);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{order["time"]}</Text>
            <Text style={styles.text}>{(order["pName"])}</Text>
            <Text style={{fontSize: 15}}>{(order["name"])}</Text>
            <Text style={{fontSize: 15, width: "30%", alignSelf: "flex-end"}} onPress={numberPressHandler}><Icon name="whatsapp" size={20} color="#4AC959" /> {number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        borderBottomWidth: 0.5
    },
    time: {
        textAlign: "center",
        fontSize: 20
    },
    text: {
        textAlign: "left",
        width: "auto",
        fontSize: 20,
    }
});

export default OrderItem;