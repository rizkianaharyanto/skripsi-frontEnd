import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

const InvoicePage = ({route, navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const [pesanan, setPesanan] = useState([]);
  const [produks, setProduks] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [sales, setSales] = useState([]);

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
    setRefresh(true);
    const token = await AsyncStorage.getItem('userToken');
    const toko = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/pesanan/${route.params.id}`,
      {
        params: {
          id: route.params.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        // setPesanan(null);
        setPesanan(response.data.pesanan);
        // setDistributor(null);
        setDistributor(response.data.pesanan.distributor);
        // setSales(null);
        setSales(response.data.pesanan.sales);
        // setProduks(null);
        setProduks(response.data.pesanan.produks);
        setRefresh(false);
      })
      .catch(function (error) {
        console.log(error);
        setRefresh(false);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        <View style={styles.header}>
          <Text style={[styles.headerTxt, {textAlign: 'left'}]}>
            {pesanan.ps_kode}
          </Text>
          {pesanan.ps_status == 'ditolak' ? (
            <Text style={[styles.headerTxt, {textAlign: 'right', color: 'red'}]}>
              {pesanan.ps_status}
            </Text>
          ) : (
            <Text style={[styles.headerTxt, {textAlign: 'right', color: '#00AA13'}]}>
              {pesanan.ps_status}
            </Text>
          )}
        </View>
        <View style={styles.bodySection}>
          <Text style={[styles.title, {fontWeight: 'bold'}]}>Distributor</Text>
          <View style={styles.bodyUser}>
            <View style={styles.imgBox}>
              <Image
                style={styles.imgUser}
                source={{
                  uri: `https://secret-earth-93408.herokuapp.com/images/${distributor.ds_gambar}`,
                }}
              />
            </View>
            <View style={styles.UserTxtSection}>
              <Text
                style={[styles.UserTxt, {fontWeight: 'bold', marginBottom: 4}]}>
                {distributor.ds_nama}
              </Text>
              <Text style={[styles.UserTxt, {fontSize: 12}]}>
                {distributor.ds_alamat}
              </Text>
              <Text style={[styles.UserTxt, {fontSize: 12}]}>
                {distributor.ds_telp}
              </Text>
            </View>
          </View>
          <Text style={[styles.title, {fontWeight: 'bold', marginTop: 16}]}>
            Salesman
          </Text>
          {sales ? (
            <View style={styles.bodyUser}>
              <View style={styles.imgBox}>
                <Image
                  style={styles.imgUser}
                  source={{
                    uri: `https://secret-earth-93408.herokuapp.com/images/${sales.sl_gambar}`,
                  }}
                />
              </View>
              <View style={styles.UserTxtSection}>
                <Text
                  style={[
                    styles.UserTxt,
                    {fontWeight: 'bold', marginBottom: 4},
                  ]}>
                  {sales.sl_nama}
                </Text>
                <Text style={[styles.UserTxt, {fontSize: 12}]}>
                  {sales.sl_alamat}
                </Text>
                <Text style={[styles.UserTxt, {fontSize: 12}]}>
                  {sales.sl_telp}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={[styles.UserTxt, {fontSize: 12, color: 'lightgrey'}]}>
              -Menunggu Konfirmasi-
            </Text>
          )}

          <Text style={[styles.title, {fontWeight: 'bold', marginTop: 16}]}>
            Pesanan
          </Text>
          {produks?.map(produk => {
            return (
              <View key={produk.id}>
                <Text style={styles.pesananNama}>
                  {produk.pd_nama} ({produk.pivot.dt_satuan})
                </Text>
                <View style={styles.pesananSection}>
                  <Text style={styles.pesananTxt}>{produk.pivot.dt_qty}</Text>
                  <Text style={styles.pesananTxt}>x</Text>
                  <Text style={styles.pesananTxt}>
                    Rp {produk.pivot.dt_harga_used}
                  </Text>
                  <Text
                    style={[styles.pesananTxt, {flex: 2, textAlign: 'right'}]}>
                    Rp {produk.pivot.dt_harga}
                  </Text>
                </View>
              </View>
            );
          })}

          <View style={styles.totalSection}>
            <Text style={styles.totalTxt}>Total</Text>
            <Text style={styles.totalTxt}>Rp {pesanan.ps_total_harga}</Text>
          </View>
        </View>
        {pesanan?.ps_status == 'ditolak' ? (
          <View style={styles.tolakSection}>
            <FontAwesome5
              name="info-circle"
              color={'tomato'}
              size={14}
              style={styles.tolakTxt}
            />
            <Text style={styles.tolakIsiTxt}>
              Pesanan ditolak karena : {pesanan.alasan_tolak}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default InvoicePage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  //   body: {
  //     padding: 12,
  //   },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 12,
  },
  headerTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    flexWrap: 'wrap',
    flex: 1,
    // backgroundColor: 'lightblue',
  },
  bodySection: {
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bodyUser: {
    marginVertical: 8,
    flex: 1.7,
    flexDirection: 'row',
  },
  imgBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
    marginHorizontal: 16,
    marginTop: 3,
    justifyContent: 'center',
  },
  imgUser: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  UserTxtSection: {
    alignSelf: 'center',
    flex: 1,
  },
  UserTxt: {
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    marginVertical: 8,
  },
  pesananSection: {
    paddingBottom: 6,
    flexDirection: 'row',
    // alignSelf: 'flex-start',
    borderBottomColor: 'whitesmoke',
    borderBottomWidth: 1,
  },
  pesananNama: {
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 12,
    flex: 1,
    alignItems: 'center',
    paddingRight: 12,
    paddingVertical: 6,
  },
  pesananTxt: {
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 12,
    flex: 1,
    alignItems: 'center',
    paddingRight: 12,
    paddingVertical: 6,
    textAlign: 'center',
  },
  totalSection: {
    paddingVertical: 6,
    flexDirection: 'row',
    borderTopColor: 'whitesmoke',
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  totalTxt: {
    flexWrap: 'wrap',
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  tolakSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 16,
  },
  tolakTxt: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: 'red',
  },
  tolakIsiTxt: {
    fontSize: 12,
    paddingVertical: 12,
    flexWrap: 'wrap',
  },
});
