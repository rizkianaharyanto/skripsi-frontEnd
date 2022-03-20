import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import Aktivitas from '../../component/AktivitasSales';
import HeaderApp from '../../component/HeaderApp';
import Menu from '../../component/Menu/index.js';
import TabAktivitas from '../../component/TabAktivitas';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salesAktivitasPage = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const [tokos, setTokos] = useState([]);
  const [riwayat, setRiwayat] = useState(false);
  const [kosong, setKosong] = useState(false);

  React.useEffect(async () => {
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));
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
    // setRefresh(true);
    setRiwayat(false);
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/lihatPesananSales`,
      {
        params: {
          distributor_id: sales.distributor_id,
          sales_id: sales.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        setTokos(null);
        setTokos(response.data.tokos);
        // console.log('get data');
        setRefresh(false);
      })
      .catch(function (error) {
        console.log(error);
        setRefresh(false);
      });
  };

  const getRiwayat = async () => {
    setRefresh(true);
    const token = await AsyncStorage.getItem('userToken');
    const sales = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(
      `https://secret-earth-93408.herokuapp.com/api/lihatRiwayatSales`,
      {
        params: {
          distributor_id: sales.distributor_id,
          sales_id: sales.id,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then(function (response) {
        setTokos(null);
        setTokos(response.data.tokos);
        // console.log('get data');
        setRefresh(false);
      })
      .catch(function (error) {
        console.log(error);
        setRefresh(false);
      });
  };

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}
      {riwayat == true ? (
        <View style={styles.tab}>
          <TouchableOpacity
            style={styles.tabBtnNon}
            onPress={() => {
              setRiwayat(false);
              getData();
            }}>
            <Text style={styles.tabTxtNon}>Berjalan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBtnActive}
            onPress={() => {
              setRiwayat(true);
              getRiwayat();
            }}>
            <Text style={styles.tabTxtActive}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.tab}>
          <TouchableOpacity
            style={styles.tabBtnActive}
            onPress={() => {
              setRiwayat(false);
              getData();
            }}>
            <Text style={styles.tabTxtActive}>Berjalan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBtnNon}
            onPress={() => {
              setRiwayat(true);
              getRiwayat();
            }}>
            <Text style={styles.tabTxtNon}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        {tokos?.map((toko, index) => {
          if (toko.pesanans.length != 0) {
            return (
              <Aktivitas
                key={toko.id}
                link={() => {
                  navigation.navigate('salesTokoPage', {
                    toko: toko,
                  });
                }}
                toko={toko}
                pesanans={toko.pesanans}
              />
            );
          }
        })}
        {tokos?.length == 0 ? ( 
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
            Anda belum memiliki pesanan
          </Text>
        ) : null}
      </ScrollView>
      {/* <Menu /> */}
    </View>
  );
};

export default salesAktivitasPage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    // marginHorizontal : 48
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
