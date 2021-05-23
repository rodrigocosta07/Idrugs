import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
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
import { ProgressBar, Colors } from "react-native-paper";

function Main({navigation}) {
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
  const [orders, setOrders] = useState([]);
  const [shippingValue, setShippingValue] = useState(10.0);
  const [productsSum, setProductsSum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await instanceApi.get("/getByEstablishment", config);
      const { data } = response;
      console.log(data.shopping);
      const filtered = data.shopping.sort((a,b) =>  new Date(a.createdAt) > new Date(b.createdAt) ? -1 : new Date(a.createdAt) > new Date(b.createdAt) ? 1 : 0)
      setOrders(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = (order) => {
    navigation.navigate("Pedido", order);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleStatus = (status) => {
    switch (status[0]) {
      case "new":
        return "Pedido em andamento";
      case "preparing_for_shipment":
        return "Preparando para envio";
      case "order_on_the_way":
        return "Pedido a caminho";
      case "order_delivered":
        return "Pedido entregue";
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => handleOrder(item)}>
      <ListItem
        bottomDivider
        containerStyle={{
          borderRadius: 20,
          borderColor: "#fff",
          borderWidth: 1,
        }}
      >
        <ListItem.Content>
          <ListItem.Title>Pedido:{item.id.split("-")[0]}</ListItem.Title>
          <ListItem.Subtitle>R$ {item.TotalValue}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Endereço de entrega: {item.address}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            Status: {handleStatus(item.status)}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
  return (
    <>
      {orders.length > 0 ? (
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
          <FlatList
              keyExtractor={keyExtractor}
              data={orders}
              renderItem={renderItem}
              style={{
                padding: 10,
                borderRadius: 20,
                borderColor: "#fff",
                borderWidth: 1,
              }}
            />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginHorizontal: 15 }}>
            <Text
              h5
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Nenhum pedido solicitado
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

export default function OrderList({ route, navigation }) {
  return (
    <>
      <Main route={route} navigation={navigation} />
    </>
  );
}
