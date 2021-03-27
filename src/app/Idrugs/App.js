import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, AsyncStorageStatic } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListProducts from "./src/pages/list-products";
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const _retrieveData = async () => {
  try {
    const value = await AsyncStorageStatic.getItem("Login");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pedidos</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const tabViews = () => {
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Produtos") {
            iconName = focused ? "search-outline" : "search-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#005eff",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Produtos" component={ListProducts} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  </NavigationContainer>;
};

export default function App() {
  const [currentLogin, setCurrentLogin] = useState("");

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <NavigationContainer>
      {currentLogin ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Produtos") {
                iconName = focused ? "search-outline" : "search-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list-box" : "ios-list";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#005eff",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Produtos" component={ListProducts} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={({route}) => ({
          headerShown: (route.name === 'Login' ? false : true)
        })}>
          <Stack.Screen options={{ header:false, headerTransparent:true }} name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}