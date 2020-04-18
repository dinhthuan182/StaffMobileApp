import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

export default function MenuCell(props) {
    const { product } = props;

    const [stateChoice, setStateChoice] = useState(false)
    const [quantity, setQuantity] = useState(product.quantity)

    const handleMinus = () => {
        const newValue = quantity - 1;
        
        if (newValue > product.quantity) {
            setQuantity(newValue);
            setStateChoice(true);
        } else {
            setQuantity(product.quantity);
            setStateChoice(false);
        }
    }

    const handleAdd = () => {
        const newValue = quantity + 1;
        setQuantity(newValue);
        setStateChoice(1);
    }

    const selectedCell = () => {
        if (stateChoice == true) {
            setQuantity(0)
        } else {
            setQuantity(1)
        }
        setStateChoice(!stateChoice)
    }

    return (
        <TouchableOpacity activeOpacity = {0.7}
            onPress = { selectedCell }>
            <View style = { [styles.container, 
                stateChoice == false ? styles.defaultState : styles.choiceState
                ]} >
                
                <Image style = {styles.img}/>

                <View style = {styles.contentView}>
                    <Text style = {styles.nameText}>{product.name}</Text>
                    
                    {product.salePrice == 0 ? 
                        <Text style = {styles.priceText}>$ {product.price}</Text> 
                        :
                        <View style = {styles.priceView}>
                            <Text style = {styles.priceText}>$ {product.salePrice} </Text>
                            <Text style = {styles.salePriceText}>$ {product.price}</Text>
                        </View>
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
        backgroundColor: 'green',
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