import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/core';

const Satuan = props => {
  const [product, setProduct] = useState(props.product);
  const navigation = useNavigation();

  const ubah = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/product/${product.id}`,
      {
        params: {
          id: product.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        console.log(response.data.product);
        navigation.navigate('salesProductPage', {
          product: response.data.product,
          qty_temp: product.pivot.kdt_qty,
          distributor: props.distributor.id,
          modal: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const hapus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      sales_id: sales.id,
      distributor_id: props.distributor.id,
      product_id: product.id,
    };
    Axios.post(`https://secret-earth-93408.herokuapp.com/api/hapusSales`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        console.log(response.data.message);
        navigation.navigate('salesHome');
        navigation.navigate('Pesan');
        Alert.alert(
          response.data.message,
          'Produk berhasil dihapus. Silahkan refresh keranjang',
          [{text: 'Tutup'}],
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.satuan}>
      <TouchableOpacity onPress={() => hapus()}>
        {/* <Image source={require('../../assets/icon/delete.png')} /> */}
        <FontAwesome5
          name="minus-circle"
          color={'tomato'}
          style={styles.iconHapus}
        />
      </TouchableOpacity>
      <View style={styles.imgBox}>
        <Image
          style={styles.productImg}
          source={{
            uri: `https://secret-earth-93408.herokuapp.com/images/${props.gambar[0]}`,
          }}
        />
      </View>
      <View style={styles.productTxtSection}>
        <Text style={[styles.productTxt, {marginBottom: 8}]}>
          {product.pd_nama} ({product.pivot.kdt_satuan})
        </Text>
        <Text style={[styles.productTxt]}>Total : </Text>
        <Text style={[styles.productTxt]}>Rp {product.pivot.kdt_harga}</Text>
      </View>
      <View style={styles.qtyBox}>
        <Text>{product.pivot.kdt_qty}</Text>
        <TouchableOpacity onPress={() => ubah()}>
          {/* <Image source={require('../../assets/icon/delete.png')} /> */}
          <FontAwesome5
            name="pencil"
            color={'#00AA13'}
            style={styles.iconHapus}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.qtyBtn} onPress={() => minus()}>
          <FontAwesome5 name="minus" size={8} color={'#00AA13'} />
        </TouchableOpacity>
        <TextInput
          style={styles.qty}
          keyboardType="numeric"
          value={JSON.stringify(qty)}
          onChangeText={value => hitung(value)}
        />
        <TouchableOpacity style={styles.qtyBtn} onPress={() => plus()}>
          <FontAwesome5 name="plus" size={8} color={'#00AA13'} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Satuan;

const styles = StyleSheet.create({
  satuan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  iconHapus: {
    marginHorizontal: 8,
  },
  imgBox: {
    width: 48,
    height: 64,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: 'center',
  },
  productImg: {
    width: 48,
    height: 56,
    resizeMode: 'contain',
  },
  productTxtSection: {
    flex: 3,
    marginHorizontal: 4,
  },
  productTxt: {
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 12,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
    marginLeft: 0,
  },
  qtyBtn: {
    borderWidth: 1,
    padding: 4,
    borderColor: 'lightgrey',
    borderRadius: 4,
  },
  qty: {
    borderBottomWidth: 1,
    padding: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderColor: 'lightgrey',
    borderRadius: 4,
    color: 'black',
    maxWidth: 36,
  },
});
