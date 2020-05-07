import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function PromotionCell(props) {
    const { promotion, moveToDetail } = props;

    const move = () => {
        moveToDetail(promotion.id);
    }
    
    return (
        <TouchableOpacity 
            activeOpacity = {0.7}
            onPress = {move} >
            <View style = { styles.container} >
                <Text style = { styles.nameText } >{promotion.name}</Text>
                <Text style = { styles.saleText } >Sale: {promotion.sale_percent * 100}%</Text>
                <Text style = { styles.desText } >{promotion.description}</Text>
                <Text style = {styles.timeTitle}>Time: 
                    <Text style = { styles.timeText } > {promotion.start_at} - {promotion.end_at}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgb(100, 100, 100)',
        borderWidth: 2,
        padding: 10,
    },
    nameText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    saleText: {
        fontSize: 18,
        width: '100%'
    },
    desText: {
        fontSize: 14,
        width: '100%',
        marginTop: 10
    },
    timeText: {
        fontSize: 15,
        fontStyle: 'italic',
        width: '100%',
        
    },
    timeTitle: {
        fontSize: 15,
        fontStyle: 'italic',
        width: '100%',
        marginTop: 10
    },
})