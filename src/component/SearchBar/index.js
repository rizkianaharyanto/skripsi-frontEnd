import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const SearchBar = (props) => {
    const [text, setText] = useState('')

    return (
        <View style={styles.search}>
            <TextInput style={styles.searchTxt} />
            <TouchableOpacity style={styles.searchImg} onPress={() => {navigation.navigate('Search'), {text}}}>
                    <FontAwesome5 name='search' size={24} style={styles.searchIcon}/>
            </TouchableOpacity>
        </View>
                    
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    search : {
        flexDirection: 'row', 
        width : 269, 
        height : 40, 
        borderWidth : 1, 
        borderColor : 'lightgrey', 
        borderRadius : 8, 
        paddingLeft : 5,
        borderTopEndRadius : 10, 
        borderBottomEndRadius : 10 
    },
    searchTxt : {
        color : 'black', 
        fontSize : 14, 
        flex: 5
    },
    searchImg : {
        paddingVertical : 5, 
        backgroundColor :'#00AA13', 
        right : 0, 
        flex : 1, 
        borderTopEndRadius : 8, 
        borderBottomEndRadius : 8 
    },
    searchIcon : {
        color : 'white', 
        alignSelf: 'center'
    },
})
