import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

import * as C from '../../Constants'

export default function MenuCell(props) {
    const { product, onOrdersChange, isPromotion, salePercent } = props;

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
    if (isPromotion == false ) {
        return (
            <TouchableOpacity activeOpacity = {0.7}
                onPress = {selectedCell }>
                <View style = { [styles.container, 
                    quantity > 0 ? styles.choiceState : styles.defaultState
                    ]} >
                    
                    <Image style = {styles.img}
                        source={{
                            uri: C.GET_IMAGE(product.url),
                        }} 
                    />
    
                    <View style = {styles.contentView}>
                        <Text style = {styles.nameText} numberOfLines = {0}>{product.name}</Text>
                        <Text style = {styles.typeText}>Type: {product.type}</Text>
    
                        {product.sale_price == null ? 
                            <Text style = {styles.priceText}>$ {C.currencyFormat(product.price)}</Text> 
                            :
                            <Text style = {styles.priceText}>$ {C.currencyFormat(product.sale_price)}  <Text style = {styles.salePriceText}>{C.currencyFormat(product.price)}</Text> </Text>
                        }
    
                        <View style = {styles.quantityView}>
                            <TouchableWithoutFeedback
                                onPress = { handleMinus} >
                                <Icons name = {'minuscircleo'}
                                    size = {18}
                                    color = {'rgb(0, 0, 0)'}
                                    style = {styles.quantityIcon} />
                            </TouchableWithoutFeedback>
    
                            <Text style = {styles.quantityText} >{quantity}</Text>
    
                            <TouchableWithoutFeedback
                                onPress = { handleAdd } >
                                <Icons name = {'pluscircleo'}
                                    size = {18}
                                    color = {'rgb(0, 0, 0)'}
                                    style = {styles.quantityIcon} />
                            </TouchableWithoutFeedback>
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style = { [styles.container, styles.defaultState ]} >
                
                <Image style = {styles.img2}
                    source={{
                        uri: C.GET_IMAGE(product.url),
                    }} 
                />

                <View style = {styles.contentView}>
                    <Text style = {styles.nameText} numberOfLines = {0}>{product.name}</Text>
                    <Text style = {styles.typeText}>Type: {product.type}</Text>
                    <Text style = {styles.priceText}>$ {C.currencyFormat(product.price - product.price * salePercent)}  <Text style = {styles.salePriceText}>{C.currencyFormat(product.price)}</Text></Text>
                    
                </View>
            </View>
        );
    }
    
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
    img2: {
        height: 100,
        width: 100
    },
    contentView: {
        marginHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
    },
    typeText: {
        fontStyle: 'italic'
    },
    priceText: {
        fontSize: 18
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
        fontSize: 18,
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