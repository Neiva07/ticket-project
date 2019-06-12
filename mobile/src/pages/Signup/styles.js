import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:'#E0E0E0'
    },

    top: {
        alignItems: "center",
        justifyContent: "flex-start"
    },

    toptext: {
        fontSize: 20,
        color: "#015987",
        fontWeight: "bold",
        paddingBottom: 16,
    },

    input: {
        borderBottomWidth: 0.5,
        borderColor: "#015987",
        marginHorizontal: 32,
    },

    signbutton:{
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#015987",
        width: 128,
        height: 48,
        borderRadius: 4,
        marginTop: 24,
    },

    signtext: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff"
    }
});

export default styles;
