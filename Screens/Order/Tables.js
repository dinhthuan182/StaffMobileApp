import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import Constants from 'expo-constants';

import TableCell from '../Cells/TableCell'

const currentTableList = [
    {id: 0, avaliable: false},
    {id: 1, avaliable: false},
    {id: 2, avaliable: true},
    {id: 3, avaliable: true},
    {id: 4, avaliable: true},
    {id: 5, avaliable: false},
    {id: 6, avaliable: true},
    {id: 7, avaliable: false},
    {id: 8, avaliable: false},
    {id: 9, avaliable: false},
    {id: 10, avaliable: false},
    {id: 11, avaliable: false}
]
export default class Tables extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={currentTableList}
                    numColumns = {2}
                    renderItem={({ item }) =>
                        <View style = {styles.cell}>
                            <TableCell table={item} />
                        </View>}
                    keyExtractor={item => item.id}
                    contentContainerStyle = {{marginHorizontal: 8}}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    cell: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8
    }
})