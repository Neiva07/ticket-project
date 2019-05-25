import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { AuthContext } from "../../context/Auth";

const AuthLoading = props => {
  const {
    state,
    action: { hasValidToken }
  } = useContext(AuthContext);

  const redirect = async () => {
    props.navigation.navigate((await hasValidToken()) ? "App" : "Auth");
  };

  useEffect(() => {
    console.log(state);
    redirect();
  }, []);

  return (
    <View>
      <ActivityIndicator />

      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoading;
