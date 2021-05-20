import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const  AuthContext = createContext({userToken: null });

export function AuthProvider({ children }) {


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

  const initContext = (init) => {
   console.log(init)
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getStorage('userToken');
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
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
        token = data.token
      }
      dispatch({ type: 'SIGN_IN', token });
    }
    
    const signOut = () => dispatch({ type: 'SIGN_OUT' })
    
    const signUp  = async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
    return (
      <>
        <AuthContext.Provider value={{ signOut, signIn, signUp, state, initContext }}>
          {children}
        </AuthContext.Provider>
      </>
    );
  }
