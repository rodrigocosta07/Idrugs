import React, { useEffect, useState } from "react";
import { Button, Icon, Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartProductsContext = React.createContext(null);

export function CartProductsProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [currentShopping, setCurrentShopping] = useState({});
  const [visibleCart, setVisibleCart] = useState(false);
  const toggleOverlay = () => {
    setVisibleCart(!visibleCart);
  };
  const headerButton = (navigation) => {
    return (
      <Icon
        name={"cart-plus"}
        type="font-awesome"
        size={15}
        color="white"
        style={{ margin: 10 }}
        onPress={() => {
          toggleOverlay();
        }}
      />
    );
  };
  const updateCart = (product) => {
    const exist = cartProducts.find((x) => x.id === product.id);
    let newArray = [];
    if (exist) {
      if (product.count === 0) {
        newArray = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
      } else {
        newArray = cartProducts.map((item) => {
          if (item.id === product.id) {
            item.count = product.count;
          }
          return item;
        });
      }
      setCartProducts(newArray);
    } else {
      cartProducts.push(product);
      setCartProducts(cartProducts);
    }
  };
  const getStorage = async key => {
    return await AsyncStorage.getItem(key);
  }

  const setStorage = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }
  const getProducts = () => {
    return cartProducts;
  };

  const modalCartProducts = () => {
    return (
      <Overlay
        ModalComponent={Modal}
        isVisible={visible}
        fullscreen={true}
        onBackdropPress={toggleOverlay}
      >
        <Text>Hello from Overlay!</Text>
      </Overlay>
    );
  };

  return (
    <>
      <CartProductsContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          updateCart,
          getProducts,
          currentShopping,
          setCurrentShopping,
          headerButton,
          visibleCart,
          toggleOverlay,
          getStorage,
          setStorage
        }}
      >
        {children}
      </CartProductsContext.Provider>
    </>
  );
}
