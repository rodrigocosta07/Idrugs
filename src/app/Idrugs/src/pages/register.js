import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { Image, Input } from "react-native-elements";
const image = require("../../assets/idrugsIcon.png");
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <Input onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Nome" />
      </View>
      <View style={styles.inputView}>
        <Input onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Email" />
      </View>

      <View style={styles.inputView}>
        <Input onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Email" />
      </View>

      <View style={styles.inputView}>
         <Input secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Senha" />
      </View>


      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '20px',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 40,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#005eff",
  },
});
