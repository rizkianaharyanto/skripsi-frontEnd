import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import SearchBar from '../../component/SearchBar';
import FilterBtn from '../../component/FilterBtn';
import Product from '../../component/Product';
import Menu from '../../component/Menu/index.js';
import Distributor from '../../component/Distributor';
import Axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({route, navigation}) => {
  const {text} = route.params;
  const [textSearch, setTextSearch] = useState(text);
  const [btnSearch, setBtnSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [gambar, setGambar] = useState('');

  React.useEffect(() => {
    setIsLoading(true);
    console.log(textSearch, text);
    submit();
    setIsLoading(false);
    // setTimeout(async () => {
    //   // setTextSearch(text);
    //   let token = await AsyncStorage.getItem('userToken');
    //   let toko = JSON.parse(await AsyncStorage.getItem('profile'));
    //   // console.warn(toko.id);
    //   setIsLoading(true);
    //   Axios.get(
    //     `https://secret-earth-93408.herokuapp.com/api/search/${textSearch}`,
    //     {
    //       params: {
    //         toko_id: toko.id,
    //       },
    //       headers: {
    //         Authorization: 'Bearer ' + token,
    //       },
    //     },
    //   )
    //     .then(function (response) {
    //       setDistributors(response.data.distributors);
    //       setProducts(response.data.products);
    //       setIsLoading(false);
    //     })
    //     .catch(function (error) {
    //       setIsLoading(false);
    //       console.log(error);
    //     });
    // }, 500);
  }, [btnSearch]);

  const submit = async () => {
    let token = await AsyncStorage.getItem('userToken');
    let toko = JSON.parse(await AsyncStorage.getItem('profile'));
    // console.warn(token);
    setIsLoading(true);
    setTextSearch(textSearch);
    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/search/${textSearch}`,
      {
        params: {
          toko_id: toko.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        setDistributors(response.data.distributors);
        setProducts(response.data.products);
        setIsLoading(false);
        // navigation.navigate('Search', {text: textSearch});
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}
      <ScrollView style={styles.body}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="green"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'visible',
            }}
          />
        ) : null}
        <View style={styles.topSection}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchTxt}
              value={textSearch}
              onChangeText={value => {
                setTextSearch(value);
              }}
            />
            <TouchableOpacity
              style={styles.searchImg}
              onPress={() => {
                submit();
                setBtnSearch(true);
              }}>
              <FontAwesome5 name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          {/* <FilterBtn /> */}
        </View>
        <Text style={[styles.title, {marginTop: 24, color: 'grey'}]}>
          Hasil pencarian dari {textSearch} :
        </Text>
        <Text style={[styles.title, {fontWeight: 'bold'}]}>Distributor</Text>
        <View style={styles.distributorSection}>
          {distributors.length == 0 ? (
            <Text
              style={[
                {
                  color: 'grey',
                  marginVertical: 80,
                  width: 200,
                  textAlign: 'center',
                },
              ]}>
              Hasil tidak ditemukan
            </Text>
          ) : null}
          {distributors?.map((distributor, index) => {
            // console.warn(index);
            return (
              <Distributor
                key={distributor.id}
                link={() => {
                  navigation.navigate('DistributorPage', {
                    distributor: distributor,
                  });
                }}
                nama={distributor.ds_nama}
                alamat={distributor.ds_alamat}
                gambar={distributor.ds_gambar}
                dis={distributor}
              />
            );
          })}
          {distributors.length % 2 != 0 ? (
            <View style={styles.distributor}></View>
          ) : null}
        </View>
        <Text style={[styles.title, {fontWeight: 'bold'}]}>Produk</Text>
        <View style={styles.productSection}>
          {products.length == 0 ? (
            <Text
              style={[
                {
                  color: 'grey',
                  marginVertical: 80,
                  width: 200,
                  textAlign: 'center',
                },
              ]}>
              Hasil tidak ditemukan
            </Text>
          ) : null}
          {products?.map((product, index) => {
            // console.warn(index);
            return (
              <Product
                key={product.id}
                link={() => {
                  navigation.navigate('ProductPage', {
                    product: product,
                    distributor: JSON.stringify(product.distributor),
                    modal: false,
                    qty_temp: product.satuans[0].pivot.hg_qty
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
          {products.length % 2 != 0 ? (
            <View style={styles.product}></View>
          ) : null}
        </View>
      </ScrollView>
      {/* <Menu /> */}
    </View>
  );
};

export default Search;

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
  title: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 12,
    marginTop: 12,
  },
  distributorSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    marginBottom: 24,
  },
  product: {
    width: 160,
    height: 264,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
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
});
