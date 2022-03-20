import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import Product from '../../component/Product';
import Menu from '../../component/Menu/index.js';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DistributorPage = ({route, navigation}) => {
  const dis = route.params;
  const [products, setProducts] = useState([]);
  const [mitra, setMitra] = useState('');
  const [pengajuan, setPengajuan] = useState('');
  const [alasan, setAlasan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem('userToken');
    let toko = JSON.parse(await AsyncStorage.getItem('profile'));
    // console.warn(toko.id);
    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/distributor/${dis.distributor.id}`,
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
        if (response.data.mitra) {
          setMitra('1');
        } else if (response.data.pengajuan) {
          if (response.data.pengajuan.pivot.alasan_tolak == null) {
            setPengajuan('2');
          } else {
            setPengajuan('3');
            setAlasan(response.data.pengajuan.pivot.alasan_tolak);
          }
        } else {
          setPengajuan('0');
        }
        // console.log(response.data.distributor.id);
        setProducts(response.data.products);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const ajukanMitra = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const toko = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      distributor_id: dis.distributor.id,
      toko_id: toko.id,
    };
    setIsLoading(true);
    Axios.post(`https://secret-earth-93408.herokuapp.com/api/pengajuan`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        console.log(response.data.message);
        setPengajuan('2');
        setIsLoading(false);
        // Alert.alert('Berhasil', 'Pengajuan mitra terkirim', [{text: 'OK'}]);
      })
      .catch(function (error) {
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
          <View style={styles.bodyDistributor}>
            <View style={styles.imgBox}>
              <Image
                style={styles.imgDistributor}
                source={{
                  uri: `https://secret-earth-93408.herokuapp.com/images/${dis.distributor.ds_gambar}`,
                }}
              />
            </View>
            <View style={styles.distributorTxtSection}>
              <Text
                style={[
                  styles.distributorTxt,
                  {fontWeight: 'bold', marginBottom: 4},
                ]}>
                {dis.distributor.ds_nama}
              </Text>
              <Text style={[styles.distributorTxt, {fontSize: 12}]}>
                {dis.distributor.ds_alamat}
              </Text>
            </View>
          </View>
          <Text style={[styles.title, {fontWeight: 'bold'}]}>Deskripsi</Text>
          <Text style={{fontSize: 12, marginBottom: 16}}>
            {dis.distributor.ds_deskripsi}
          </Text>
          {mitra == '1' ? (
            <View style={styles.distributorBtn1}>
              <Text style={styles.distributorBtnTxt1}>Bermitra</Text>
            </View>
          ) : null}
          {pengajuan == '2' ? (
            <View style={styles.distributorBtn2}>
              <Text style={styles.distributorBtnTxt2}>Menunggu Konfirmasi</Text>
            </View>
          ) : null}
          {pengajuan == '3' ? (
            <TouchableOpacity
              style={styles.distributorBtn}
              onPress={() => ajukanMitra()}>
              <Text style={styles.distributorBtnTxt}>Ajukan Mitra</Text>
            </TouchableOpacity>
          ) : null}
          {pengajuan == '0' ? (
            <TouchableOpacity
              style={styles.distributorBtn}
              onPress={() => ajukanMitra()}>
              <Text style={styles.distributorBtnTxt}>Ajukan Mitra</Text>
            </TouchableOpacity>
          ) : null}
          {pengajuan == '3' ? (
            <TouchableOpacity style={styles.distributorBtnTolak}>
              <Text style={styles.distributorBtnTxtTolak}>
                Pengajuan mitra ditolak karena :
              </Text>
              <Text style={styles.distributorBtnTxtTolak}>{alasan}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
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

export default DistributorPage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  body: {
    padding: 12,
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
  productSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  product: {
    width: 160,
    height: 264,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
});
