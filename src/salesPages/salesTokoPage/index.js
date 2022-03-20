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
  RefreshControl,
} from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import Product from '../../component/Product';
import Menu from '../../component/Menu/index.js';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salesTokoPage = ({route, navigation}) => {
  const [toko, setToko] = useState(route.params.toko);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <View style={styles.page}>
      {/* <HeaderApp /> */}
      <ScrollView style={styles.body}>
        <View style={styles.imgBox}>
          <Image
            style={styles.img}
            source={{
              uri: `https://secret-earth-93408.herokuapp.com/images/${toko.tk_gambar}`,
            }}
          />
        </View>
        <View style={styles.txtSection}>
          {/* <Text style={styles.title}>Data Toko</Text> */}
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Nama Toko</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{toko.tk_nama}</Text>
          </View>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Nama Pemilik</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{toko.tk_pemilik}</Text>
          </View>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Alamat</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{toko.tk_alamat}</Text>
          </View>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Email</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{toko.tk_email}</Text>
          </View>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Telp</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{toko.tk_telp}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default salesTokoPage;

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
      },
      body: {
        padding: 12,
      },
      imgBox: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
      },
      img: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 100,
        width: 80,
        height: 80,
        // resizeMode: 'contain',
        alignSelf: 'center',
      },
      txtSection: {
        padding: 5,
        marginBottom: 20,
        marginTop: 10,
      },
      title: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      txtBox: {
        marginVertical: 16,
        flexDirection: 'row',
      },
      txtSub: {
        fontSize: 14,
        flex: 1,
      },
      txtData: {
        fontSize: 14,
        flex: 2,
      },
      Btn: {
        // backgroundColor: 'white',
        borderColor: '#00AA13',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 8,
        width: 330,
        height: 32,
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      BtnTxt: {
        color: '#00AA13',
        alignSelf: 'center',
      },
});
