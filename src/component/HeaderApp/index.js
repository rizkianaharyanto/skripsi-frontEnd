import React from 'react'
import { StyleSheet, Text, View} from 'react-native'

const HeaderApp = () => {
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>Aplikasi Skripsi Ana</Text>
            </View>
        </View>
    )
}

export default HeaderApp;

const styles = StyleSheet.create({
    page:{
        // backgroundColor : '#00AA13',
        backgroundColor : 'white',
    },
    header : {
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor : 'whitesmoke', 
        padding : 12
    },
    headerTxt : {
        fontSize : 28, 
        fontWeight : 'bold', 
        color : '#00AA13',
        // color : 'white'
    }, 
})