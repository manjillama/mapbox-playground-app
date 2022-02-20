import React from 'react';
import {Dimensions} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';

interface Props extends Partial<ModalProps> {
  isModalVisible: boolean;
  setModalVisible: (visibility: boolean) => void;
  children: React.ReactNode;
}

function CustomModal({
  isModalVisible,
  setModalVisible,
  children,
  ...props
}: Props) {
  return (
    <Modal
      {...props}
      backdropOpacity={0.5}
      deviceHeight={Dimensions.get('screen').height}
      onBackdropPress={() => setModalVisible(false)}
      isVisible={isModalVisible}>
      {children}
    </Modal>
  );
}

export default CustomModal;
