import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'


const Splash = () => {
    return (
        <View style={styles.page}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    page : { 
        flex :1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: "green"
    }
})
 
 
 
 