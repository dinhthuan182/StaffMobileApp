import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';

import TableCell from '../Cells/TableCell'
import Splash from '../Splash'
// api network
import * as api from '../../Services/Order'

export default function Tables(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        let allTable = await api.getTables();
        if (allTable != null) {
            setTables(allTable)
        }
        
        setLoading(false)
    }

    const moveToDetail = async (id) => {
        setLoading(true)
        let item = tables.filter( i => {
            return i.id == id
        })

        let detail = await api.getTableDetail(id);
        
        if(detail != null) {
            navigate('TableDetail', {
                titleHeader: `Table ${item[0].name}`,
                table: item[0],
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