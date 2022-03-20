import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import Menu from '../../component/Menu/index.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import ModalPesan from '../../component/ModalPesan';
import Satuan from '../../component/Keranjang/satuan';

const salesProductPage = ({route, navigation}) => {
  const {product, distributor, modal, qty_temp} = route.params;
  const [dis, setDis] = useState(distributor);
  const [gambars, setGambars] = useState([]);
  const [hargas, setHargas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mitra, setMitra] = useState(false);
  const [modalOpen, setModalOpen] = useState(modal);
  const [qty, setQty] = useState(qty_temp);
  const [hargaAkhir, setHargaAkhir] = useState(0);
  const [hargaUsed, setHargaUsed] = useState(0);

  // const navigation = useNavigation();

  const pesan = async () => {
    setMitra(true);
    setModalOpen(true);
    setIsLoading(false);
  };

  const cart = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));
    // console.log(dis);

    const data = {
      sales_id: sales.id,
      distributor_id: dis,
      product_id: product.id,
      kdt_qty: qty,
      kdt_satuan: product.satuans[0].st_nama,
      kdt_harga_used: hargaUsed,
      kdt_harga: hargaAkhir,
    };
    setIsLoading(true);
    Axios.post(`https://secret-earth-93408.herokuapp.com/api/keranjangSales`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        console.log(response.data.message);
        Alert.alert(
          response.data.message,
          'Produk berhasil ditambahkan ke keranjang',
          [{text: 'OK'}],
        );
        navigation.navigate('salesHome');
        navigation.navigate('Pesan');
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const showGambar = gambar => {
    return (
      <View
        style={{
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderLeftColor: 'whitesmoke',
          borderRightColor: 'whitesmoke',
        }}>
        <Image
          style={styles.productImg}
          source={{
            uri: `https://secret-earth-93408.herokuapp.com/images/${gambar.item}`,
          }}
        />
      </View>
    );
  };

  const plus = () => {
    let temp = qty + 1;
    setQty(temp);
  };

  const minus = () => {
    if (qty <= 1) {
      console.log(qty);
    } else {
      let temp = qty - 1;
      setQty(temp);
    }
  };

  const hitung = value => {
    try {
      if (value) {
        let temp = JSON.parse(value);
        setQty(temp);
      } else {
        setQty(1);
      }
    } catch (error) {
      setQty(1);
    }
  };

  React.useEffect(() => {
    setTimeout(async () => {
      setGambars(JSON.parse(product.pd_gambar));

      const token = await AsyncStorage.getItem('userToken');
      const sales = JSON.parse(await AsyncStorage.getItem('profile'));

      console.log(token);

      const data = {
        id: product.id,
        sales_id: sales.id,
        qty: qty,
      };
      setIsLoading(true);
      Axios.post(`https://secret-earth-93408.herokuapp.com/api/hitung`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(function (response) {
          console.log(response.data.hargaAkhir);
          setHargas(response.data.hitung);
          setHargaUsed(response.data.hitung[0].nominal);
          setHargaAkhir(response.data.hargaAkhir);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }, 100);
  }, [qty]);

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}

      <Modal
        visible={modalOpen}
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
          {/* <FontAwesome5
            name="close"
            color={'tomato'}
            onPress={() => setModalOpen(false)}
            size={14}
          /> */}
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
            <View style={[styles.satuan, {paddingBottom: 20}]}>
              <View style={styles.imgBoxSatuan}>
                <Image
                  style={styles.productImgSatuan}
                  source={{
                    uri: `https://secret-earth-93408.herokuapp.com/images/${gambars[0]}`,
                  }}
                />
              </View>
              <View style={styles.productTxtSection}>
                <Text style={[styles.productTxt, {marginBottom: 8}]}>
                  {product.pd_nama}
                </Text>
                <Text style={[styles.productTxt]}>
                  {product.satuans[0].st_nama}
                </Text>
              </View>
              <View style={styles.qtyBox}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => minus()}>
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
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={[
                styles.productTxt,
                {alignSelf: 'flex-start', fontWeight: 'bold', marginBottom: 13},
              ]}>
              Detail Harga
            </Text>
            <View
              style={{
                paddingBottom: 6,
                flexDirection: 'row',
                // alignSelf: 'flex-start',
                borderBottomColor: 'whitesmoke',
                borderBottomWidth: 1,
              }}>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    paddingRight: 12,
                    textAlign: 'center',
                  },
                ]}>
                Harga
              </Text>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    paddingRight: 12,
                    textAlign: 'center',
                  },
                ]}>
                Qty
              </Text>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    paddingRight: 12,
                    textAlign: 'center',
                  },
                ]}>
                Total
              </Text>
            </View>
            {hargas?.map((harga, index) => {
              return (
                <View
                  key={index}
                  style={{flexDirection: 'row', paddingVertical: 6}}>
                  <Text
                    style={[
                      styles.productTxt,
                      {
                        flex: 1,
                        alignItems: 'center',
                        paddingRight: 12,
                        textAlign: 'center',
                      },
                    ]}>
                    {harga.nominal}
                  </Text>
                  <Text
                    style={[
                      styles.productTxt,
                      {
                        flex: 1,
                        alignItems: 'center',
                        paddingRight: 12,
                        textAlign: 'center',
                      },
                    ]}>
                    {harga.jml}
                  </Text>
                  <Text
                    style={[
                      styles.productTxt,
                      {
                        flex: 1,
                        alignItems: 'center',
                        paddingRight: 12,
                        textAlign: 'right',
                      },
                    ]}>
                    {harga.total}
                  </Text>
                </View>
              );
            })}
            <View
              style={{
                paddingVertical: 6,
                flexDirection: 'row',
                // alignSelf: 'flex-start',
                borderTopColor: 'whitesmoke',
                borderTopWidth: 1,
              }}>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    paddingRight: 12,
                    textAlign: 'center',
                  },
                ]}>
                {/* Total */}
              </Text>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    paddingRight: 12,
                    textAlign: 'center',
                  },
                ]}>
                {qty}
              </Text>
              <Text
                style={[
                  styles.productTxt,
                  {
                    flex: 1,
                    alignItems: 'center',
                    fontWeight: 'bold',
                    paddingRight: 12,
                    textAlign: 'right',
                  },
                ]}>
                {hargaAkhir}
              </Text>
            </View>

            <View style={{height: 64}}>
              <TouchableOpacity
                style={styles.productBtn}
                onPress={() => cart()}>
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
                    'Masukkan Keranjang'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'tomato',
                borderBottomWidth: 1,
                borderBottomColor: 'tomato',
                fontSize: 12,
              }}
              onPress={() => setModalOpen(false)}>
              Batal
            </Text>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.body}>
        <Text style={styles.title}>{product.pd_nama}</Text>
        <View style={styles.productImgSection}>
          <FontAwesome5 name="angle-double-left" color={'lightgrey'} />
          <View style={styles.imgBox}>
            <FlatList
              horizontal
              data={gambars}
              renderItem={showGambar}
              keyExtractor={index => index}
            />
          </View>
          <FontAwesome5 name="angle-double-right" color={'lightgrey'} />
        </View>
        <Text style={styles.title}>Harga</Text>
        {product.satuans?.map((harga, index) => {
          if (harga.pivot.hg_qty == 1) {
            return (
              <Text key={index} style={[styles.isi, {marginBottom: 8}]}>
                {`Rp ${harga.pivot.hg_nominal}/${harga.st_nama}`}
              </Text>
            );
          } else {
            return (
              <Text key={index} style={[styles.isi, {marginBottom: 8}]}>
                {`Rp ${harga.pivot.hg_nominal}/${harga.st_nama} (pembelian >${harga.pivot.hg_qty})`}
              </Text>
            );
          }
        })}
        <Text style={styles.title}>Stok</Text>
        <Text style={styles.isi}>{product.pd_stok}</Text>
        <Text style={styles.title}>Deskripsi</Text>
        <Text style={styles.isi}>{product.pd_deskripsi}</Text>
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
      </ScrollView>
      {/* <Menu /> */}
    </View>
  );
};

export default salesProductPage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  productImgSection: {
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgBox: {
    // borderRightWidth: 5,
    // borderRightColor: 'whitesmoke',
    borderRadius: 16,
    width: 250,
    height: 144,
    marginHorizontal: 10,
  },
  productImg: {
    // marginVertical : 5,
    width: 240,
    height: 144,
    resizeMode: 'contain',
  },
  isi: {
    fontSize: 12,
    marginBottom: 16,
  },
  productBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 16,
    borderRadius: 8,
    width: 330,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  productBtnTxt: {
    color: 'white',
    alignSelf: 'center',
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
  imgBoxSatuan: {
    // width: 60,
    // height: 64,
    // borderWidth: 1,
    // borderColor: 'lightgrey',
    borderRadius: 8,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: 'center',
  },
  productImgSatuan: {
    width: 45,
    height: 45,
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
