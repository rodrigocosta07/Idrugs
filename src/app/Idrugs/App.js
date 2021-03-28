import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useReducer, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListProducts from "./src/pages/list-products";
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import { Ionicons } from "@expo/vector-icons";
import {AuthContext} from  './src/auth/authContext'
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen() {
  const { signOut } = React.useContext(AuthContext);
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

export default function App({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const getStorage = async key => {
   return await AsyncStorage.getItem(key);
  }

  const setStorage = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }

  useEffect(() => {
    console.log(AuthContext)
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await getStorage('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
          console.log(data)
          let token
          if(data.token){
            await setStorage('userToken', data.token);
            token = data.token
          }
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
            <Stack.Navigator screenOptions={({ route }) => ({
              headerShown: (route.name === 'Login' ? false : true)
            })}>
              <Stack.Screen name="loading" component={SplashScreen} />
            </Stack.Navigator>
          ): state.userToken == null ? (
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
          )}
      </NavigationContainer>
    </AuthContext.Provider>

  );
}