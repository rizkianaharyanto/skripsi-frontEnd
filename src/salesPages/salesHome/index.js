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
  ActivityIndicator,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import SearchBar from '../../component/SearchBar';
import FilterBtn from '../../component/FilterBtn';
import SalesProduct from '../../component/salesProduct';
import Menu from '../../component/Menu/index.js';
import Toko from '../../component/Toko';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salesHome = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [distributor, setDistributor] = useState([]);
  const [products, setProducts] = useState([]);
  const [tokos, setTokos] = useState([]);
  const [mitra, setMitra] = useState(false);

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
    let token = await AsyncStorage.getItem('userToken');
    let sales = JSON.parse(await AsyncStorage.getItem('profile'));
    // console.log(token, sales);

    setIsLoading(true);
    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/distributor/homeSales/${sales.id}`,
      {
        params: {
          sales_id: sales.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        // console.log(response.data.distributors);
        setDistributor(response.data.distributor);
        setProducts(null);
        setTokos(null);
        setProducts(response.data.products);
        setTokos(response.data.mitras);
        setIsLoading(false);
        setRefresh(false);
      })
      .catch(function (error) {
        setRefresh(false);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        <View style={styles.topSection}>
          <View style={styles.bodyDistributor}>
            <View style={styles.imgBox}>
              <Image
                style={styles.imgDistributor}
                source={{
                  uri: `https://secret-earth-93408.herokuapp.com/images/${distributor.ds_gambar}`,
                }}
              />
            </View>
            <View style={styles.distributorTxtSection}>
              <Text
                style={[
                  styles.distributorTxt,
                  {fontWeight: 'bold', marginBottom: 4},
                ]}>
                {distributor.ds_nama}
              </Text>
              <Text style={[styles.distributorTxt, {fontSize: 12}]}>
                {distributor.ds_alamat}
              </Text>
            </View>
          </View>
          <Text style={[styles.title, {fontWeight: 'bold'}]}>Deskripsi</Text>
          <Text style={{fontSize: 12, marginBottom: 16}}>
            {distributor.ds_deskripsi}
          </Text>
        </View>

        {mitra == true ? (
          <View>
            <View style={styles.tab}>
              <TouchableOpacity
                style={styles.tabBtnNon}
                onPress={() => {
                  setMitra(false);
                  getData();
                }}>
                <Text style={styles.tabTxtNon}>Produk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabBtnActive}
                onPress={() => {
                  setMitra(true);
                  getData();
                }}>
                <Text style={styles.tabTxtActive}>Mitra</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.distributorSection}>
              {tokos?.length == 0 ? (
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
                  Anda tidak memiliki mitra distributor
                </Text>
              ) : null}
              {tokos?.map(toko => {
                return (
                  <Toko
                    key={toko.id}
                    link={() => {
                      navigation.navigate('salesTokoPage', {
                        toko: toko,
                      });
                    }}
                    nama={toko.tk_nama}
                    alamat={toko.tk_alamat}
                    telp={toko.tk_telp}
                    gambar={toko.tk_gambar}
                  />
                );
              })}
              {tokos?.length % 2 != 0 ? (
                <View style={styles.distributor}></View>
              ) : null}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.tab}>
              <TouchableOpacity
                style={styles.tabBtnActive}
                onPress={() => {
                  setMitra(false);
                  getData();
                }}>
                <Text style={styles.tabTxtActive}>Produk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabBtnNon}
                onPress={() => {
                  setMitra(true);
                  getData();
                }}>
                <Text style={styles.tabTxtNon}>Mitra</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productSection}>
              {products?.map(product => {
                return (
                  <SalesProduct
                    key={product.id}
                    link={() => {
                      navigation.navigate('salesProductPage', {
                        product: product,
                        distributor: product.distributor.id,
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
                  Produk Kosong
                </Text>
              ) : (
                [
                  products.length % 2 != 0 ? (
                    <View style={styles.product}></View>
                  ) : null,
                ]
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default salesHome;

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
    width: 269,
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

  topSection: {
    width: 336,
    padding: 4,
    flexDirection: 'column',
  },
  bodyDistributor: {
    marginTop: 4,
    flex: 1.7,
    flexDirection: 'row',
  },
  imgBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
    marginRight: 16,
    marginTop: 3,
    justifyContent: 'center',
  },
  imgDistributor: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  distributorTxtSection: {
    alignSelf: 'center',
    flex: 1,
  },
  distributorTxt: {
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
    marginTop: 12,
  },
  distributorBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    width: 330,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  distributorBtnTxt: {
    color: 'white',
    alignSelf: 'center',
  },
  distributorBtn2: {
    backgroundColor: 'lightgrey',
    marginVertical: 4,
    borderRadius: 8,
    width: 330,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  distributorBtnTxt2: {
    color: 'white',
    alignSelf: 'center',
  },
  distributorBtn1: {
    borderColor: '#00AA13',
    borderWidth: 1,
    marginVertical: 4,
    borderRadius: 8,
    width: 330,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  distributorBtnTxt1: {
    color: '#00AA13',
    alignSelf: 'center',
  },
  distributorBtnTolak: {
    // borderColor: '#00AA13',
    // borderWidth: 1,
    marginVertical: 4,
    borderRadius: 8,
    width: 330,
    // height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  distributorBtnTxtTolak: {
    color: 'red',
    // alignSelf: 'center',
    fontSize: 12,
    // fontWeight: 'bold',
    // borderBottomWidth : 0.5,
    // borderBottomColor : 'red'
  },
  tab: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    // marginHorizontal : 48
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  tabBtnActive: {
    padding: 12,
    flex: 1,
    marginBottom: 16,
  },
  tabTxtActive: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00AA13',
  },
  tabBtnNon: {
    padding: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    flex: 1,
    marginBottom: 16,
  },
  tabTxtNon: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'lightgrey',
  },
});
