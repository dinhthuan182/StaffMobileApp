import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import * as C from '../../Constants'

export default function ProductCell(props) {
    const { product } = props;

    const [stateChange, setStateChange] = useState(0)
    const [quantity, setQuantity] = useState(product.quantity)

    const handleMinus = () => {
        const newValue = quantity - 1;
        
        if (newValue > product.quantity) {
            setQuantity(newValue);
            setStateChange(1);
        } else {
            setQuantity(product.quantity);
            setStateChange(0);
        }
    }

    const handleAdd = () => {
        const newValue = quantity + 1;
        setQuantity(newValue);
        setStateChange(1);
    }

    return (
        <View style = { [styles.container, 
            stateChange == 0 ? styles.currentState : 
                stateChange == 1 ? styles.updateState : 
                    styles.newState
            ]} >
            <View style = {styles.productView}>
                
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
                        <Text style = {styles.priceText}>$ {product.salePrice}<Text style = {styles.salePriceText}>$ {product.price}</Text> </Text>
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
                    { stateChange != 1 && stateChange != 0 ? (
                        <TouchableOpacity 
                            style = {styles.btnDelete}>
                            <Icons name = {'close'}
                                size = {23}
                                color = {'rgb(0, 0, 0)'}
                            />
                        </TouchableOpacity>
                        ): null
                    }
                </View>
            </View>
                    
            <View style = {styles.noteView}>
                <Text style = { styles.noteTitle}>Note: </Text>
                <TextInput placeholder = {'Note'}
                    multiline
                    editable = {stateChange == 0 ? false : true}
                    style = {styles.noteInput} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    productView: {
        flexDirection: 'row',
    },
    img: {
        height: 120,
        width: 120
    },
    contentView: {
        marginHorizontal: 10,
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
    currentState: {
        borderColor: 'rgb(0, 230, 0)',
    },
    newState: {
        borderColor: 'rgb(255, 0, 0)'
    },
    updateState: {
        borderColor: 'rgb(255, 204, 0)'
    },
    noteView: {
        flexDirection: 'row',
    },
    noteTitle: {
        fontSize: 16
    },
    noteInput: {
        fontSize: 16,
        width: '88%'
    },
    btnDelete: {
        position: 'absolute',
        marginLeft: '90%'
    },
})