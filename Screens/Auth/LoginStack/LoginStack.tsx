import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ThemeIcons from '../../../Components/Common/ThemeIcons'
import ReusableModal from '../../../Components/Common/CustomModal'
import BottomSheet from '../../../Components/Common/BottomSheet'

const LoginStack = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <View style={styles.container}>
    <Button title="Show Modal" onPress={toggleModal} />
    {/* <BottomSheet /> */}
    <ReusableModal
      isVisible={isModalVisible}
      onClose={toggleModal}
      modalStyle={styles.customModal}
      closeButtonLabel="Dismiss"
      closeButtonStyle={styles.customCloseButton}
      closeButtonTextStyle={styles.customCloseButtonText}
      additionalButtons={
        <TouchableOpacity style={styles.additionalButton} onPress={() => Alert.alert('Another Action')}>
          <Text style={styles.additionalButtonText}>Another Action</Text>
        </TouchableOpacity>
      }
    >
      <Text style={styles.modalText}>Hello, I am a customizable modal!</Text>
    </ReusableModal>
  </View>
  )
}

export default LoginStack
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  customModal: {
    backgroundColor: '#f9f9f9',
  },
  customCloseButton: {
    backgroundColor: 'blue',
  },
  customCloseButtonText: {
    color: '#fff',
  },
  additionalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  additionalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});