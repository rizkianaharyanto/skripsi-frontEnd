import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const SatuanAct = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() =>
        navigation.navigate('InvoicePage', {
          id: props.idPesanan,
        })
      }>
      <View style={styles.satuan}>
        <Text style={[styles.txt, {flex: 1.5, textAlign: 'left'}]}>
          {props.no}
        </Text>
        <Text style={[styles.txt, {flex: 2}]}>{props.tanggal}</Text>
        <Text style={[styles.txt, {flex: 2.5}]}>Rp {props.total}</Text>
        <Text style={[styles.txt, {flex: 1.5}]}>{props.status}</Text>
      </View>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() =>
          navigation.navigate('InvoicePage', {
            id: props.idPesanan,
          })
        }>
        <FontAwesome5
          name="arrow-right"
          color={'#00AA13'}
          size={12}
          style={styles.tolakTxt}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SatuanAct;

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  satuan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    flex: 1,
    paddingRight: 4,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 12,
    color: 'black',
    flexWrap: 'wrap',
    paddingRight: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
