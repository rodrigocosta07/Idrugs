import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, SearchBar, makeStyles, Icon, PricingCard, Card, ListItem, Button } from 'react-native-elements';
import { useCartProduct } from '../hooks/useCartProducs'
const iconMedicamento = require("../../assets/medicamento.jpg");

function Main({ route, navigation }) {
    const [product, setProduct] = useState({})
    const [count, setCount] = useState(0)
    const { cartProducts, setCartProducts, updateCart } = useCartProduct();

    const handleAddCount = () => {
        setCount(count + 1)
    }

    const handleSubCount = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const handleAddToCart = () => {
        product.count = count
        setProduct(product)
        updateCart(product)
    }

    useEffect(() => {
        setProduct(route.params)
        console.log(cartProducts)
    }, [])
    return (
        <Card>
            <Card.Title>{product.name}</Card.Title>
            <Card.Divider />
            <View style={{ alignItems: 'center' }}>
                <Text h3 style={{ color: "#4f9deb", fontSize: 20, fontWeight: 400 }}>{`R$ ${product.value}`}</Text>
                <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>Produto: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
            </View>
            <View style={{ alignItems: 'center', paddingHorizontal: 50, marginHorizontal: 'auto', marginVertical: 10, alignContent: 'space-between', flexWrap: 'wrap', flexDirection: 'row' }}>
                <Button
                    disabled={count === 0}
                    buttonStyle={{ width: 44, height: 44, marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: (44 / 2) }}
                    title='-'
                    onPress={() => handleSubCount()}
                />
                <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
                    <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>{count} </Text>
                </View>
                <Button
                    buttonStyle={{ width: 44, height: 44, marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: (44 / 2) }}
                    title='+'
                    onPress={() => handleAddCount()}
                />
            </View>
            <Button
                icon={<Icon name='add' color='#ffffff' />}
                onPress={() => handleAddToCart()}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Adicionar ao carrinho' />
        </Card>
    );
}

export default function productDetails({ route, navigation }) {
    return (
        <>
            <Main route={route} navigation={navigation} />
        </>
    )
};


