// ReusableModal.tsx
import React, { ReactNode } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ViewStyle, TextStyle } from 'react-native';

interface ReusableModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  modalStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  closeButtonStyle?: ViewStyle;
  closeButtonTextStyle?: TextStyle;
  closeButtonLabel?: string;
  additionalButtons?: ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isVisible,
  onClose,
  children,
  modalStyle,
  backdropStyle,
  closeButtonStyle,
  closeButtonTextStyle,
  closeButtonLabel = 'Close',
  additionalButtons,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.backdrop, backdropStyle]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, modalStyle]}>
              {children}
              {additionalButtons}
              <TouchableOpacity style={[styles.closeButton, closeButtonStyle]} onPress={onClose}>
                <Text style={[styles.closeButtonText, closeButtonTextStyle]}>{closeButtonLabel}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReusableModal;




// in parent scrren
{/* <ReusableModal
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
    </ReusableModal> */}
