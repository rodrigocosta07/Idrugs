import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar, SearchBar, makeStyles, Icon } from 'react-native-elements';
import instanceApi from "../api/instanceAPI";
const iconMedicamento = require("../../assets/medicamento.jpg");
function ListProducts() {
    const keyExtractor = (item, index) => index.toString()
    const [products, setProducts] = useState([])

    const loadProducts = async () =>{
        try{
            const response = await instanceApi.get('/getAllProducts')
            const {data} = response
            console.log(data)
            setProducts(data)
        }catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadProducts()
    }, [])
    const renderItem = ({ item }) => (
        <View>
            <ListItem bottomDivider  >
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
        </View>
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
            />
        </SafeAreaView>
    )
}
export default ListProducts;


