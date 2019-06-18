import React, { useContext, useEffect } from "react";
import QRcode from "react-native-qrcode";
import { View, TextInput, Text } from "react-native";
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
    socket.disconnect(true);
    props.navigation.navigate("App");
  });

  return (
    <View style={styles.container}>
      {tickets.length > 0 ? (
        <QRcode
          value={tickets[0].qr_code}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      ) : null}
    </View>
  );
};

export default index;
