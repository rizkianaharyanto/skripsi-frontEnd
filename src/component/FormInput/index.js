import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { black } from 'colorette'


const FormInput = (props) => {
    return (
        <View style={styles.form}>
            <Text style={styles.formTxt}>{props.text}</Text>
            <Text style={styles.middle}>:</Text>
            <TextInput style={styles.formInput} />
        </View>
    )
}

export default FormInput;

const styles = StyleSheet.create({
    form:{
        flexDirection : 'row',
        alignItems : 'center',
        width : 288,
        height : 36,
        marginVertical : 4
    },
    formTxt : {
        fontSize : 14, 
        flex : 2,
    }, 
    middle : {
        fontSize : 14, 
        flex : 1,
        textAlign : 'center'
    }, 
    formInput :{
        borderBottomColor : 'lightgrey',
        borderBottomWidth : 1,
        flex : 5,
        color : 'black',
        fontSize : 14
    }
    
})
