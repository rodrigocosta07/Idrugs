import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import instanceApi from "../api/instanceAPI";
export default function Register({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    console.log(data);
    try {
      const response = await instanceApi.post('/signup', data)
      console.log(response)
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
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
              placeholder="Nome"
            />
          )}
          name="name"
          defaultValue=""
          rules={{ required: true }}
        />
      </View>
      <View style={styles.inputView}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="email@email.com"
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
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder="(99) 9999-9999"
            />
          )}
          name="phone"
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
              placeholder="Confirmar Senha"
            />
          )}
          name="passwordConfirmation"
          defaultValue=""
          rules={{ required: true }}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
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
