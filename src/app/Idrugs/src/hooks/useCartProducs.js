import { useContext } from "react"
import {CartProductsContext} from '../contexts/cartContext'

export function useCartProduct() {
    const context = useContext(CartProductsContext)
    return context
}