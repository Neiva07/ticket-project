import React from "react";
import axios from "axios";

export const AuthContext = React.createContext({});
import AsyncStorage from "@react-native-community/async-storage";

const HOST = "localhost:3000";

export class AuthProvider extends React.PureComponent {
  state = {
    token: "",
    user: {},
    isLogin: false
  };

  componentDidMount() {
    this.hasValidToken();
  }

  hasValidToken = async () => {
    const token = await AsyncStorage.getItem("@token");
    if (!token) return;

    const request = this.request(token);

    try {
      const response = await request("GET", "users/me");
      if (response.success) {
        const { user } = response.data;
        if (user) {
          this.setState({ user, token, isLogin: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  login = async (enrollment_number, password, email) => {
    const request = this.request();

    const url = "auth/signin";

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
              await AsyncStorage.setItem("@token", token);
              resolve();
            }
          );
        } else throw new Error("Falha no login.");
      } catch (err) {
        console.log(err);
        reject();
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
      //caso haja pesquisa um dia
      if (method === "GET" && data) {
        Object.keys(data).forEach(key =>
          route.searchParams.append(key, data[key])
        );
      } else if (data) {
        options["body"] = JSON.stringify(data);
        header.append("Content-Type", "application/json");

        options["headers"] = header;
        console.log(route, route.href, options);

        try {
          const requestPromise = await fetch(route.href, options).then(res =>
            res.json()
          );
          return requestPromise;
        } catch (err) {
          console.log(err);
        }
      }
    };
  };

  render() {
    const value = {
      state: { ...this.state },
      action: {
        login: this.login,
        logout: this.logout,
        signup: this.signup,
        request: this.request()
      }
    };
    return <AuthContext.Provider value={value} {...this.props} />;
  }
}
