import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Satuan from './satuan';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const SalesKeranjang = props => {
  const navigation = useNavigation();
  const [toko, setToko] = useState(props.toko);
  const [distributor, setdistributor] = useState(props.distributor);
  const [products, setProducts] = useState(props.products);
  const [hargaTotal, setHargaTotal] = useState(props.hargaTotal);
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      sales_id: sales.id,
      toko_id: toko,
      distributor_id: distributor.id,
      products: products,
      ps_total_jenis_barang: products.length,
      ps_total_harga: hargaTotal,
    };
    setIsLoading(true);
    Axios.post(
      `https://secret-earth-93408.herokuapp.com/api/checkoutSales`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        console.log(response.data.message);
        Alert.alert(response.data.message, 'Pesanan berhasil dibuat', [
          {text: 'OK'},
        ]);
        navigation.navigate('salesHome');
        navigation.navigate('salesPesanPage');
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.keranjang}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => checkout()}>
          <Text style={styles.checkoutBtnTxt}>
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
              'Checkout'
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productSection}>
        {products?.map(product => {
          return (
            <Satuan
              key={product.id}
              distributor={props.distributor}
              product={product}
              gambar={JSON.parse(product.pd_gambar)}
            />
          );
        })}
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.bottomTxt}>Total : Rp {hargaTotal}</Text>
      </View>
    </View>
  );
};

export default SalesKeranjang;

const styles = StyleSheet.create({
  keranjang: {
    backgroundColor: 'white',
    marginVertical: 8,
  },
  topSection: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  topTxt: {
    fontWeight: 'bold',
    flex: 2,
  },
  checkoutBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    width: 80,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  checkoutBtnTxt: {
    color: 'white',
    alignSelf: 'center',
  },
  productSection: {
    padding: 8,
    marginHorizontal: 8,
  },
  bottomSection: {
    padding: 16,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEEE',
  },
  bottomTxt: {
    fontWeight: 'bold',
  },
  satuan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  iconHapus: {
    marginRight: 8,
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
