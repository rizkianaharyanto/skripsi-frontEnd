import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import FormInput from '../../component/FormInput';
import FormRegis1 from '../../component/FormRegis/formregis1';
import FormRegis2 from '../../component/FormRegis/formregis2';
import {AuthContext} from './../../config/context';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import Stepper from 'react-native-stepper-ui';
import Splash from '../Splash';

const MyComponent = props => {
  return (
    <View>
      <View style={styles.formSection}></View>
    </View>
  );
};

const content = [
  <MyComponent title="Component 1" />,
  <MyComponent title="Component 2" />,
];

const Regis = ({navigation}) => {
  const {regis} = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [namaToko, setNamaToko] = useState('');
  const [namaPemilik, setNamaPemilik] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');

  const [message, setMessage] = useState('');
  const [msgUsername, setMsgUsername] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [msgNamaToko, setMsgNamaToko] = useState('');
  const [msgPemilik, setMsgPemilik] = useState('');
  const [msgAlamat, setMsgAlamat] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgTelp, setMsgTelp] = useState('');

  const [active, setActive] = useState(0);

  const [data, setData] = React.useState({
    secureTextEntry: true,
    cek_textInput: false,
    cek_textPasswordInput: false,
  });

  // const textInput = value => {
  //   if (value.length != 0) {
  //     setData({
  //       ...data,
  //       userName: value,
  //       cek_textInput: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       userName: value,
  //       cek_textInput: false,
  //     });
  //   }
  // };

  // const textPasswordInput = value => {
  //   if (value.length != 0) {
  //     setData({
  //       ...data,
  //       password: value,
  //       cek_textPasswordInput: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       password: value,
  //       cek_textPasswordInput: false,
  //     });
  //   }
  // };

  const handlePasswordChange = value => {
    setData({
      ...data,
      password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const submit = () => {
    const data = {
      tk_nama: namaToko,
      tk_alamat: alamat,
      tk_pemilik: namaPemilik,
      tk_telp: telp,
      tk_deskripsi: '',
      tk_gambar: '',
      tk_active: 'non-aktif',
      username: userName,
      email,
      password,
      roles: 'toko',
    };
    setIsLoading(true);
    Axios.post('https://secret-earth-93408.herokuapp.com/api/regis', data)
      .then(res => {
        console.log(res.data.message);
        setMessage(res.data.message);
        // regis({token: res.data.token, role: res.data.user.roles});
        Alert.alert('Berhasil', 'Pendaftaran berhasil', [{text: 'OK'}]);
        navigation.push('Login');
      })
      .catch(error => {
        setActive(0);
        console.log(error.response.data.errors);
        setMsgUsername(error.response.data.errors.username);
        setMsgPassword(error.response.data.errors.password);
        setMsgNamaToko(error.response.data.errors.tk_nama);
        setMsgEmail(error.response.data.errors.email);
        setMsgPemilik(error.response.data.errors.tk_pemilik);
        setMsgAlamat(error.response.data.errors.tk_alamat);
        setMsgTelp(error.response.data.errors.tk_telp);
        setIsLoading(false);
      });
  };

  const next = () => {
    () => setActive(p => p + 1);
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <View style={styles.page}>
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/icon/shopping-cart.png')}
          style={styles.logo}
        />
        <Text style={styles.logoTxt}>Selamat Datang di Aplikasi onSale</Text>
      </View>
      {message != 'success' ? (
        <View style={styles.alert}>
          <Text style={styles.alertTxt}>{message}</Text>
        </View>
      ) : null}

      <View style={styles.btnSection}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleSection1}>Data Akun</Text>
          <Text style={styles.titleSection2}>Data Toko</Text>
        </View>
        {active == 0 ? (
          <Stepper
            active={active}
            content={content}
            onBack={() => setActive(p => p - 1)}
            onFinish={() => alert(active)}
            onNext={() => setActive(p => p + 1)}
            stepStyle={{backgroundColor: '#00AA13'}}
            wrapperStyle={{width: 288}}
            buttonStyle={styles.btn}
            buttonTextStyle={styles.btnTxt}
          />
        ) : (
          <Stepper
            active={active}
            content={content}
            onBack={() => setActive(p => p - 1)}
            onFinish={() => submit()}
            onNext={() => setActive(p => p + 1)}
            stepStyle={{backgroundColor: '#00AA13'}}
            wrapperStyle={{width: 288}}
            buttonStyle={styles.btn2}
            buttonTextStyle={styles.btnTxt}
          />
        )}

        {active == 0 ? (
          <View style={styles.showDisplay}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 14, marginBottom: 3}}>Username</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.formInput}
                  autoCapitalize="none"
                  placeholder="Masukkan Username"
                  placeholderTextColor="lightgrey"
                  value={userName}
                  onChangeText={value => {
                    setUserName(value);
                  }}
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
              {msgUsername ? (
                <Animatable.View animation="fadeIn" duration={1000}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 12,
                      marginTop: 3,
                    }}>
                    {msgUsername}
                  </Text>
                </Animatable.View>
              ) : null}
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 14, marginBottom: 3}}>Password</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Masukkan Password"
                  placeholderTextColor="lightgrey"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={value => {
                    handlePasswordChange(value);
                    setPassword(value);
                  }}
                  secureTextEntry={data.secureTextEntry ? true : false}
                />
                {data.cek_textPasswordInput ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      style={(styles.middle, {marginRight: 3})}
                      name="check"
                      color="#00AA13"
                      size={15}
                    />
                  </Animatable.View>
                ) : null}
                {data.secureTextEntry == true ? (
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    <Feather
                      style={(styles.middle, {marginLeft: 3})}
                      name="eye-off"
                      color="grey"
                      size={15}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    <Feather
                      style={(styles.middle, {marginLeft: 3})}
                      name="eye"
                      color="grey"
                      size={15}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {msgPassword ? (
                <Animatable.View animation="fadeIn" duration={1000}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 12,
                      marginTop: 3,
                    }}>
                    {msgPassword}
                  </Text>
                </Animatable.View>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={styles.showDisplay}>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <Text style={{fontSize: 14}}>Nama Toko</Text>
                <View style={styles.form}>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan"
                    placeholderTextColor="lightgrey"
                    value={namaToko}
                    onChangeText={value => setNamaToko(value)}
                  />
                </View>
                {msgNamaToko ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {msgNamaToko}
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
                    value={namaPemilik}
                    onChangeText={value => setNamaPemilik(value)}
                  />
                </View>
                {msgPemilik ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {msgPemilik}
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
                    value={alamat}
                    onChangeText={value => setAlamat(value)}
                  />
                </View>
                {msgAlamat ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {msgAlamat}
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
                    value={email}
                    onChangeText={value => setEmail(value)}
                  />
                </View>
                {msgEmail ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {msgEmail}
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
                    value={telp}
                    onChangeText={value => setTelp(value)}
                  />
                </View>
                {msgTelp ? (
                  <Animatable.View animation="fadeIn" duration={1000}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      {msgTelp}
                    </Text>
                  </Animatable.View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Regis;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSection: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 16,
  },
  logoTxt: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: 12,
    height: 400,
  },
  showDisplay: {
    position: 'absolute',
    marginTop: 90,
    // backgroundColor: 'blue',
    height: 375,
  },
  titleSection1: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00AA13',
    flex: 1,
  },
  titleSection2: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00AA13',
    flex: 1,
    textAlign: 'right',
  },
  btnSection: {
    width: 288,
  },
  btn: {
    width: 288,
    backgroundColor: '#00AA13',
    borderRadius: 10,
    height: 40,
    marginTop: 24,
    justifyContent: 'center',
  },
  btn2: {
    width: 144,
    backgroundColor: '#00AA13',
    borderRadius: 10,
    height: 40,
    marginTop: 24,
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
