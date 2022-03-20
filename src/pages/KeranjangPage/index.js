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
import Keranjang from '../../component/Keranjang';
import Menu from '../../component/Menu/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const KeranjangPage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keranjangs, setKeranjangs] = useState([]);
  const [totals, setTotals] = useState([]);

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
    const toko = JSON.parse(await AsyncStorage.getItem('profile'));

    Axios.get(`https://secret-earth-93408.herokuapp.com/api/lihatkeranjang`, {
      params: {
        toko_id: toko.id,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        setTotals(null);
        setTotals(response.data.totals);
        setKeranjangs(null);
        setKeranjangs(response.data.keranjangs);
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
        {/* {isLoading ? (
          <ActivityIndicator
            size="small"
            color="green"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backfaceVisibility: 'visible',
            }}
          />
        ) : null} */}
        {keranjangs?.map((keranjang, index) => {
          if (totals) {
            return (
              <Keranjang
                key={keranjang.id}
                distributor={keranjang.distributor}
                products={keranjang.produks}
                hargaTotal={totals[index]}
              />
            );
          } else {
            return (
              <Keranjang
                key={keranjang.id}
                distributor={keranjang.distributor}
                products={keranjang.produks}
                hargaTotal={'-'}
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

export default KeranjangPage;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
});
