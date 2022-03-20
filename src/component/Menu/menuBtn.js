import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'

const MenuBtn = (props) => {
    return (
        <View style={styles.menuBtn}>
            <View>
                <TouchableOpacity style={styles.menuImg}>
                    <Image source={props.gambar} style={styles.menuIcon} />
                </TouchableOpacity>
                <Text style={styles.menuTxt}>{props.nama}</Text>
            </View>
        </View> 
    )
}

export default MenuBtn;

const styles = StyleSheet.create({
    menuBtn : {
        flex : 1,
        alignItems : 'center'
    },
    menuImg : {
        width : 40, 
        height : 40, 
        borderWidth : 1, 
        padding :5, 
        borderColor : 'lightgrey', 
        borderRadius : 8,
        alignSelf: 'center',
    },
    menuIcon : {
        width : 24, 
        height : 24, 
        alignSelf: 'center',
        resizeMode : 'contain'
    },
    menuTxt : {
        color: 'grey',
        alignSelf : 'center'
    },
})
