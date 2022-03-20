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
  Alert,
} from 'react-native';
import Axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {API_URL, SERVER_URL} from '../../config/constants';
import DocumentPicker from 'react-native-document-picker';
const UpdateProfilePage = ({navigation}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [role, setRole] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [newPhoto, setNewPhoto] = useState('');
  const [newPhotoFile, setNewPhotoFile] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState({
    msgUsername: '',
    msgNamaToko: '',
    msgPemilik: '',
    msgAlamatT: '',
    msgEmailT: '',
    msgTelpT: '',
    msgKode: '',
    msgNama: '',
    msgAlamatS: '',
    msgEmailS: '',
    msgTelpS: '',
  });

  const [data, setData] = React.useState({
    secureTextEntry: true,
    cek_textInput: false,
    cek_textPasswordInput: false,
  });

  React.useEffect(() => {
    setTimeout(async () => {
      try {
        setToken(await AsyncStorage.getItem('userToken'));
        setUser(JSON.parse(await AsyncStorage.getItem('user')));
        setProfile(JSON.parse(await AsyncStorage.getItem('profile')));
        setRole(await AsyncStorage.getItem('role'));
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }, []);

  const simpan = async (role, profile, user) => {
    await AsyncStorage.setItem('role', role);
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
    await AsyncStorage.setItem('user', JSON.stringify(user));

    // console.warn('profile:', await AsyncStorage.getItem('profile'));
  };

  const submitToko = async () => {
    const data = {
      tk_nama: profile.tk_nama,
      tk_alamat: profile.tk_alamat,
      tk_pemilik: profile.tk_pemilik,
      tk_telp: profile.tk_telp,
      tk_deskripsi: profile.tk_deskripsi,
      tk_gambar: profile.tk_gambar,
      tk_active: profile.tk_active,
      username: user.username,
      email: profile.tk_email,
      roles: role,
    };
    setIsLoading(true);
    let res;

    try {
      res = await Axios.put(API_URL + `/toko/${profile.id}`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(res.data);
      setUser(JSON.stringify(res.data.user));
      setProfile(JSON.stringify(res.data.toko));
      setRole(JSON.stringify(res.data.user.roles));
      simpan(role, profile, user);
      Alert.alert('Berhasil', 'Perubahan berhasil disimpan', [{text: 'OK'}]);
      navigation.navigate('AkunPage');
    } catch (error) {
      console.log(error.response.data.errors);
      if (error?.response?.data) {
        console.log('Check', error?.response?.data);
        setMessage({
          ...message,
          msgUsername: error?.response?.data?.errors?.username,
          msgNamaToko: error?.response?.data?.errors?.tk_nama,
          msgPemilik: error?.response?.data?.errors?.tk_pemilik,
          msgAlamatT: error?.response?.data?.errors?.tk_alamat,
          msgEmailT: error?.response?.data?.errors?.email,
          msgTelpT: error?.response?.data?.errors?.tk_telp,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitSales = async () => {
    const data = {
      sl_kode: profile.sl_kode,
      sl_nama: profile.sl_nama,
      sl_alamat: profile.sl_alamat,
      sl_telp: profile.sl_telp,
      sl_gambar: profile.sl_gambar,
      username: user.username,
      email: profile.sl_email,
      roles: role,
    };
    setIsLoading(true);

    // if (imageUpload.status === 200) {
    Axios.put(API_URL + `/sales/${profile.id}`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        console.log(res.data);
        setUser(JSON.stringify(res.data.user));
        setProfile(JSON.stringify(res.data.sales));
        setRole(JSON.stringify(res.data.user.roles));
        simpan(role, profile, user);
        Alert.alert('Berhasil', 'Perubahan berhasil disimpan', [{text: 'OK'}]);
        navigation.push('AkunPage');
      })
      .catch(error => {
        console.log(error.response.data.errors);
        if (error?.response?.data) {
          console.log('Check', error?.response?.data);
          setMessage({
            ...message,
            msgUsername: error.response.data.errors.username,
            msgKode: error.response.data.errors.sl_kode,
            msgNama: error.response.data.errors.sl_nama,
            msgAlamatS: error.response.data.errors.sl_alamat,
            msgEmailS: error.response.data.errors.email,
            msgTelpS: error.response.data.errors.sl_telp,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }

    setIsLoading(false);
  };

  const openMedia = async () => {
    let newPhotoUri;
    try {
      const imgData = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      if (imgData.size < 2000000) {
        console.log(imgData);
        newPhotoUri = imgData.uri;
        setNewPhotoFile(imgData);
        setNewPhoto(newPhotoUri);
        setPhotoUploaded(true);
      } else {
        console.log('kegedean');
        alert('ukuran file terlalu besar');
        return;
      }
      if (imgData != null) {
        console.log('1');
        if (user.roles == 'toko') {
          let uploadPhotoData = new FormData();

          uploadPhotoData.append('tk_gambar', imgData);
          uploadPhotoData.append('id', profile.id);
          uploadPhotoData.append(
            'tk_nama',
            `${profile.tk_nama}-${profile.id}-${Date.now()}`,
          );
          console.log('id:', profile.id);
          let imageUpload;
          try {
            imageUpload = await Axios.post(
              API_URL + '/toko/foto',
              uploadPhotoData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            let prof = JSON.parse(await AsyncStorage.getItem('profile'));
            let updated = {
              ...prof,
              tk_gambar: imageUpload.data.toko.tk_gambar,
            };
            console.log(imageUpload.data.toko.tk_gambar);
            await AsyncStorage.setItem('profile', JSON.stringify(updated));
            if (imageUpload.status == 200) {
              navigation.push('AkunPage');
            }
          } catch (error) {
            console.error(error.response.data);
            alert('error:', error);

            return;
          }
          console.log('~~~~~~~~~~~~~~~~~~~CHECK', imageUpload.data);
        } else {
          let uploadPhotoData = new FormData();

          uploadPhotoData.append('sl_gambar', imgData);
          uploadPhotoData.append('id', profile.id);
          uploadPhotoData.append(
            'sl_nama',
            `${profile.sl_nama}-${profile.id}-${Date.now()}`,
          );
          console.log('id:', profile.id);
          let imageUpload;
          try {
            imageUpload = await Axios.post(
              API_URL + '/sales/foto',
              uploadPhotoData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            let prof = JSON.parse(await AsyncStorage.getItem('profile'));
            let updated = {
              ...prof,
              sl_gambar: imageUpload.data.sales.sl_gambar,
            };
            await AsyncStorage.setItem('profile', JSON.stringify(updated));
            let test = await AsyncStorage.getItem('profile');
            console.log(test);
            if (imageUpload.status == 200) {
              navigation.push('AkunPage');
            }
          } catch (error) {
            console.error(error.response.data);
            alert('error:', error);

            return;
          }
          console.log('~~~~~~~~~~~~~~~~~~~CHECK', imageUpload.data);
        }
      }
    } catch (error) {
      setPhotoUploaded(false);
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw error;
      }
    }
  };
  return (
    <View style={styles.page}>
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
      <ScrollView style={styles.body}>
        {user.roles == 'toko' ? (
          <View style={styles.imgBox}>
            <TouchableOpacity onPress={() => openMedia()}>
              <Image
                style={styles.img}
                source={{
                  uri: photoUploaded
                    ? newPhoto
                    : `${SERVER_URL}/images/${profile.tk_gambar}`,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imgBox}>
            <TouchableOpacity onPress={() => openMedia()}>
              <Image
                style={styles.img}
                source={{
                  uri: photoUploaded
                    ? newPhoto
                    : `${SERVER_URL}/images/${profile.sl_gambar}`,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {user.roles == 'toko' ? (
          <View style={styles.txtSection}>
            <Text style={styles.title}>Data Toko</Text>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Nama Toko</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.tk_nama}
                    onChangeText={value =>
                      setProfile({...profile, tk_nama: value})
                    }
                  />
                </View>
                {message.msgNamaToko ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgNamaToko}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Nama Pemilik</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.tk_pemilik}
                    onChangeText={value =>
                      setProfile({...profile, tk_pemilik: value})
                    }
                  />
                </View>
                {message.msgPemilik ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgPemilik}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Alamat</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.tk_alamat}
                    onChangeText={value =>
                      setProfile({...profile, tk_alamat: value})
                    }
                  />
                </View>
                {message.msgAlamatT ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgAlamatT}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Email</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.tk_email}
                    onChangeText={value =>
                      setProfile({...profile, tk_email: value})
                    }
                  />
                </View>
                {message.msgEmailT ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgEmailT}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>No. Telp</Text>
                <View style={styles.form}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.tk_telp}
                    onChangeText={value =>
                      setProfile({...profile, tk_telp: value})
                    }
                  />
                </View>
                {message.msgTelpT ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgTelpT}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.txtSection}>
            <Text style={styles.title}>Data Diri</Text>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Kode </Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.sl_kode}
                    onChangeText={value =>
                      setProfile({...profile, sl_kode: value})
                    }
                  />
                </View>
                {message.msgKode ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgKode}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Nama </Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.sl_nama}
                    onChangeText={value =>
                      setProfile({...profile, sl_nama: value})
                    }
                  />
                </View>
                {message.msgNama ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgNama}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Alamat</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.sl_alamat}
                    onChangeText={value =>
                      setProfile({...profile, sl_alamat: value})
                    }
                  />
                </View>
                {message.msgAlamatS ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgAlamatS}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Email</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.sl_email}
                    onChangeText={value =>
                      setProfile({...profile, sl_email: value})
                    }
                  />
                </View>
                {message.msgEmailS ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgEmailS}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>No. Telp</Text>
                <View style={styles.form}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={profile.sl_telp}
                    onChangeText={value =>
                      setProfile({...profile, sl_telp: value})
                    }
                  />
                </View>
                {message.msgTelpS ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {message.msgTelpS}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        )}
        <View style={styles.txtSection}>
          <Text style={styles.title}>Data Akun</Text>
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 14, marginBottom: 3}}>Username</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.formInput}
                autoCapitalize="none"
                placeholder="Masukkan Username"
                placeholderTextColor="lightgrey"
                value={user.username}
                onChangeText={value => setUser({...user, username: value})}
              />
              {data.cek_textInput ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    style={(styles.middle, {marginVertical: 0})}
                    name="check"
                    color="#00AA13"
                    size={15}
                  />
                </Animatable.View>
              ) : null}
            </View>
            {message.msgUsername ? (
              <Animatable.View animation="fadeIn" duration={1000}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 12,
                    marginTop: 3,
                  }}>
                  {message.msgUsername}
                </Text>
              </Animatable.View>
            ) : null}
          </View>
        </View>
        {role == 'toko' ? (
          <TouchableOpacity style={styles.Btn} onPress={() => submitToko()}>
            <Text style={styles.BtnTxt}>Ubah</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.Btn} onPress={() => submitSales()}>
            <Text style={styles.BtnTxt}>Ubah</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default UpdateProfilePage;

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
    width: 55,
    height: 55,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtSection: {
    padding: 5,
    // marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  Btn: {
    // backgroundColor: 'white',
    borderColor: '#00AA13',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 50,
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
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 288,
    height: 36,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  formTxt: {
    // fontSize: 12,
    flex: 1,
  },
  middle: {
    // fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  formInput: {
    flex: 8,
    color: 'black',
    fontSize: 14,
  },
  alert: {
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  alertTxt: {
    textAlign: 'center',
    fontSize: 12,
    color: 'red',
  },
});
