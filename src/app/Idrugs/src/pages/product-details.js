import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar, SearchBar, makeStyles, Icon, PricingCard, Card, ListItem, Button } from 'react-native-elements';
import instanceApi from "../api/instanceAPI";
const iconMedicamento = require("../../assets/medicamento.jpg");

function productDetails({ route, navigation }) {
    const [product, setProduct] = useState({})
    useEffect(() => {
        setProduct(route.params)
        console.log(route.params)
    }, [])
    return (
        <Card>
            <Card.Title>{product.name}</Card.Title>
            <Card.Divider />
            {/* <Card.Image source={require('../images/pic2.jpg')}>
                    
                
                   
                </Card.Image> */}
            <View style={{alignItems: 'center'}}>
                <Text h3 style={{ color: "#4f9deb",fontSize: 20, fontWeight: 400 }}>{`R$ ${product.value}`}</Text>
                <Text h5 style={{ color: "#4f9deb",fontSize: 15, }}>descricao blblablblba</Text>
            </View>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Adicionar ao carrinho' />
        </Card>
    );
}

export default productDetails;


