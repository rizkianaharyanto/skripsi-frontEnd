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
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const salesInvoicePage = ({route, navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const [pesanan, setPesanan] = useState([]);
  const [produks, setProduks] = useState([]);
  const [distributor, setDistributor] = useState([]);
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [alasan, setAlasan] = useState('Stok Habis');
  const [lainnya, setLainnya] = useState(false);

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
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

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
        // console.log(response.data);
        // setPesanan(null);
        setPesanan(response.data.pesanan);
        // setDistributor(null);
        setDistributor(response.data.pesanan.distributor);
        // setSales(null);
        setToko(response.data.pesanan.toko);
        // setProduks(null);
        setProduks(response.data.pesanan.produks);
        setRefresh(false);
      })
      .catch(function (error) {
        console.log(error);
        setRefresh(false);
      });
  };

  const update = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      id: pesanan.id,
      isTolak: null,
      ps_status: pesanan.ps_status,
      alasan_tolak: alasan,
    };
    setIsLoading(true);
    Axios.post(
      `https://secret-earth-93408.herokuapp.com/api/updateStatusPesanan`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        console.log(response.data.message);
        Alert.alert(response.data.message, 'Pesanan berhasil diubah', [
          {text: 'OK'},
        ]);
        navigation.navigate('salesHome');
        navigation.navigate('salesInvoicePage', {
          id: pesanan.id,
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const tolak = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      id: pesanan.id,
      isTolak: 'yes',
      ps_status: pesanan.ps_status,
      alasan_tolak: alasan,
    };
    setIsLoading(true);
    Axios.post(
      `https://secret-earth-93408.herokuapp.com/api/updateStatusPesanan`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        console.log(response.data.message);
        Alert.alert(response.data.message, 'Pesanan berhasil ditolak', [
          {text: 'OK'},
        ]);
        navigation.navigate('salesHome');
        navigation.navigate('salesInvoicePage', {
          id: pesanan.id,
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.page}>
      <Modal
        visible={modal}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(52, 52, 2, 0.8)',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              // margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={[styles.topSection, {width: 336}]}>
              <Text style={{flex: 0.5, fontSize: 12}}>Alasan Tolak :</Text>
              {lainnya == false ? (
                <View style={{flex: 2}}>
                  <TouchableOpacity
                    style={styles.alasanSelected}
                    disabled={true}>
                    <Text style={styles.alasanSelectedTxt}>Stok Habis</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.alasanNonSelected}
                    onPress={() => {
                      setLainnya(true);
                      setAlasan(null);
                      console.log(lainnya, alasan);
                    }}>
                    <Text style={styles.alasanNonSelectedTxt}>Lainnya</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flex: 2}}>
                  <TouchableOpacity
                    style={styles.alasanNonSelected}
                    onPress={() => {
                      setLainnya(null);
                      setLainnya(false);
                      setAlasan('Stok Habis');
                      console.log(lainnya, alasan);
                    }}>
                    <Text style={styles.alasanNonSelectedTxt}>Stok Habis</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.alasanSelected}
                    disabled={true}>
                    <Text style={styles.alasanSelectedTxt}>Lainnya</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 100,
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      borderRadius: 4,
                    }}>
                    <TextInput
                      style={{fontSize: 12, color: 'black'}}
                      placeholderTextColor="lightgrey"
                      multiline={true}
                      value={alasan}
                      onChangeText={value => setAlasan(value)}
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={[styles.topSection, {marginTop: 16}]}>
              <TouchableOpacity
                style={[
                  styles.checkoutBtn,
                  {width: 300, backgroundColor: 'grey', marginRight: 16},
                ]}
                onPress={() => setModal(false)}>
                <Text style={styles.checkoutBtnTxt}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkoutBtn,
                  {width: 300, backgroundColor: 'red'},
                ]}
                onPress={() => tolak()}>
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
                    'Tolak'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            <Text
              style={[styles.headerTxt, {textAlign: 'right', color: 'red'}]}>
              {pesanan.ps_status}
            </Text>
          ) : (
            <Text
              style={[
                styles.headerTxt,
                {textAlign: 'right', color: '#00AA13'},
              ]}>
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
            Toko
          </Text>
          {toko ? (
            <View style={styles.bodyUser}>
              <View style={styles.imgBox}>
                <Image
                  style={styles.imgUser}
                  source={{
                    uri: `https://secret-earth-93408.herokuapp.com/images/${toko.tk_gambar}`,
                  }}
                />
              </View>
              <View style={styles.UserTxtSection}>
                <Text
                  style={[
                    styles.UserTxt,
                    {fontWeight: 'bold', marginBottom: 4},
                  ]}>
                  {toko.tk_nama}
                </Text>
                <Text style={[styles.UserTxt, {fontSize: 12}]}>
                  {toko.tk_alamat}
                </Text>
                <Text style={[styles.UserTxt, {fontSize: 12}]}>
                  {toko.tk_telp}
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

        <View style={styles.topSection}>
          {pesanan?.ps_status == 'baru' ? (
            <TouchableOpacity
              style={[styles.checkoutBtn, {backgroundColor: 'red'}]}
              onPress={() => setModal(true)}>
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
                  'Tolak'
                )}
              </Text>
            </TouchableOpacity>
          ) : null}
          {pesanan?.ps_status != 'ditolak'
            ? [
                pesanan?.ps_status != 'selesai' ? (
                  <TouchableOpacity
                    style={styles.checkoutBtn}
                    onPress={() => update()}>
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
                        [
                          pesanan?.ps_status == 'baru'
                            ? 'Terima'
                            : [
                                pesanan?.ps_status == 'diterima sales'
                                  ? 'Kirim'
                                  : [
                                      pesanan?.ps_status == 'dalam pengiriman'
                                        ? 'Sampai'
                                        : 'Selesai',
                                    ],
                              ],
                        ]
                      )}
                    </Text>
                  </TouchableOpacity>
                ) : null,
              ]
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default salesInvoicePage;

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
    marginHorizontal: 2,
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
  alasanSelected: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#00AA13',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#00AA13',
  },
  alasanSelectedTxt: {
    color: 'white',
  },
  alasanNonSelected: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
    padding: 4,
  },
  alasanNonSelectedTxt: {
    color: 'lightgrey',
  },
});
