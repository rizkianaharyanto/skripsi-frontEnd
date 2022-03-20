import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'


const TabAktivitas = () => {
    return (
        <View style={styles.tab}>
            <TouchableOpacity style={styles.tabBtnActive}>
                <Text style={styles.tabTxtActive}>Berjalan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabBtnNon}>
                <Text style={styles.tabTxtNon}>Riwayat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TabAktivitas;

const styles = StyleSheet.create({
    tab : {
        flexDirection: 'row',
        backgroundColor : 'white',
        justifyContent : 'space-between',
        // marginHorizontal : 48
    },
    tabBtnActive : {
        padding : 12, 
        flex : 1,
        marginBottom : 16,
    },
    tabTxtActive : {
        fontSize : 14,
        fontWeight : 'bold',
        textAlign : 'center',
        color : '#00AA13'
    },
    tabBtnNon : {
        padding : 12, 
        borderLeftWidth : 1,
        borderRightWidth : 1,
        borderBottomWidth : 1,
        borderColor : 'lightgrey',
        flex : 1,
        marginBottom : 16
    },
    tabTxtNon : {
        fontSize : 14,
        fontWeight : 'bold',
        textAlign : 'center',
        color : 'lightgrey'
    }
})
