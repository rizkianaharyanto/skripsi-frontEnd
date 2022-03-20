import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const ModalPesan = props => {
  const [modalOpen, setModalOpen] = useState(props.show);
  console.warn(props.show);
  return (
    <Modal
      visible={modalOpen}
      animationType="fade"
      style={{flex: 1, backgroundColor: 'grey', position:'relative'}}>
      <FontAwesome5
        name="close"
        color={'lightgrey'}
        onPress={() => setModalOpen(false)}
      />
      <View>test</View>
      <View>test</View>
      <View>test</View>
    </Modal>
  );
};

export default ModalPesan;

const styles = StyleSheet.create({
  product: {
    width: 160,
    height: 264,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  imgBox: {
    alignSelf: 'center',
    width: 152 - 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginVertical: 4,
    flex: 1.6,
  },
  imgProduct: {
    alignSelf: 'center',
    width: 152 - 16,
    marginVertical: 4,
    flex: 1.6,
    resizeMode: 'contain',
  },
  productTxtSection: {
    marginVertical: 4,
    flex: 2.5,
    marginLeft: 4,
  },
  productTxt: {
    marginBottom: 4,
  },
  productBtn: {
    backgroundColor: '#00AA13',
    marginVertical: 4,
    borderRadius: 8,
    width: 80,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.9,
  },
  productBtnTxt: {
    color: 'white',
    alignSelf: 'center',
  },
});
