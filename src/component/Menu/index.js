import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import MenuBtn from './menuBtn'


const Menu = () => {
    return (
        <View style={styles.menu}>
            <MenuBtn nama='Home' gambar={require('../../assets/icon/home.png')}/>
            <MenuBtn nama='Aktivitas' gambar={require('../../assets/icon/medical-notes-symbol-of-a-list-paper-on-a-clipboard.png')}/>
            <MenuBtn nama='Pesan' gambar={require('../../assets/icon/shopping-cart.png')}/>
            <MenuBtn nama='Akun' gambar={require('../../assets/icon/profil.png')}/>
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    menu : {
        borderTopWidth: 1, 
        borderTopColor : 'whitesmoke', 
        padding : 12, 
        flexDirection: 'row',
        backgroundColor : 'white'
    },
})
