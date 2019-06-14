import React, { useState, useEffect, useContext, useMemo } from "react";

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
