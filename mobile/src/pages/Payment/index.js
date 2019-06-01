import React, { useState, useRef } from "react";
import QRcode from "react-native-qrcode";
import styles from "../RedeemTicket/styles";

import { WebView, View, Platform, Text, Alert } from "react-native";
const source = require("./paypal.html");

const index = props => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const webviewEl = useRef(null);

  const isAdroid = Platform.OS === "android";

  const patchPostMessageJsCode =
    "(" + String(patchPostMessageFunction) + ")();";

  const handleMessage = event => {
    const data = event.nativeEvent.data;
    console.log(data);
    const dataParsed = JSON.parse(data);

    if (dataParsed.status == "success") {
      console.log("success");
      Alert.alert(
        "Pagamento finalizado!",
        dataParsed.message,
        [{ text: "OK", onPress: () => props.navigation.navigate("App") }],
        { cancelable: false }
      );
    } else {
      setLoading(false);
      alert("Failed, " + dataParsed.message);
    }
  };

  const patchPostMessageFunction = () => {
    const originalPostMessage = window.postMessage;

    const patchedPostMessage = (message, targetOrigin, transfer) => {
      originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = () => {
      return String(Object.hasOwnProperty).replace(
        "hasOwnProperty",
        "postMessage"
      );
    };
    window.postMessage = patchedPostMessage;
  };

  const monitoringNavigation = event => {
    console.log(event);
  };

  const sendData = () => {
    //need code the provider of this data
    const data = {
      amount: 15,
      orderId: "k"
    };

    if (!sent) {
      webviewEl.current.postMessage(JSON.stringify(data));
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ overflow: "scroll" }}
        source={isAdroid ? { uri: "file:///android_asset/index.html" } : source}
        originWhitelist={["*"]}
        mixedContentMode={"always"}
        useWebKit={Platform.OS == "ios"}
        onLoadEnd={() => sendData()}
        ref={webviewEl}
        thirdPartyCookiesEnabled={true}
        scrollEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={patchPostMessageJsCode}
        allowUniversalAccessFromFileURLs={true}
        onMessage={handleMessage}
        onNavigationStateChange={monitoringNavigation}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default index;
