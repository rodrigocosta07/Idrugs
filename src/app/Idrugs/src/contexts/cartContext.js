import React, { useEffect, useState } from 'react';

export const CartProductsContext = React.createContext(null);

export function CartProductsProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);


  const updateCart = (product) => {
    const exist = cartProducts.find((x) => x.id === product.id)
    let newArray = []
    if (exist) {
      if (product.count === 0) {
       newArray = cartProducts.filter((item) => {
          return item.id !== product.id
        })
      } else {
        newArray = cartProducts.map((item) => {
          if (item.id === product.id) {
            item.count = product.count
          }
          return item
        })
      }
    setCartProducts(newArray)
    } else {
      cartProducts.push(product)
      setCartProducts(cartProducts)
    }
  }

  const getProducts = () => {
    return cartProducts
  }

  return (
    <>
      <CartProductsContext.Provider value={{ cartProducts, setCartProducts, updateCart, getProducts }}>
        {children}
      </CartProductsContext.Provider>
    </>
  );
}
