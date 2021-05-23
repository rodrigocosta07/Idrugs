import React, { useEffect, useState, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListProducts from "./list-products";
import productDetails from "./product-details";
import Login from "./login";
import Register from "./register";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCart from "./shopping-cart";
import ShoppingStatus from "./shopping-status";
import OrderList from "./establishment-pages/orders-list";
import Order from "./establishment-pages/order";
import ProductsEstablishment from "./establishment-pages/products";
import { useAuth } from "../hooks/useAuth";

function SettingsScreen() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pedidos</Text>
      <TouchableOpacity
        onPress={() => {
          signOut();
        }}
      >
        <Text>sair</Text>
      </TouchableOpacity>
    </View>
  );
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Main({ navigation }) {
  const { auth, initContext, getAuth } = useAuth();

  const HomePages = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Produtos" component={ListProducts} />
        <Stack.Screen name="Detalhes" component={productDetails} />
      </Stack.Navigator>
    );
  };

  const HomePagesEstablishment = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Pedidos" component={OrderList} />
        <Stack.Screen name="Pedido" component={Order} />
      </Stack.Navigator>
    );
  };


  const CartPages = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Status" component={ShoppingStatus} />
        <Stack.Screen name="Carrinho" component={ShoppingCart} />
      </Stack.Navigator>
    );
  };

  useEffect(() => {});

  const logingSplash = () => {
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name === "Login" ? false : true,
        })}
      >
        <Stack.Screen name="loading" component={SplashScreen} />
      </Stack.Navigator>
    );
  };

  const logingRegister = () => {
    return (
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name === "Login" ? false : true,
        })}
      >
        <Stack.Screen
          options={{ header: false, headerTransparent: true }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Cadastro" component={Register} />
      </Stack.Navigator>
    );
  };

  const userPages = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            } else if (route.name === "Pedidos") {
              iconName = "cart-sharp";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#005eff",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomePages} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Pedidos" component={CartPages} />
      </Tab.Navigator>
    );
  };

  const establishmentPages = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            } else if (route.name === "Pedidos") {
              iconName = "cart-sharp";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#005eff",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Inicio" component={HomePagesEstablishment} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Pedidos" component={ProductsEstablishment} />
      </Tab.Navigator>
    );
  };

  const loadPages = () => {
    if(auth && auth.isLoading){
     return logingSplash()
    } else if((auth && !auth.userToken) || (auth && auth.isSignout) || !auth) {
      return logingRegister()
    } else if ( auth && auth.userToken && auth.userType === "USER"){
      return userPages()
    } else {
      return establishmentPages()
    }
  }

  return (
    <NavigationContainer>
      {loadPages()}
    </NavigationContainer>
  );
}

export default function Init({ route, navigation }) {
  return (
    <>
      <Main route={route} navigation={navigation} />
    </>
  );
}
