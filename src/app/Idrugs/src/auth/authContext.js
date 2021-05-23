import React, { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const  AuthContext = createContext({
  isLoading: true,
  isSignout: false,
  userToken: null,
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoading: true,
    isSignout: false,
    userToken: null,
    userType: null
  })


  const initContext = async (init) => {
    let userToken;
    let userType
    try {
      userToken = await getStorage('userToken');
      userType = await getStorage('userType');
      if(!userToken) {
        setAuth({
          isLoading: true,
          isSignout: false,
          userToken: null,
          userType: null
        });
      }
    } catch (e) {
      console.log(e)
    }
    setAuth({
      isLoading: false,
      isSignout: false,
      userToken: userToken,
      userType: userType
    });
  }

  const getAuth = () => {
    return auth
  }

  useEffect(() => {
  initContext()
  }, []);

  const getStorage = async key => {
    return await AsyncStorage.getItem(key);
  }

  const setStorage = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  }
    
  const signIn = async (data) => {
      console.log(data)
      let token
      if (data.token) {
        await setStorage('userToken', data.token);
        await setStorage('userType', data.type);
        token = data.token
      }
      setAuth({
        isLoading: false,
        isSignout: false,
        userToken: token,
        userType: data.type
      });
    }
    
    const signOut = async () => {
      await AsyncStorage.clear()
      setAuth({
        isLoading: false,
        isSignout: true,
        userToken: null,
        userType: null
      });
    } 
    
    const signUp  = async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      setAuth({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
    return (
      <>
        <AuthContext.Provider value={{ signOut, signIn, signUp, auth, initContext }}>
          {children}
        </AuthContext.Provider>
      </>
    );
  }
