import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const FilterBtn = () => {
    return (
        <TouchableOpacity style={styles.filterImg}>
            {/* <Image source={require('../../assets/icon/magnifying-glass.png')} /> */}
            <FontAwesome5 name='filter' size={24} style={styles.filterIcon}/>
        </TouchableOpacity>
    )
}

export default FilterBtn;

const styles = StyleSheet.create({
    filterImg : {
        width : 40, 
        height : 40, 
        borderWidth : 1, 
        padding :5, 
        borderColor : 'lightgrey', 
        borderRadius : 8
    },
    filterIcon : {
        alignSelf: 'center'
    },
})
