import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {API_URL} from '../../config/constants';
import {AuthContext} from '../../config/context';

const ChangePasswordPage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {logOut} = React.useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [secureTextEntry3, setSecureTextEntry3] = useState(true);

  const resetPassword = async () => {
    const token = await AsyncStorage.getItem('userToken');

    let res;

    try {
      res = await axios.post(
        API_URL + '/change-password',
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirm: newPasswordConfirm,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
    } catch (error) {
      if (error.response.status === 400) {
        alert(error?.response?.data?.message);
      } else {
        alert('Telah Terjadi Kesalahan');
      }
    }

    if (res.status === 200) {
      alert('Password Berhasil Diubah Silahkan Login Kembali');

      let res;

      try {
        res = await axios.post(
          API_URL + '/logout',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        );
      } catch (error) {
        console.error(error);
      }

      if (res.status === 200) {
        logOut();
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
        <View>
          <Text>Current Password</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              placeholder="Masukkan Password"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              value={currentPassword}
              onChangeText={value => {
                setCurrentPassword(value);
              }}
              secureTextEntry={secureTextEntry ? true : false}
            />
            {secureTextEntry == true ? (
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye-off"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text>New Password</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              placeholder="Masukkan Password"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              value={newPassword}
              onChangeText={value => {
                setNewPassword(value);
              }}
              secureTextEntry={secureTextEntry2 ? true : false}
            />
            {secureTextEntry2 == true ? (
              <TouchableOpacity
                onPress={() => setSecureTextEntry2(!secureTextEntry2)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye-off"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecureTextEntry2(!secureTextEntry2)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text>New Password Confirm</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              placeholder="Masukkan Password"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              value={newPasswordConfirm}
              onChangeText={value => {
                setNewPasswordConfirm(value);
              }}
              secureTextEntry={secureTextEntry3 ? true : false}
            />
            {secureTextEntry3 == true ? (
              <TouchableOpacity
                onPress={() => setSecureTextEntry3(!secureTextEntry3)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye-off"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecureTextEntry3(!secureTextEntry3)}>
                <Feather
                  style={(styles.middle, {marginLeft: 3})}
                  name="eye"
                  color="grey"
                  size={15}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => resetPassword()}>
              <Text style={styles.BtnTxt}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 288,
    height: 36,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  BtnTxt: {
    color: '#00AA13',
    alignSelf: 'center',
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
  body: {
    padding: 12,
  },

  formTxt: {
    // fontSize: 12,
    flex: 1,
  },
  formInput: {
    flex: 8,
    color: 'black',
    fontSize: 14,
  },
});

export default ChangePasswordPage;
