import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Image, Input } from "react-native-elements";
const image = require("../../assets/idrugsIcon.png");
import { useForm, Controller } from "react-hook-form";
import instanceApi from "../api/instanceAPI";
import { useAuth } from "../hooks/useAuth";
export default function Login({ navigation }) {
  const { signIn } = useAuth;
  const { cartProducts, getProducts } = useCartProduct();
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async form => {
    console.log(form);
    try {
      const response = await instanceApi.post('/signin', form)
      const {data} = response
      signIn({token: data.token})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Email"
            />
          )}
          name="email"
          defaultValue=""
          rules={{ required: true }}
        />
      </View>
      <View style={styles.inputView}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
            secureTextEntry={true}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="Senha"
            />
          )}
          name="password"
          defaultValue=""
          rules={{ required: true }}
        />
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate('Cadastro') }}>
        <Text style={styles.forgot_button}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
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
