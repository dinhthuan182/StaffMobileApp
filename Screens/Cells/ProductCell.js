import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import * as C from '../../Constants'

export default function ProductCell(props) {
    const { product, onUpdateOrder } = props;

    const [stateChange, setStateChange] = useState(typeof product.isNew != 'undefined' ? 2 : 
                                                    typeof product.isUpdate != 'undefined' ? 1: 0)
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(product.quantity)
        setStateChange(typeof product.isNew != 'undefined' ? 2 : 
        typeof product.isUpdate != 'undefined' ? 1: 0)
    }, [product.quantity, product.isUpdate, product.isNew, product.oldQuantity])

    const handleMinus = () => {
        const newValue = quantity - 1;
        if (typeof product.isNew != 'undefined') {
            if (newValue > 0) {
                setQuantity(newValue)
                onUpdateOrder(product.id, newValue, "", 1);
            } else {
                onUpdateOrder(product.id, 0, "", 0);
            }
        } else if (typeof product.isUpdate != 'undefined') {
            if (newValue > product.oldQuantity) {
                setQuantity(newValue);
                onStateChange(1);
                onUpdateOrder(product.id, newValue, "", 2);
            } else {
                setQuantity(product.oldQuantity);
                onStateChange(0);
                onUpdateOrder(product.id, product.oldQuantity, "", 2);
            }
        } 
        
    }

    const handleAdd = () => {
        const newValue = quantity + 1;
        setQuantity(newValue);
        onStateChange(1);
        onUpdateOrder(product.id, newValue, "", 2);
    }

    const onStateChange = (value) => {
        if (typeof product.isNew == 'undefined') {
            if (typeof product.isUpdate != 'undefined' && quantity > product.oldQuantity) {
                setStateChange(1)
            } else {
                setStateChange(0)
            }
           
        } else {
            setStateChange(2)
        }
    }

    const handleDelete = () => {
        onUpdateOrder(product.id, 0, "", 0);
    }

    const noteChange = (text) => {
        onUpdateOrder(product.id, 0, text, 3);
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
                    <View style = {styles.nameView}>
                        <Text style = {styles.nameText} numberOfLines = {0}>{product.name}</Text>
                        { stateChange != 1 && stateChange != 0 ? (
                            <TouchableOpacity 
                                onPress = {handleDelete}>
                                <Icons name = {'close'}
                                    size = {23}
                                    color = {'rgb(0, 0, 0)'}
                                />
                            </TouchableOpacity>
                            ): null 
                        }
                    </View>
                    
                    <Text>Type: {product.type}</Text>

                    {product.sale_price == null ? 
                        <Text style = {styles.priceText}>$ {product.price}</Text> 
                        :
                        <Text style = {styles.priceText}>$ {product.sale_price} <Text style = {styles.salePriceText}>$ {product.price}</Text> </Text>
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
                    
            <View style = {styles.noteView}>
                <Text style = { styles.noteTitle}>Note: </Text>
                <TextInput placeholder = {'Note'}
                    onChangeText = {text => noteChange(text)}
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
    nameView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    nameText: {
        width: '73%',
        fontSize: 20,
        fontWeight: 'bold',

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
    quantityView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 50
    },
    quantityText: {
        width: 60,
        fontSize: 18,
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
})