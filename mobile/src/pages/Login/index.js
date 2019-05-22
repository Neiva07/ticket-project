import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
//import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles";

import logo from "../../assets/logo.png";

export default class Login extends Component {
  state = {
    enrollment_number: "",
    password: ""
  };

  // async componentDidMount (){ //Esse metodo verifica se o usuario ja ta logado
  //     const paginadoaluno = await AsyncStorage.getItem('@ticket-project:PAGINA_DO_PERFIL_DOALUNO');

  //     if (paginadoaluno){
  //      // this.props.navigation.navigate("PAGINA_DO_PERFIL_DOALUNO")

  //     }
  // }

  handleSignIn = () => {
    // const response = await api.get('perfil_do_aluno_noBD', {
    //     matricula: this.state.matricula,
    //     senha: this.state.password
    // })

    // await AsyncStorage.getItem('@ticket-project:PAGINA_DO_PERFIL_DOALUNO', response.data._id)
    this.props.navigation.navigate("Profile");
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <TextInput
          style={styles.input}
          placeholder="Matricula" //colocar icone!
          placeholderTextColor="#123" //MUDAR A COR PARA O AZUL CERTO
          keyboardType="numeric"
          value={this.state.enrollment_number}
          onChangeText={text => this.setState({ matricula: text })}
          underlineColorAndroid="transparent"
          maxLength={11} //numero maximo do cod da matricula, verificar se o funcionarios tem mais numeros.
        />
        <TextInput
          style={styles.inputPassword}
          placeholder="Senha" //colocar icone!
          placeholderTextColor="#123" //MUDAR A COR PARA O AZUL CERTO
          secureTextEntry={true}
          autoCorrect={false}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Logar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => []}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => []} style={styles.createAccount}>
            <Text style={styles.createAccountText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
