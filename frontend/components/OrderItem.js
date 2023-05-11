import {View, Text, StyleSheet, Linking} from "react-native";

function OrderItem ({order}) {
    const number = '0' + (order["phoneNumber"]).slice(4,13);

    const numberPressHandler = (event) => {
        Linking.openURL(`tel:${number}`);
    }

    return (
        <View style={styles.container}>
            <Text>{order["time"]}</Text>
            <Text>{(order["pName"])}</Text>
            <Text>{(order["name"])}</Text>
            <Text onPress={numberPressHandler}>{number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        borderBottomWidth: 0.5
    }
});

export default OrderItem;