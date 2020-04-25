import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

import * as C from '../../Constants'

export default function MenuCell(props) {
    const { product, onOrdersChange } = props;

    const [quantity, setQuantity] = useState(product.quantity)

    const handleMinus = () => {
        if (quantity > 0) {
            setQuantity(quantity -1);
            onOrdersChange(product.id, quantity-1);
        }
    }

    const handleAdd = () => {
        setQuantity(quantity+1);
        onOrdersChange(product.id, quantity+1)
    }

    const selectedCell = () => {
        if (quantity > 0) {
            setQuantity(0)
            onOrdersChange(product.id, 0)
        } else {
            setQuantity(1)
            onOrdersChange(product.id, 1)
        }
        
    }

    return (
        <TouchableOpacity activeOpacity = {0.7}
            onPress = { selectedCell }>
            <View style = { [styles.container, 
                quantity > 0 ? styles.choiceState : styles.defaultState
                ]} >
                
                <Image style = {styles.img}
                    source={{
                        uri: C.GET_IMAGE(product.url),
                    }} 
                />

                <View style = {styles.contentView}>
                    <Text style = {styles.nameText}>{product.name}</Text>
                    
                    {product.salePrice == null ? 
                        <Text style = {styles.priceText}>$ {product.price}</Text> 
                        :
                        <Text style = {styles.priceText}>$ {product.salePrice} <Text style = {styles.salePriceText}>$ {product.price}</Text></Text>
                    }

                    <View style = {styles.quantityView}>
                        <TouchableWithoutFeedback
                            onPress = { handleMinus} >
                            <Icons name = {'minuscircleo'}
                                size = {20}
                                color = {'rgb(0, 0, 0)'}
                                style = {styles.quantityIcon} />
                        </TouchableWithoutFeedback>

                        <Text style = {styles.quantityText} >{quantity}</Text>

                        <TouchableWithoutFeedback
                            onPress = { handleAdd } >
                            <Icons name = {'pluscircleo'}
                                size = {20}
                                color = {'rgb(0, 0, 0)'}
                                style = {styles.quantityIcon} />
                        </TouchableWithoutFeedback>
                    </View>
                    
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
    },
    img: {
        height: 120,
        width: 120
    },
    contentView: {
        marginHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 20
    },
    salePriceText: {
        fontSize: 16,
        fontStyle: 'italic',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        marginLeft: 5,
        marginTop: 5
    },
    priceView: {
        flexDirection: 'row',
    },
    quantityView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    quantityText: {
        width: 60,
        fontSize: 20,
        textAlign: 'center'
    },
    quantityIcon: {
        marginTop: 4
    },
    defaultState: {
        borderColor: 'rgb(104, 104, 104)',
    },
    choiceState: {
        borderColor: 'rgb(0, 230, 0)'
    },
})