import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import FormInput from '../../component/FormInput'

const FormRegis1 = () => {
    return (
        <View style={styles.formSection}>
            <Text style={styles.titleSection}>Data Akun</Text>
            <FormInput text='Username' />
            <FormInput text='Password' />
            <FormInput text='Konfirmasi Password' />
        </View>
    )
}

export default FormRegis1;

const styles = StyleSheet.create({
    formSection :{
        marginTop : 24
    },
    titleSection:{
        fontSize : 14, 
        fontWeight : 'bold', 
    }
})
