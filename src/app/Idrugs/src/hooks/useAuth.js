import { useContext } from "react"
import {AuthContext} from '../auth/authContext'

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}