import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FormInput from '../../component/FormInput';
import {AuthContext} from './../../config/context';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import Splash from '../Splash';
import {API_URL} from '../../config/constants';

const Login = ({navigation}) => {
  const {logIn} = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [msgUsername, setMsgUsername] = useState('');
  const [msgPassword, setMsgPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = React.useState({
    secureTextEntry: true,
    cek_textInput: false,
    cek_textPasswordInput: false,
    msg_textPasswordInput: false,
  });

  const textInput = value => {
    if (value.length != 0) {
      setData({
        ...data,
        userName: value,
        cek_textInput: true,
      });
    } else {
      setData({
        ...data,
        userName: value,
        cek_textInput: false,
      });
    }
  };

  const textPasswordInput = value => {
    if (value.length < 8) {
      setData({
        ...data,
        password: value,
        cek_textPasswordInput: false,
        msg_textPasswordInput: true,
      });
    } else if (value.length >= 8) {
      setData({
        ...data,
        password: value,
        cek_textPasswordInput: true,
        msg_textPasswordInput: false,
      });
    } else {
      setData({
        ...data,
        password: value,
        msg_textPasswordInput: false,
      });
    }
  };

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
      username: userName,
      password,
    };
    setIsLoading(true);
    Axios.post(API_URL + '/login', data)
      .then(res => {
        console.warn(res.data);
        setMessage(res.data.message);
        setUserName('');
        setPassword('');
        setMsgUsername('');
        setMsgPassword('');
        setData({
          ...data,
          cek_textPasswordInput: false,
          cek_textInput: false,
        });
        if (res.data.profile) {
          if (res.data.profile.tk_active == 'non-aktif') {
            setIsLoading(false);
            Alert.alert(
              'Akun Belum Aktif',
              'menunggu konfirmasi dari superadmin',
              [{text: 'OK'}],
            );
          } else if (res.data.profile.tk_active == 'tolak') {
            setIsLoading(false);
            // Alert.alert(
            //   'Ditolak!',
            //   'Data yang anda inputkan tidak layak. Silahkan mendaftar kembali dengan data yang sebenarnya',
            //   [{text: 'OK'}],
            // );
            navigation.push('Resubmission', {user: res.data.user});
          } else {
            logIn({
              token: res.data.token,
              role: res.data.user.roles,
              profile: res.data.profile,
              user: res.data.user,
            });
          }
        } else {
          setIsLoading(false);
          Alert.alert('Gagal Login', res.data.message, [{text: 'OK'}]);
        }
      })
      .catch(error => {
        console.log(error.response.data.errors);
        setIsLoading(false);
        setMsgUsername(error.response.data.errors.username);
        setMsgPassword(error.response.data.errors.password);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/icon/shopping-cart.png')}
          style={styles.logo}
        />
        <Text style={styles.logoTxt}>Selamat Datang di Aplikasi onSale</Text>
      </View>
      <View style={styles.alert}>
        {/* {message != 'success' ? (
          <Animatable.View animation="fadeIn" duration={1000}>
            <Text style={styles.alertTxt}>{message}</Text>
          </Animatable.View>
        ) : null} */}
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
      </View>
      <View style={styles.formSection}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14, marginBottom: 3}}>Username</Text>
          <View style={styles.form}>
            <FontAwesome5
              style={styles.formTxt}
              name="user-o"
              color="#008522"
              size={15}
            />
            {/* <Text style={{marginHorizontal: 12}}>:</Text> */}
            <TextInput
              style={styles.formInput}
              autoCapitalize="none"
              placeholder="Masukkan Username"
              placeholderTextColor="lightgrey"
              value={userName}
              onChangeText={value => {
                textInput(value);
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
              <Text style={{color: 'red', fontSize: 12, marginVertical: 3}}>
                {msgUsername}
              </Text>
            </Animatable.View>
          ) : null}
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14, marginBottom: 3}}>Password</Text>
          <View style={styles.form}>
            <FontAwesome5
              style={styles.formTxt}
              name="lock"
              color="#008522"
              size={20}
            />
            {/* <Text style={{marginHorizontal: 12}}>:</Text> */}
            <TextInput
              style={styles.formInput}
              placeholder="Masukkan Password"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              value={password}
              onChangeText={value => {
                handlePasswordChange(value);
                textPasswordInput(value);
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
              <Text style={{color: 'red', fontSize: 12, marginVertical: 3}}>
                {msgPassword}
              </Text>
            </Animatable.View>
          ) : null}
        </View>

        <LinearGradient
          colors={['#00AA13', '#008522']}
          style={[styles.btn, {marginTop: 36}]}>
          <TouchableOpacity
            // onPress={() => logIn({token: 'lala', role: 'sales'})}>
            onPress={() => submit()}>
            <Text style={styles.btnTxt}>Masuk</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.btnSection}>
        <LinearGradient
          colors={['#00AA13', '#008522']}
          style={[styles.btn, {marginTop: 36}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Regis');
            }}>
            <Text style={styles.btnTxt}>Daftar</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <LinearGradient
          colors={['#00AA13', '#008522']}
          style={[styles.btn, {marginTop: 36}]}>
          <TouchableOpacity onPress={() => {navigation.navigate('Test')}}>
            <Text style={styles.btnTxt}>Lupa Password</Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </View>
    </View>
  );
};

export default Login;

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
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  logoTxt: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: 12,
  },
  btnSection: {
    width: 288,
  },
  btn: {
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
    // marginBottom: 20,
    // paddingVertical: 5,
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
