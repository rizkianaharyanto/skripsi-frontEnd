import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import ModalPesan from '../ModalPesan';

const Product = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [mitra, setMitra] = useState(false);
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);

  const pesan = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const toko = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      id: props.product.id,
      toko_id: toko.id,
    };
    setIsLoading(true);
    Axios.post(`https://secret-earth-93408.herokuapp.com/api/pesanan`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        // console.warn(response.data.product);
        if (response.data.mitra == undefined) {
          setMitra(false);
          setIsLoading(false);
          Alert.alert(
            'Gagal',
            'Anda harus bermitra dengan distributor sebelum memesan',
            [{text: 'OK'}],
          );
          navigation.navigate('DistributorPage', {
            distributor: response.data.distributor,
          });
        } else {
          setMitra(true);
          navigation.navigate('ProductPage', {
            product: response.data.product,
            distributor: JSON.stringify(response.data.distributor),
            modal: true,
            qty_temp: props.qty_temp
          });
          setModalOpen(true);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <TouchableOpacity style={styles.product} onPress={props.link}>
      <View style={styles.imgBox}>
        {props.gambar ? (
          <Image
            style={styles.imgProduct}
            source={{
              uri: `https://secret-earth-93408.herokuapp.com/images/${props.gambar[0]}`,
            }}
          />
        ) : null}
      </View>
      <View style={styles.productTxtSection}>
        <Text style={[styles.productTxt, {fontSize: 12}]}>{props.nama}</Text>
        <Text
          style={[
            styles.productTxt,
            {fontSize: 16, fontWeight: 'bold', marginTop: 4, marginBottom: 8},
          ]}>
          {props.harga}
        </Text>
        <Text style={[styles.productTxt, {fontSize: 12, color: 'grey'}]}>
          {props.distributor}
        </Text>
        <Text style={[styles.productTxt, {fontSize: 12, color: 'grey'}]}>
          {props.alamat}
        </Text>
      </View>
      <TouchableOpacity style={styles.productBtn} onPress={() => pesan()}>
        <Text style={styles.productBtnTxt}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color="white"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backfaceVisibility: 'visible',
              }}
            />
          ) : (
            'PESAN'
          )}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    width: 160,
    height: 264,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  imgBox: {
    alignSelf: 'center',
    width: 152 - 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginVertical: 4,
    flex: 1.6,
  },
  imgProduct: {
    alignSelf: 'center',
    width: 152 - 16,
    marginVertical: 4,
    flex: 1.6,
    resizeMode: 'contain',
  },
  productTxtSection: {
    marginVertical: 4,
    flex: 2.5,
    marginLeft: 4,
  },
  productTxt: {
    marginBottom: 4,
  },
  productBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    width: 80,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.9,
  },
  productBtnTxt: {
    color: 'white',
    alignSelf: 'center',
  },
});
