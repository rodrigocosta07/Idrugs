import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListProducts from "./src/pages/list-products";
import productDetails from "./src/pages/product-details";
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import ShoopingCart from "./src/pages/shopping-cart";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from './src/auth/authContext'
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingCart from "./src/pages/shopping-cart";
import { CartProductsProvider } from "./src/contexts/cartContext";
import { useAuth } from "./src/hooks/useAuth";

function SettingsScreen() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pedidos</Text>
      <TouchableOpacity onPress={() => { signOut() }}>
        <Text >sair</Text>
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

export default function App({ navigation }) {
  const { state, initContext } = useAuth();

  const HomePages = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Produtos" component={ListProducts} />
        <Stack.Screen name="Detalhes" component={productDetails} />
      </Stack.Navigator>
    );
  }


  return (
    <AuthProvider>
      <CartProductsProvider>
        <NavigationContainer>
          {state && state.isLoading ? (
            <Stack.Navigator screenOptions={({ route }) => ({
              headerShown: (route.name === 'Login' ? false : true)
            })}>
              <Stack.Screen name="loading" component={SplashScreen} />
            </Stack.Navigator>
          ) : state && state.userToken == null ? (
            <Stack.Navigator screenOptions={({ route }) => ({
              headerShown: (route.name === 'Login' ? false : true)
            })}>
              <Stack.Screen options={{ header: false, headerTransparent: true }} name="Login" component={Login} />
              <Stack.Screen name="Cadastro" component={Register} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Home") {
                    iconName = focused ? "search-outline" : "search-outline";
                  } else if (route.name === "Settings") {
                    iconName = focused ? "ios-list-box" : "ios-list";
                  } else if (route.name === "Carrinho") {
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
              <Tab.Screen name="Carrinho" component={ShoppingCart} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </CartProductsProvider>
    </AuthProvider>

  );
}