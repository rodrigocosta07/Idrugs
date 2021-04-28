import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView,TouchableOpacity } from 'react-native';
import { ListItem, Avatar, SearchBar, makeStyles, Icon, PricingCard } from 'react-native-elements';
import instanceApi from "../api/instanceAPI";
const iconMedicamento = require("../../assets/medicamento.jpg");

function ListProducts( { navigation }) {
    const keyExtractor = (item, index) => index.toString()
    const [products, setProducts] = useState([])


    const handleProductDetail = (product) => {
        navigation.navigate('Detalhes', product)
    }

    const loadProducts = async () => {
        try {
            const response = await instanceApi.get('/getAllProducts')
            const { data } = response
            console.log(data)
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadProducts()
    }, [])
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductDetail(item)} style={{ marginVertical: 5 }}>
            <ListItem bottomDivider containerStyle={{ borderRadius: 20, borderColor: '#fff', borderWidth: 1 }} >
                <Avatar source={iconMedicamento} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>R${item.value}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name={'cart-plus'}
                    type='font-awesome' color='#005eff'
                    onPress={() => console.log('hello')}
                    containerStyle={{ alignItems: 'flex-end', paddingRight: '20px' }} />
            </ListItem>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <SearchBar lightTheme={true} round={true} placeholder="Digite o nome do produto..." />
            </View>
            <FlatList
                keyExtractor={keyExtractor}
                data={products}
                renderItem={renderItem}
                style={{ padding: 10 }}
            />
        </SafeAreaView>
    )
}
export default ListProducts;


