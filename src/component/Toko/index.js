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

const Toko = props => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableOpacity style={styles.toko} onPress={props.link}>
      <View style={styles.body}>
        <View style={styles.imgBox}>
          <Image
            style={styles.imgtoko}
            source={{
              uri: `https://secret-earth-93408.herokuapp.com/images/${props.gambar}`,
            }}
          />
        </View>
        <Text style={[styles.tokoTxt, {fontWeight: 'bold', marginLeft: 8}]}>{props.nama}</Text>
      </View>
      <Text style={[styles.tokoTxt, {fontSize: 12, color: 'grey'}]}>
        {props.telp}
      </Text>
      <Text style={[styles.tokoTxt, {fontSize: 12, color: 'grey'}]}>
        {props.alamat}
      </Text>
    </TouchableOpacity>
  );
};

export default Toko;

const styles = StyleSheet.create({
  toko: {
    width: 160,
    minHeight: 136,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  body: {
    marginTop: 4,
    // flex: 1.7,
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
  imgtoko: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    // resizeMode: 'contain',
  },
  tokoTxt: {
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    marginTop: 4,
  },
});
