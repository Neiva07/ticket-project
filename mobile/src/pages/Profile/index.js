<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useContext, useMemo } from "react";
>>>>>>> 50d468c4f3a9d48bdaf42849eb4599d5eb6f2dc4

import { View, TouchableOpacity, Text, Image } from "react-native";
import NumericInput from "react-native-numeric-input";

import styles from "./styles";

import logo from "../../assets/logo.png";

import Ticket from "../../assets/Ticket.png";
import { AuthContext } from "../../context/Auth";
import { TicketContext } from "../../context/Tickets";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";

export default function Profile(props) {
  const [Dadosdoaluno, SetDadosdoaluno] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const {
    action: { logout }
  } = useContext(AuthContext);
  const {
    state: { tickets },
    action: { getTickets }
  } = useContext(TicketContext);

  const handleLogout = () => {
    logout();
    props.navigation.navigate("Auth");
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <TouchableOpacity style={styles.outButton} onPress={handleLogout}>
          <Text style={styles.outText}>Sair</Text>
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
      </View>
      <Text style={styles.nameText}>Olá {Dadosdoaluno.primeironome}!</Text>
      <Text style={styles.ticketText}>
        Você tem {tickets.length} Tickets no momento.
      </Text>
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          props.navigation.navigate("RedeemTicket");
        }}
      >
        <Image style={styles.ticketImage} source={Ticket} />
        <Text style={styles.contentText}>RESGATAR TICKETS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          setIsVisible(true);
          // props.navigation.navigate("Payment");
        }}
      >
        <Text style={styles.buyButtonText}>COMPRAR TICKETS</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
      >
        {isVisible && (
          <View style={styles.contentModal}>
            <Text style={styles.instructions}>
              O ingresso está 1.10 real :) Escolha quantos você quer comprar!
            </Text>
            <View style={styles.seprator} />
            <NumericInput
              initValue={ticketsQuantity}
              value={ticketsQuantity}
              onChange={quantity => setTicketsQuantity(quantity)}
              minValue={1}
              totalWidth={300}
              totalHeight={70}
              rounded
              textColor="#26547C"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="#06BA63"
              leftButtonBackgroundColor="#EA3788"
            />
            <View style={styles.seprator} />
            <Button
              onPress={() => {
                setIsVisible(false);
                props.navigation.navigate("Payment", {
                  amount: (ticketsQuantity * 1.1).toFixed(2)
                });
              }}
              type="outline"
              title="Pagar!"
            />
          </View>
        )}
      </Modal>
    </View>
  );
}
