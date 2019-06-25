import React, { useContext, useCallback } from "react";
import QRcode from "react-native-qrcode";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { TicketContext } from "../../context/Tickets";
import styles from "./styles";
import io from "socket.io-client";
import { HOST } from "../../context/Auth";

const index = props => {
  const socket = io(HOST);
  const {
    state: { tickets }
  } = useContext(TicketContext);

  socket.on("connect", () => {
    socket.emit("dataSession", tickets[0].qr_code);
    console.log(socket.id);
    console.log(tickets[0].qr_code, "ticket");
  });

  socket.on("ticketChecker", data => {
    console.log(data.response, "status");
    handleBack();
  });

  const handleBack = useCallback(() => {
    socket.disconnect(true);
    Alert.alert(
      "Ticket lido com sucesso!",
      "Bom almoço e volte sempre :)",
      [
        {
          text: "OK",
          onPress: () => {
            props.navigation.navigate("App");
          }
        }
      ],
      { cancelable: false }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 20,
          color: "#000"
        }}
      >
        Aproxime do leitor o código abaixo para resgatar seu ticket!
      </Text>
      {tickets.length > 0 ? (
        <QRcode
          value={tickets[0].qr_code}
          size={250}
          bgColor="#015987"
          fgColor="white"
        />
      ) : null}
      <TouchableOpacity style={styles.outButton} onPress={handleBack}>
        <Text style={styles.outText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
