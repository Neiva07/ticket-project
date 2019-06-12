import React, { useContext, useEffect } from "react";
import QRcode from "react-native-qrcode";
import { View, TextInput, Text } from "react-native";
import { TicketContext } from "../../context/Tickets";
import styles from "./styles";
import io from "socket.io-client";
import { HOST } from "../../context/Auth";
const socket = io(HOST);

const index = () => {
  const {
    state: { tickets }
  } = useContext(TicketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
  }, []);

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
