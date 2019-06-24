import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
  },

  Top: {
    flexDirection: "row",
    marginBottom: 40,
    justifyContent: "space-between",
    marginHorizontal: 30,
    alignContent: "center"

  },

  content: {
    maxHeight: 300,
    width: 300,
    backgroundColor: "#F5F5F5",
    borderColor: "#015987",
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",

  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    marginTop: 5
  },

  logo: {
    alignSelf: "center",
    position: "relative"
  },

  buyButton: {
    borderColor: "#015987",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    width: "65%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    justifyContent: "center"
  },
  buyButtonText: {
    fontSize: 18,
    color: "#015987",
    fontWeight: "bold",
    textAlign: "center"
  },

  ticketImage: {
    justifyContent: "center",
    alignSelf: "center",
    maxHeight: 250,
    maxWidth: 250
  },
  contentModal: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  seprator: {
    height: 10,
    width: 200,
    margin: 10
  },
  contentText: {
    fontSize: 16,
    color: "#015987",
    fontWeight: "bold",
    marginTop: 15
  },

  ticketText: {
    fontSize: 18,
    color: "#212121",
    //fontWeight: "bold",
    marginBottom: 7.5,
    textAlign: "center"
  },

  nameText: {
    fontSize: 18,
    color: "#212121",
    fontWeight: "bold",
    textAlign: "center"
  },

  outText: {
    fontSize: 16,
    color: "#015987"
    //paddingRight: 10,
  },
});

export default styles;
