import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingHorizontal: 65,
        backgroundColor:'#E0E0E0'
    },

    logo:{
        alignSelf: 'center'
    },

    input: {
        height: 38,
        borderBottomWidth: 0.5,
        borderColor: "#015987", //colocar azul certo
        fontSize: 12,
        paddingHorizontal: 7.5,
        alignItems: "baseline",
        marginTop:30
        //ajeitar espaço entre a borda e o placeholder
    },


    inputPassword: {
        height: 38,
        borderBottomWidth: 0.5,
        borderColor: "#015987", //colocar azul certo
        fontSize: 12,
        paddingHorizontal: 7.5,
        //ajeitar espaço entre a borda e o placeholder
    },

    button: {
        height: 35,
        width: '65%',
        borderRadius: 4,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: "#015987",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center'

    },

    buttonText:{
       // fontWeight: "bold",
        fontSize: 14,
        color:"#fff"
    },

    forgotPassword:{
        alignSelf: 'center',
        fontSize: 11,
        paddingTop:3
    },

    createAccount:{
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'flex-end',

        marginTop: 3
        //bottom:0
    },

    buttonCadastro:{
        alignSelf:"center",
        marginTop: 10
    },

    createAccountText:{
        fontSize: 16,
        color: "#015987"
    }
    // bottom:{
    //     flex: 1,
    //     justifyContent:'flex-end',
    //     marginBottom:36
    // }
});

export default styles;