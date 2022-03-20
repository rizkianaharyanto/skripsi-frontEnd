import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {AuthContext} from './../../config/context';
import Axios from 'axios';
import {API_URL, SERVER_URL} from '../../config/constants';

const AkunPage = ({navigation}) => {
  const {logOut} = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState('');

  React.useEffect(async () => {
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
    try {
      setToken(await AsyncStorage.getItem('userToken'));
      setUser(JSON.parse(await AsyncStorage.getItem('user')));
      setProfile(JSON.parse(await AsyncStorage.getItem('profile')));
      setRole(await AsyncStorage.getItem('role'));
      console.log(JSON.parse(await AsyncStorage.getItem('profile')));
    } catch (e) {
      console.log(e);
    }
    // console.warn(token)
    // console.warn(user.username)
  };

  const submit = async () => {
    // let token = await AsyncStorage.getItem('userToken');
    // console.warn(token);
    setIsLoading(true);
    Axios({
      method: 'post',
      url: API_URL + '/logout',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        setIsLoading(false);
        logOut();
        console.log(response);
      })
      .catch(function (error) {
        setIsLoading(false);
        logOut();
        console.log(error);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={getData} />
        }>
        {user.roles == 'toko' ? (
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={{
                uri: `${SERVER_URL}/images/${profile.tk_gambar}`,
              }}
            />
          </View>
        ) : (
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={{
                uri: `${SERVER_URL}/images/${profile.sl_gambar}`,
              }}
            />
          </View>
        )}
        {user.roles == 'toko' ? (
          <View style={styles.txtSection}>
            <Text style={styles.title}>Data Toko</Text>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Nama Toko</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.tk_nama}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Nama Pemilik</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.tk_pemilik}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Alamat</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.tk_alamat}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Email</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.tk_email}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Telp</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.tk_telp}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.txtSection}>
            <Text style={styles.title}>Data Diri</Text>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Kode </Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.sl_kode}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Nama </Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.sl_nama}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Alamat</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.sl_alamat}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Email</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.sl_email}</Text>
            </View>
            <View style={styles.txtBox}>
              <Text style={styles.txtSub}>Telp</Text>
              <Text style={{marginHorizontal: 10}}>:</Text>
              <Text style={styles.txtData}>{profile.sl_telp}</Text>
            </View>
          </View>
        )}
        <View style={styles.txtSection}>
          <Text style={styles.title}>Data Akun</Text>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Username</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>{user.username}</Text>
          </View>
          <View style={styles.txtBox}>
            <Text style={styles.txtSub}>Password</Text>
            <Text style={{marginHorizontal: 10}}>:</Text>
            <Text style={styles.txtData}>-</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            navigation.push('UpdateProfilePage');
          }}>
          <Text style={styles.BtnTxt}>Ubah Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            navigation.push('ChangePasswordPage');
          }}>
          <Text style={styles.BtnTxt}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={() => submit()}>
          <Text style={styles.BtnTxt}>
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
            ) : (
              'Log Out'
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AkunPage;

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
    marginVertical: 8,
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
