import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const Distributor = props => {
  const [mitra, setMitra] = useState(props.dis.tokos[0]);
  const [pengajuan, setPengajuan] = useState(props.dis.pengajuans[0]);
  const [isLoading, setIsLoading] = useState(false);

  const ajukanMitra = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const toko = JSON.parse(await AsyncStorage.getItem('profile'));

    const data = {
      distributor_id: props.dis.id,
      toko_id: toko.id,
    };
    setIsLoading(true);
    Axios.post(`https://secret-earth-93408.herokuapp.com/api/pengajuan`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        setPengajuan({
          pivot: {
            alasan_tolak: null,
          },
        });
        setIsLoading(false);
        // Alert.alert('Berhasil', 'Pengajuan mitra terkirim', [{text: 'OK'}]);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <TouchableOpacity style={styles.distributor} onPress={props.link}>
      <View style={styles.body}>
        <View style={styles.imgBox}>
          <Image
            style={styles.imgDistributor}
            source={{
              uri: `https://secret-earth-93408.herokuapp.com/images/${props.gambar}`,
            }}
          />
        </View>
        <View style={styles.distributorTxtSection}>
          <Text
            style={[
              styles.distributorTxt,
              {fontWeight: 'bold', marginBottom: 4},
            ]}>
            {props.nama}
          </Text>
          <Text style={[styles.distributorTxt, {fontSize: 12, color: 'grey'}]}>
            {props.alamat}
          </Text>
        </View>
      </View>
      {mitra != undefined ? (
        <View
          style={[
            styles.distributorBtn,
            {backgroundColor: 'white', borderColor: '#00AA13', borderWidth: 1},
          ]}>
          <Text style={[styles.distributorBtnTxt, {color: '#00AA13'}]}>
            Bermitra
          </Text>
        </View>
      ) : (
        [
          pengajuan == undefined ? (
            <TouchableOpacity
              style={styles.distributorBtn}
              onPress={() => ajukanMitra()}>
              <Text style={styles.distributorBtnTxt}>
                {isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backfaceVisibility: 'visible',
                    }}
                  />
                ) : (
                  'Ajukan Mitra'
                )}
              </Text>
            </TouchableOpacity>
          ) : (
            [
              pengajuan.pivot.alasan_tolak == null ? (
                <View
                  style={[
                    styles.distributorBtn,
                    {backgroundColor: 'lightgrey'},
                  ]}>
                  <Text style={styles.distributorBtnTxt}>
                    Menunggu Konfirmasi
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.distributorBtn}
                  onPress={() => ajukanMitra()}>
                  <Text style={styles.distributorBtnTxt}>
                    {isLoading ? (
                      <ActivityIndicator
                        size="small"
                        color="white"
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backfaceVisibility: 'visible',
                        }}
                      />
                    ) : (
                      'Ajukan Mitra'
                    )}
                  </Text>
                </TouchableOpacity>
              ),
            ]
          ),
        ]
      )}
    </TouchableOpacity>
  );
};

export default Distributor;

const styles = StyleSheet.create({
  distributor: {
    width: 160,
    height: 136,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  body: {
    marginTop: 4,
    flex: 1.7,
    flexDirection: 'row',
  },
  imgBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
    marginRight: 8,
    justifyContent: 'center',
    marginTop: 3,
  },
  imgDistributor: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    // resizeMode: 'contain',
  },
  distributorTxtSection: {
    flex: 3,
  },
  distributorTxt: {
    flexWrap: 'wrap',
  },
  distributorBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    width: 80,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  distributorBtnTxt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
  },
});
