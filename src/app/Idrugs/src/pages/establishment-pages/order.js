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
import { ProgressBar, Colors } from "react-native-paper";
const statusOptions = ["new","preparing_for_shipment", "order_on_the_way", "order_delivered"]
function Main({ route, navigation }) {
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
  const [order, setOrder] = useState({});
  const [currentStatus, setCurrentStatus] = useState("");
  const [nextStatus, setNextStatus] = useState();
  const [shippingValue, setShippingValue] = useState(10.0);
  const [productsSum, setProductsSum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");

  const getStatus = async (orderData) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await instanceApi.get(
        `/getById/${orderData.id}`,
        config
      );
      const { data } = response;
      console.log(data);
      setOrder(data.shopping);
      setProducts(data.shopping.products)
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

  const handleStatus = (status) => {
    switch (status) {
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

  const handleStatusOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const obj = {
        idShopping: order.id,
        status: statusOptions[nextStatus]
      }
      const response = await instanceApi.post(
        `/changeStatus`,
        obj,
        config
      );
      const { data } = response;
      console.log(data);
      setCurrentStatus(data.shopping.status)
      setNextStatus(nextStatus + 1)
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 0 }}>
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

  useEffect(() => {
    const order = route.params;
    console.log(order);
    getStatus(order);
    const indexStatus = statusOptions.indexOf(order.status[0])
    console.log(currentStatus)
    setNextStatus(indexStatus + 1) 
    setCurrentStatus(handleStatus(order.status[0]))
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        placement="center"
        centerComponent={{
          text: "Pedido em andamento",
          style: { color: "#fff" },
        }}
        containerStyle={{
          backgroundColor: "#005eff",
          justifyContent: "space-around",
        }}
      />
      {order && order.id ? (
        <Card style={{ width: "100%" }}>
          <View style={{ alignItems: "center", marginHorizontal: 15 }}>
            <Text
              h5
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Pedido: {order.id.split("-")[0]}
            </Text>
            <Text
              h6
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Status: {handleStatus(order.status[0])}
            </Text>
            <Text
              h5
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Valor Total: R$:{order.TotalValue}
            </Text>
            <Text
              h6
              style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}
            >
              Valor do Frete: R$:{order.freightValue}
            </Text>
            
               
            { currentStatus !== "Pedido entregue" ? 
            (<Button
            onPress={() => handleStatusOrder()}
            buttonStyle={{ width: 150, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,  }}
            titleStyle={{ marginHorizontal: 5, fontSize: 12 }}
            title={handleStatus(statusOptions[nextStatus])} />) : null
          }
            
      
        
          </View>
      
          <View style={{ alignItems: "center", marginHorizontal: 15 }}>
          <Text  h6 style={{ color: "#4f9deb", fontSize: 15 ,  marginTop: 10, marginBottom: 0}}>
             Produtos
            </Text>
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
          </View>
         
        </Card>
      ) : (
        <View style={{ alignItems: "center", marginHorizontal: 15 }}>
          <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>
            Nenhum pedido realizado
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default function Order({ route, navigation }) {
  return (
    <>
      <Main route={route} navigation={navigation} />
    </>
  );
}
