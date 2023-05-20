import {Text, View, StyleSheet, Dimensions} from 'react-native';
import OptionsButton from '../buttons/OptionsButton';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function HistoryOrderClient ({order}) {

    function formatDateString(dateString) {
        const parts = dateString.split("-");
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text}>{formatDateString(order["day"])}</Text>
            <Text style={styles.text}>{order["pName"]}</Text>
            <View style={styles.buttonsContainer}>
                <View>
                    <OptionsButton text="צפייה בפרטי התור" color="#18C3F8"/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 0.2*height,
        width: width,
        borderBottomWidth: 0.5,
        backgroundColor: "#CCBCBC"
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
});

export default HistoryOrderClient;
