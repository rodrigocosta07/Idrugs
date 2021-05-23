import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import {
  ListItem,
  Avatar,
  SearchBar,
  makeStyles,
  Icon,
  Header,
  Button,
  Card,
  Overlay,
  LinearProgress,
  Input,
} from "react-native-elements";
import { useCartProduct } from "../../hooks/useCartProducs";
import instanceApi from "../../api/instanceAPI";
const iconMedicamento = require("../../../assets/medicamento.jpg");
import { useFocusEffect } from "@react-navigation/native";
import Modal from "modal-react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar, Colors } from 'react-native-paper';

function Main() {
  const keyExtractor = (item, index) => index.toString();
  const {
    cartProducts,
    getProducts,
    setCurrentShopping,
    currentShopping,
    getStorage,
    setStorage,
  } = useCartProduct();
  const [products, setProducts] = useState();
  const [totalValue, setTotalValue] = useState(0);
  const [shippingValue, setShippingValue] = useState(10.0);
  const [productsSum, setProductsSum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const getStatus = async () => {
    try {
      const obj = {
        idShopping: currentShopping.id,
      };
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await instanceApi.post("/getStatus", obj, config);
      const { data } = response;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getByLocalStorage = async () => {
    const localData = await getStorage("currentShopping");
    if (localData) {
      setCurrentShopping(JSON.parse(localData));
    }
  };

  useFocusEffect(() => {
    console.log(currentShopping);
    if (currentShopping.id) {
      setProducts(currentShopping.products);
      getStatus();
    } else {
      getByLocalStorage();
    }
  });

  const handleStatus = (status) => {
    switch(status[0]) {
      case "new":
          return "Pedido em andamento"
      case "preparing_for_shipment":
        return "Preparando para envio"
      case "order_on_the_way":
        return "Pedido a caminho"
      case "order_delivered":
        return "Pedido entregue"
    }
  }


  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 5 }}>
      <ListItem
        bottomDivider
        containerStyle={{
          borderRadius: 20,
          borderColor: "#fff",
          borderWidth: 1,
        }}
      >
        <Avatar source={iconMedicamento} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>R${item.value}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
  return (
    <>
      {currentShopping.id ? (
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            placement="center"
            centerComponent={{
              text: "Pedidos em andamento",
              style: { color: "#fff" },
            }}
            containerStyle={{
              backgroundColor: "#005eff",
              justifyContent: "space-around",
            }}
          />

          <Card style={{ width: "100%" }}>
            <View style={{ alignItems: "center", marginHorizontal: 15 }}>
              <Text
                h5
                style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
              >
                Pedido: {currentShopping.id.split("-")[0]}
              </Text>
              <Text
                h6
                style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
              >
                Status: {handleStatus(currentShopping.status)}
              </Text>
            </View>
            <ProgressBar progress={0.5} indeterminate={true} color={Colors.blue300} />

            <FlatList
              keyExtractor={keyExtractor}
              data={products}
              renderItem={renderItem}
              style={{
                padding: 10,
                borderRadius: 20,
                borderColor: "#fff",
                borderWidth: 1,
              }}
            />
          </Card>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginHorizontal: 15 }}>
            <Text
              h5
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Nenhum produto cadastrado
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

export default function ProductsEstablishment({ route, navigation }) {
  return (
    <>
      <Main route={route} navigation={navigation} />
    </>
  );
}
