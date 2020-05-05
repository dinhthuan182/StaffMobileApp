import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';

import Promotion from '../Cells/PromotionCell';
import Splash from '../Splash';

import { useAuth } from "../../Providers/Auth";

import * as homeApi from "../../Services/Home"

export default function Home(props) {
    const {navigate} = props.navigation;
    const {state } = useAuth();
    
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        let allPromotions = await homeApi.getPromotions()
        if (allPromotions != null) {
            setPromotions(allPromotions)
        }
        
        setLoading(false)
    }

    const moveToDetail = async (id) => {
        setLoading(true)
        
        let detail = await homeApi.promotionDetail(id);
        
        if(detail != null) {
            navigate('PromotionDetail', {
                titleHeader: detail.name,
                detail: detail
            })
        } else {
            Alert.alert(
                "Warning",
                "Please check your network connection.",
                [
                    { text: "Ok"}
                ],
                { cancelable: false }
            );
        }

        setLoading(false)
    }

    if (state.isLoggedIn) {
        return (
            <View style = {styles.container}>
                {loading ? <Splash/>: null }
                <FlatList
                    data={promotions}
                    numColumns = {1}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <Promotion
                                promotion = {item}
                                moveToDetail = {moveToDetail} />
                        </View>}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle = {{marginHorizontal: 16}}
                    style = {styles.list}
                />
            </View>
        );
    } else {
        return (
            <View style = {styles.container}>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
    cell: {
        flex: 1,
        marginVertical: 8,
        width: '100%'
    }
});