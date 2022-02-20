import {Button} from 'native-base';
import React, {ComponentType, useState} from 'react';
import MenuModal from '../components/menu-modal';

export const withRootScreen =
  (ChildComponent: ComponentType<any>) => (props: any) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
      <>
        <Button onPress={() => setOpenMenu(true)}>Open Menu</Button>
        <MenuModal openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <ChildComponent {...props} />
      </>
    );
  };
