import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  RefreshControl,
  Text,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import SalesKeranjang from '../../component/salesKeranjang';
import Menu from '../../component/Menu/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const salesPesanPage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keranjangs, setKeranjangs] = useState([]);
  const [totals, setTotals] = useState([]);
  const [selectedToko, setSelectedToko] = useState();
  const [tokos, setTokos] = useState([]);

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
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/lihatkeranjangSales`,
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
        setTotals(null);
        setTotals(response.data.totals);
        setKeranjangs(null);
        setKeranjangs(response.data.keranjangs);
        setTokos(null);
        setTokos(response.data.mitras);
        setIsLoading(false);
        setRefresh(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setRefresh(false);
      });
  };

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 8,
          }}>
          <View style={styles.topSection}>
            <Text>Pilih Toko :</Text>
            <View
              style={{
                borderColor: '#00AA13',
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
                marginLeft: 8,
                fontSize: 12,
              }}>
              <Picker
                style={{flex: 1}}
                selectedValue={selectedToko}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedToko(itemValue);
                  getData();
                }}
                dropdownIconColor={'#00AA13'}>
                {tokos?.map((toko, index) => {
                  return (
                    <Picker.Item
                      key={toko.id}
                      label={toko.tk_nama}
                      value={toko.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>

        {keranjangs?.map((keranjang, index) => {
          if (totals) {
            return (
              <SalesKeranjang
                key={keranjang.id}
                distributor={keranjang.distributor}
                toko={keranjang.toko}
                products={keranjang.produks}
                hargaTotal={totals[index]}
                toko={selectedToko}
              />
            );
          } else {
            return (
              <SalesKeranjang
                key={keranjang.id}
                distributor={keranjang.distributor}
                toko={keranjang.toko}
                products={keranjang.produks}
                hargaTotal={'-'}
                toko={selectedToko}
              />
            );
          }
        })}
        {keranjangs?.length == 0 ? (
          <Text
            style={[
              styles.title,
              {
                color: 'grey',
                marginVertical: 80,
                // width: 200,
                textAlign: 'center',
              },
            ]}>
            Anda tidak memiliki barang di keranjang
          </Text>
        ) : null}
      </ScrollView>
      {/* <Menu /> */}
    </View>
  );
};

export default salesPesanPage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
