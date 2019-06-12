import React,{ useState, useEffect } from 'react';

import { View, TouchableOpacity,Text, Image } from 'react-native';

import styles from './styles';

import logo from   '../../assets/logo.png';

import Ticket from '../../assets/Ticket.png';

export default function Profile(){

    const [Dadosdoaluno, SetDadosdoaluno] = useState([]);

    // useEffect( () => {
    //     const fetchdadosdoaluno = async () => { 
    //       const response = await fetch("linkdaapi/perfildoaluno") //provavelmente tem q usar o axios
    //       const data = await response.json();
          
    //       SetDadosdoaluno(data)//adicionar dados da api no array de Dadosdoaluno
    //    };
    //     fetchdadosdoaluno(); 
    //   }, []); 

    return (
        <View style={ styles.container}>
            <View style={styles.Top}>
                <TouchableOpacity style={styles.outButton}>
                    
                    <Text style={styles.outText}>Sair</Text>
                    
                </TouchableOpacity>
                <Image style={styles.logo} source={logo}/>

            </View>
            <Text style={styles.nameText}>Olá {Dadosdoaluno.primeironome}!</Text>
            <Text style={styles.ticketText}>Você tem {Dadosdoaluno.nTickets} Tickets no momento.</Text>
            <TouchableOpacity 
                style={ styles.content} 
                //onPress={ () => {navegarpraporximarota ou abrir QRcode}}
            >
                    <Image style={ styles.ticketImage} source={Ticket} resizeMode="contain"/>
                    <Text style={ styles.contentText}>RESGATAR TICKETS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ styles.buyButton}                 
            onPress={ () => {}}
            >
                <Text style={ styles.buyButtonText}>COMPRAR TICKETS</Text>
            </TouchableOpacity>
        </View>
    )

}
