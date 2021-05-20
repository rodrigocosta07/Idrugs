import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar, SearchBar, makeStyles, Icon, Header, Button, Card, Overlay, Input } from 'react-native-elements';
import { useCartProduct } from '../hooks/useCartProducs'
import instanceApi from "../api/instanceAPI";
const iconMedicamento = require("../../assets/medicamento.jpg");
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'modal-react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main() {
    const keyExtractor = (item, index) => index.toString()
    const { cartProducts, getProducts } = useCartProduct();
    const [products, setProducts] = useState();
    const [totalValue, setTotalValue] = useState(0);
    const [shippingValue, setShippingValue] = useState(10.00);
    const [productsSum, setProductsSum] = useState(0);
    const [visible, setVisible] = useState(false);
    const [address, setAddress] = useState('')
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const calcValue = () => {
        if (products) {
            const value = products.reduce((a, b) => {
                if(a !== null && b !== null ){
                    return  a + Number(b.value)  
                }
            }, 0)
            setProductsSum(value)
            const totalValue = Number(value) + shippingValue
            setTotalValue(totalValue)
        }
    }

    const handleConfirm = async () =>{
        const productMapped = products.map((item) => {
            item.IdProduct = item.id
            return item
        })
        const obj = {
            totalValue: totalValue,
            freightValue: shippingValue,
            address: address,
            idEstablishment: products[0].IdEstablishment,
            payment: "dinheiro",
            status: "new",
            products: productMapped
        }
        try {
            const token = await AsyncStorage.getItem('userToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await instanceApi.post('/confirmPurchase', obj, config)
            console.log(response)
            toggleOverlay()
        }catch(error){
            console.log(error)
        }
        
    }


    useFocusEffect(() => {
        calcValue()
    })

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
                                onPress={() => toggleOverlay()}
                                title="Confirmar dados"
                            />
                        </View>

                        <Overlay ModalComponent={Modal} isVisible={visible} onBackdropPress={toggleOverlay}>
                            <Card>
                                <Card.Title>Confirmação do pedido</Card.Title>
                                <Card.Divider />
                                <Input
                                    placeholder='Endereço de entrega'
                                    onChangeText={value => setAddress(value)}
                                />
                                <View style={{ alignItems: 'center', marginHorizontal: 15 }}>
                                    <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>Valor frete: R$: {shippingValue} </Text>
                                    <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>Valor do pedido: R$: {productsSum} </Text>
                                    <Text h5 style={{ color: "#4f9deb", fontSize: 15, marginBottom: 10 }}>Valor total do pedido: R$: {totalValue} </Text>
                                </View>
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
                                    onPress={() => handleConfirm()}
                                    title="Finalizar Pedido"
                                />
                            </Card>
                        </Overlay>
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