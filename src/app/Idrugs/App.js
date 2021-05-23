import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./src/auth/authContext";
import { CartProductsProvider } from "./src/contexts/cartContext";
import Init from "./src/pages/init";


export default function App({ navigation }) {
  return (
    <AuthProvider>
      <CartProductsProvider>
        <Init/>
      </CartProductsProvider>
    </AuthProvider>
  );
}
