import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar, SearchBar, makeStyles, Icon, Header, Button, PricingCard } from 'react-native-elements';
import { useCartProduct } from '../hooks/useCartProducs'
import { CartProductsProvider } from '../contexts/cartContext'
const iconMedicamento = require("../../assets/medicamento.jpg");
import { useFocusEffect } from '@react-navigation/native';

function Main() {
    const keyExtractor = (item, index) => index.toString()
    const { cartProducts, getProducts } = useCartProduct();
    const [products, setProducts] = useState();
    useEffect(() => {
        setProducts(cartProducts)
    }, [cartProducts])
    const renderItem = ({ item }) => (
        <View style={{ marginVertical: 5 }}>
            <ListItem bottomDivider containerStyle={{ borderRadius: 20, borderColor: '#fff', borderWidth: 1 }}  >
                <Avatar source={iconMedicamento} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>R${item.value}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name={'edit'}
                    type='font-awesome' color='#005eff'
                    onPress={() => console.log('hello')}
                    containerStyle={{ alignItems: 'flex-end', paddingRight: '20px' }} />
                <Icon name={'trash'}
                    type='font-awesome' color='#005eff'
                    onPress={() => console.log('hello')}
                    containerStyle={{ alignItems: 'flex-end', paddingRight: '20px' }} />
            </ListItem>
        </View>
    )
    return (
        <>
            {
                products ?
                    <SafeAreaView style={{ flex: 1 }}>
                        <Header
                            placement="center"
                            centerComponent={{ text: 'Carrinho de compras', style: { color: '#fff' } }}
                            containerStyle={{
                                backgroundColor: '#005eff',
                                justifyContent: 'space-around'
                            }}
                        />
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={products}
                            renderItem={renderItem}
                            style={{ padding: 10, borderRadius: 20, borderColor: '#fff', borderWidth: 1 }}
                        />
                        <View style={{ position: "relative", alignItems: "center", margin: 5 }}>
                            <Button
                                icon={
                                    <Icon
                                        name="check"
                                        size={15}
                                        color="white"
                                        style={{ margin: 5 }}
                                    />
                                }
                                buttonStyle={{ width: 200, padding: 20, borderRadius: 20, borderColor: '#005eff', borderWidth: 1 }}
                                iconRight
                                title="Finalizar Pedido"
                            />
                        </View>
                    </SafeAreaView>
                    : null
            }
        </>
    )
}

export default function ShoppingCart({ route, navigation }) {
    return (
        <>

            <Main route={route} navigation={navigation} />

        </>
    )
};