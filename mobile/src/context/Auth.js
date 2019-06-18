import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
// import axios from "axios";

export const AuthContext = React.createContext({});

export const HOST = "http://ticket-project.herokuapp.com";
// export const HOST = "http://192.168.56.1:3000";

export class AuthProvider extends React.PureComponent {
  state = {
    token: "",
    user: {},
    isLogin: false
  };

  // componentDidMount() {
  //   this.hasValidToken();
  // }

  hasValidToken = async () => {
    const token = await AsyncStorage.getItem("@token");
    if (!token) return;

    const request = this.request(token);
    try {
      const response = await request("GET", "users/me");
      console.log(response);
      if (response) {
        const { user } = response.data;
        if (user) {
          await this.setState({ user, token, isLogin: true }, () =>
            console.log(this.state)
          );
          return true;
        }
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  login = (enrollment_number, password, email) => {
    console.log("olaaaa");
    const request = this.request();

    const url = "auth/signin";

    console.log("ola", enrollment_number, password);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await request("POST", url, {
          enrollment_number,
          password,
          email
        });
        if (response.success) {
          const { token, user } = response.data;
          this.setState(
            {
              token,
              user,
              isLogin: true
            },
            async () => {
              console.log(this.state);
              await AsyncStorage.setItem("@token", token);
              resolve(true);
            }
          );
        } else throw new Error("Falha no login.");
      } catch (err) {
        console.log(err);
        reject(false);
      }
    });
  };

  logout = () => {
    this.setState(
      {
        token: "",
        user: {},
        isLogin: false
      },
      () => AsyncStorage.setItem("@token", "")
    );
  };

  //save image in another database in the future
  signup = async userData => {
    const request = this.request();
    const url = "auth/signup";

    return new Promise(async (resolve, reject) => {
      try {
        const response = await request("POST", url, userData);
        if (response.success) {
          resolve();
        } else {
          console.log(response);
          reject();
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  request = savedToken => {
    const token = savedToken || this.state.token;
    const host = HOST;

    return async (method, url, data) => {
      const header = new Headers();
      const options = { method };
      header.append("Authorization", `JWT ${token}`);

      const route = new URL(`${host}/${url}`);
      console.log(token, route);
      //caso haja pesquisa um dia
      if (method === "GET" && data) {
        Object.keys(data).forEach(key =>
          route.searchParams.append(key, data[key])
        );
      } else if (data) {
        options["body"] = JSON.stringify(data);
        header.append("Content-Type", "application/json");
      }
      options["headers"] = header;
      console.log(route, route.href, options);

      try {
        const requestPromise = await fetch(route.href, options).then(res => {
          console.log(res);
          return res.json();
        });
        console.log(requestPromise);
        return requestPromise;
      } catch (err) {
        console.log(err);
      }
    };
  };

  render() {
    const value = {
      state: { ...this.state },
      action: {
        hasValidToken: this.hasValidToken,
        login: this.login,
        logout: this.logout,
        signup: this.signup,
        request: this.request()
      }
    };
    return <AuthContext.Provider value={value} {...this.props} />;
  }
}
