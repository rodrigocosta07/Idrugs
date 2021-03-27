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
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Input onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Email" />
      </View>

      <View style={styles.inputView}>
         <Input secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} onChangeText={(email) => setEmail(email)} style={styles.TextInput} placeholder="Senha" />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigation.navigate('Cadastro')}} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#9eb7e1",
    borderRadius: 30,
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
