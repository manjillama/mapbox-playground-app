import {Button} from 'native-base';
import React, {ComponentType, useState} from 'react';
import NavigationMenuModal from '../components/navigation-menu-modal';

export const withRootScreen =
  (ChildComponent: ComponentType<any>) => (props: any) => {
    const [openNavigationMenu, setOpenNavigationMenu] = useState(false);

    return (
      <>
        <Button onPress={() => setOpenNavigationMenu(true)}>Open Menu</Button>
        <NavigationMenuModal
          openNavigationMenu={openNavigationMenu}
          setOpenNavigationMenu={setOpenNavigationMenu}
        />
        <ChildComponent {...props} />
      </>
    );
  };
