import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {Button, Modal, Text} from 'native-base';
import React, {ComponentType, useState} from 'react';

export const withRootScreen =
  (ChildComponent: ComponentType<any>) => (props: any) => {
    const navigation = useNavigation<BottomTabNavigationProp<any>>();
    const [open, setOpen] = useState(false);

    const openModal = () => {
      setOpen(true);
    };

    return (
      <>
        <Button onPress={openModal}>Open Menu</Button>
        <Modal
          animationPreset="slide"
          isOpen={open}
          onClose={() => setOpen(false)}
          mt={12}>
          <Modal.Content
            maxWidth="350"
            style={{marginLeft: 0, marginRight: 'auto'}}>
            <Modal.Body>
              <Text>This is modal</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <ChildComponent {...props} />
      </>
    );
  };
