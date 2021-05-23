import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  ListItem,
  Avatar,
  SearchBar,
  makeStyles,
  Icon,
  PricingCard,
  Header,
  Overlay
} from "react-native-elements";
import Modal from "modal-react-native-web";
import instanceApi from "../api/instanceAPI";
import { useCartProduct } from "../hooks/useCartProducs";
import ShoppingCart from "./shopping-cart";
const iconMedicamento = require("../../assets/medicamento.jpg");

function ListProducts({ navigation }) {
  const keyExtractor = (item, index) => index.toString();
  const [products, setProducts] = useState([]);
  const { headerButton, visibleCart, toggleOverlay } = useCartProduct();

  const handleProductDetail = (product) => {
    navigation.navigate("Detalhes", product);
  };

  const loadProducts = async () => {
    try {
      const response = await instanceApi.get("/getAllProducts");
      const { data } = response;
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('iniciou')
    loadProducts();
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleProductDetail(item)}
      style={{ marginVertical: 5 }}
    >
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
        <Icon
          name={"cart-plus"}
          type="font-awesome"
          color="#005eff"
          onPress={() => console.log("hello")}
          containerStyle={{ alignItems: "flex-end", paddingRight: "20px" }}
        />
      </ListItem>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        placement="center"
        centerComponent={{ text: "Produtos", style: { color: "#fff" } }}
        containerStyle={{
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#005eff",
          height: 50,
        }}
        rightComponent={headerButton(navigation)}
      />
      <View>
        <SearchBar
          lightTheme={true}
          round={true}
          placeholder="Digite o nome do produto..."
        />
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={products}
        renderItem={renderItem}
        style={{ padding: 10 }}
      />
      <Overlay
        ModalComponent={Modal}
        isVisible={visibleCart}
        fullScreen={true}
        onBackdropPress={toggleOverlay}
      >
        <ShoppingCart  navigation={navigation} />
      </Overlay>
    </SafeAreaView>
  );
}
export default ListProducts;
