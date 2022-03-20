import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import SatuanAct from './satuanAct';
import {useNavigation} from '@react-navigation/core';

const Aktivitas = props => {
  const [dis, setDis] = useState(props.distributor);
  const [pesanans, setPesanans] = useState(props.pesanans);
  const navigation = useNavigation();

  return (
    <View style={styles.aktivitas}>
      <TouchableOpacity style={styles.topSection} onPress={props.link}>
        <View style={styles.imgBox}>
          <Image
            style={styles.imgDistributor}
            source={{
              uri: `https://secret-earth-93408.herokuapp.com/images/${dis.ds_gambar}`,
            }}
          />
        </View>
        <Text style={styles.topTxt}>{dis.ds_nama}</Text>
      </TouchableOpacity>
      <View style={styles.tableSection}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>No.</Text>
          <Text style={styles.headerTxt}>Tanggal</Text>
          <Text style={styles.headerTxt}>Total</Text>
          <Text style={styles.headerTxt}>Status</Text>
        </View>
        {pesanans?.map(pesanan => {
          return (
            <SatuanAct
              key={pesanan.id}
              idPesanan={pesanan.id}
              no={pesanan.ps_kode}
              tanggal={pesanan.ps_tanggal}
              total={pesanan.ps_total_harga}
              status={pesanan.ps_status}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Aktivitas;

const styles = StyleSheet.create({
  aktivitas: {
    backgroundColor: 'white',
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
    shadowColor: 'blue',
    shadowRadius: 50,
  },
  topSection: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imgBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    marginRight: 16,
    justifyContent: 'center',
  },
  imgDistributor: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  topTxt: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableSection: {
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 8,
    paddingRight: 28,
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
