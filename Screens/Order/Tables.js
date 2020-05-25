import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import Pusher from 'pusher-js/react-native';
import * as C from '../../Constants';

import TableCell from '../Cells/TableCell'
import Splash from '../Splash'
// api network
import * as api from '../../Services/Order'

export default function Tables(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    // pusher config
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;

    var pusher = new Pusher(C.PUSHER_APP_KEY, {
        cluster: C.PUSHER_APP_CLUSTER
    });

    var channel = pusher.subscribe(C.PUSHER_APP_CHANNEL);
    channel.bind(C.PUSHER_GET_TABLES_EVENT, function(data) {
        fetchData();
    });

    useEffect(() => {
        setLoading(true)
        fetchData()
        setLoading(false)

        return () => {
            channel.unbind(C.PUSHER_GET_TABLES_EVENT)
        };
    }, [])

    const fetchData = async () => {
        let allTable = await api.getTables();
        if (allTable != null) {
            setTables(allTable)
        }
    }

    const moveToDetail = async (id) => {
        setLoading(true)
        let item = tables.filter( i => {
            return i.id == id
        })

        let detail = await api.getTableDetail(id);
        
        if(detail != null) {
            if (typeof detail === 'string' || detail instanceof String) {
                Alert.alert(
                    "Notification",
                    detail,
                    [
                        { text: "Ok"}
                    ],
                    { cancelable: false }
                );
            } else {
                navigate('TableDetail', {
                    titleHeader: `Table ${item[0].name}`,
                    table: item[0],
                    detail: detail
                })
            }
            
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

    return (
        <View style = {styles.container} >
            {loading ? <Splash/>: null }
            <FlatList
                data={tables}
                numColumns = {2}
                renderItem={({ item }) =>
                    <View style = {styles.cell}>
                        <TableCell
                            table = {item}
                            moveToDetail = {moveToDetail}
                        />
                    </View>}
                keyExtractor={item => item.id}
                contentContainerStyle = {{marginHorizontal: 8}}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cell: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8
    }
})