import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity ,Image, StyleSheet} from 'react-native';

import styles from './styles';

import logo from   '../../assets/logo.png';

export default function Login()  {

    const [handleLogin, ]

    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={logo}/>

            <TextInput 
                style={styles.input}
                placeholder="Matricula" //colocar icone!
                placeholderTextColor="#123" //MUDAR A COR PARA O AZUL CERTO
                keyboardType='numeric'
                maxLength={12}//numero maximo do cod da matricula, verificar se o funcionarios tem mais numeros.
            />
            <TextInput 
                style={styles.inputPassword}
                placeholder="Senha" //colocar icone!
                placeholderTextColor="#123" //MUDAR A COR PARA O AZUL CERTO
                secureTextEntry = {true}
                autoCorrect={false}
            />

            <TouchableOpacity onPress={() => {}} style={styles.button}>
                <Text style={styles.buttonText}>Logar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => []} >
                <Text>Esqueceu a senha?</Text>  
            </TouchableOpacity>

            <TouchableOpacity onPress={() => []}style={styles.buttonCadastro}>
                <Text>Cadastre-se</Text>  
            </TouchableOpacity>
        </View>
    );
  }
}
