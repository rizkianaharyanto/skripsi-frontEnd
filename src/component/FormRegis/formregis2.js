import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import FormInput from '../../component/FormInput'

const FormRegis2 = () => {
    return (
        <View style={styles.formSection}>
            <Text style={styles.titleSection}>Data Toko</Text>
            <FormInput text='Nama Toko' />
            <FormInput text='Nama Pemilik' />
            <FormInput text='Alamat' />
            <FormInput text='Email' />
            <FormInput text='No. Telp' />
        </View>
    )
}

export default FormRegis2;

const styles = StyleSheet.create({
    formSection :{
        marginTop : 24
    },
    titleSection:{
        fontSize : 14, 
        fontWeight : 'bold', 
    }
})
