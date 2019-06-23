import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';


export default function Signup(props) {

     const handleBack =() => {
     props.navigation.navigate("AuthLoading");
    }

  return (
    <View style={styles.container}>
        <View style= {styles.top}>
            <Text style= {styles.toptext}>Cadastro</Text>
        </View>
        <View style={styles.inputdata}>
            <View style={styles.input}>
                <TextInput placeholder={"Nome"}></TextInput>
            </View>
            <View style={styles.input}>
                <TextInput placeholder={"Sobrenome"}></TextInput>
            </View>
            <View style={styles.input}>
                <TextInput placeholder={"E-mail"}></TextInput>
            </View>
            <View style={styles.input}>
                <TextInput 
                maxLength={12}
                placeholder={"Matrícula"}/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder={"Senha"}></TextInput>
            </View>
            <View style={styles.input}>
                <TextInput placeholder={"Confirme a senha"}></TextInput>
            </View>
        </View>
        <TouchableOpacity style={styles.signbutton}>
            <Text style={styles.signtext}>Efetuar Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBack}>
            <Text style={{alignSelf: "center", marginTop: 12}}>Cancelar</Text>
        </TouchableOpacity>
    </View>
  );
}
