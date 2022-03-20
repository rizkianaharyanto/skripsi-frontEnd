import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import SearchBar from '../../component/SearchBar';
import FilterBtn from '../../component/FilterBtn';
import Product from '../../component/Product';
import Menu from '../../component/Menu/index.js';
import Distributor from '../../component/Distributor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [distributors, setDistributors] = useState([]);

  React.useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener('focus', () => {
      // setLoading(true);
      getData();
    });
    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, []);

  const getData = async () => {
    setIsLoading(true);
    setRefresh(true);
    let token = await AsyncStorage.getItem('userToken');
    let toko = JSON.parse(await AsyncStorage.getItem('profile'));
    // console.warn(toko.id);
    // setIsLoading(true);
    Axios.get(`https://secret-earth-93408.herokuapp.com/api/home`, {
      params: {
        toko_id: toko.id,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        // console.warn(response.data.distributors);
        setDistributors(null);
        setDistributors(response.data.distributors);
        const products_temp = [];
        response.data.products.map((item, index) => {
          item.map(inner => {
            products_temp.push(inner);
          });
        });
        // console.log(products_temp);
        setProducts(null);
        setProducts(products_temp);
        setIsLoading(false);
        setRefresh(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setRefresh(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        <View style={styles.topSection}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchTxt}
              value={text}
              onChangeText={value => {
                setText(value);
              }}
            />
            <TouchableOpacity
              style={styles.searchImg}
              onPress={() => {
                navigation.navigate('Search', {text: text});
              }}>
              <FontAwesome5 name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          {/* <FilterBtn /> */}
        </View>

        <Text style={[styles.title, {marginTop: 8, color: 'gray'}]}>
          Cari produk dan distributor yang Anda inginkan di sini
        </Text>
        <Text style={[styles.title, {marginTop: 24, fontWeight: 'bold'}]}>
          Katalog Distributor
        </Text>
        <View style={styles.distributorSection}>
          {distributors?.length == 0 ? (
            <View
              style={{
                color: 'grey',
                marginVertical: 80,
                width: 200,
                textAlign: 'center',
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: 'grey',
                    textAlign: 'center',
                  },
                ]}>
                Anda tidak memiliki mitra distributor
              </Text>
              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => {
                  navigation.navigate('Search', {text: 'semua'});
                }}>
                <Text style={styles.checkoutBtnTxt}>
                  Lihat Seluruh Distributor
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {distributors?.map(distributor => {
            return (
              <Distributor
                key={distributor[0].id}
                link={() => {
                  navigation.navigate('DistributorPage', {
                    distributor: distributor[0],
                  });
                }}
                nama={distributor[0].ds_nama}
                alamat={distributor[0].ds_alamat}
                gambar={distributor[0].ds_gambar}
                dis={distributor[0]}
              />
              // null
            );
          })}
          {distributors?.length % 2 != 0 ? (
            <View style={styles.distributor}></View>
          ) : null}
        </View>
        <Text style={[styles.title, {marginTop: 24, fontWeight: 'bold'}]}>
          Katalog Product
        </Text>
        <View style={styles.productSection}>
          {products?.map(product => {
            return (
              <Product
                key={product.id}
                link={() => {
                  navigation.navigate('ProductPage', {
                    product: product,
                    distributor: JSON.stringify(product.distributor),
                    modal: false,
                    qty_temp: product.satuans[0].pivot.hg_qty,
                  });
                }}
                nama={product.pd_nama}
                harga={`Rp ${product.satuans[0].pivot.hg_nominal}/${product.satuans[0].st_nama}`}
                distributor={product.distributor.ds_nama}
                alamat={product.distributor.ds_alamat}
                gambar={JSON.parse(product.pd_gambar)}
                product={product}
                qty_temp={product.satuans[0].pivot.hg_qty}
              />
            );
          })}
          {products == undefined || products.length == 0 ? (
            <Text
              style={[
                styles.title,
                {
                  color: 'grey',
                  marginVertical: 80,
                  width: 200,
                  textAlign: 'center',
                },
              ]}>
              Anda tidak memiliki produk dari mitra distributor
            </Text>
          ) : (
            [
              products.length % 2 != 0 ? (
                <View style={styles.product}></View>
              ) : null,
            ]
          )}
        </View>
      </ScrollView>
      {/* <Menu /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  body: {
    padding: 12,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distributorSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  distributor: {
    width: 160,
    height: 136,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  productSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  product: {
    width: 160,
    height: 264,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  title: {
    fontSize: 14,
    marginLeft: 8,
    // marginBottom : 12,
    // marginTop : 12
  },
  search: {
    flexDirection: 'row',
    width: 320,
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    paddingLeft: 5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  searchTxt: {
    color: 'black',
    fontSize: 14,
    flex: 5,
  },
  searchImg: {
    paddingVertical: 5,
    backgroundColor: '#00AA13',
    right: 0,
    flex: 1,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  searchIcon: {
    color: 'white',
    alignSelf: 'center',
  },
  checkoutBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    // width: 80,
    // height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 8,
  },
  checkoutBtnTxt: {
    color: 'white',
    alignSelf: 'center',
  },
});
