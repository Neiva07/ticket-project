import React, { useContext, useState } from "react";
import QRcode from "react-native-qrcode";
import { View, TextInput, Text } from "react-native";
import { TicketContext } from "../../context/Tickets";
import styles from "./styles";
const index = () => {
  const {
    state: { tickets }
  } = useContext(TicketContext);

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
