import React, {useEffect, useState} from 'react';
import {Box, FlatList, Input, Text, View, VStack} from 'native-base';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import {debounce} from 'lodash';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialIcons';

// interface Props {
//   shouldShow: boolean;
//   inAnimation: Animatable.Animation | string;
//   outAnimation: Animatable.Animation | string;
//   children: React.ReactNode;
//   animation?: Animatable.Animation | string;
//   duration?: number;
//   delay?: number;
//   direction?: Animatable.Direction;
//   easing?: Animatable.Easing;
//   iterationCount?: number | 'infinite';
//   iterationDelay?: number;
//   transition?: any;
//   useNativeDriver?: boolean;
//   onAnimationBegin?: Function;
//   onAnimationEnd?: Function;
//   onTransitionBegin?: (property: string) => void;
//   onTransitionEnd?: (property: string) => void;
//   style?: StyleProp<any>;
// }

type Props = {
  setOpenMenu: (openMenu: boolean) => void;
  shouldShow: boolean;
  setNavigationRoutes: (destLat: number, destLon: number) => void;
};

const fetchLocations = async (query: any, cb: any) => {
  let locations = [];
  if (query) {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.trim()}.json?country=np&types=place%2Caddress%2Ccountry%2Cregion%2Cdistrict%2Clocality%2Cneighborhood%2Cpoi&language=en&access_token=${MAPBOX_ACCESS_TOKEN}`,
    );
    locations = res.data.features;
  }
  cb(locations);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchLocations(query, cb);
}, 200);

const SearchPanel = ({setNavigationRoutes, setOpenMenu, shouldShow}: Props) => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    debouncedFetchData(query, (res: any) => {
      setLocations(res);
    });
  }, [query]);

  function closeSearchBox(fn?: () => void) {
    setOpenSearchBox(false);
    setLocations([]);
    setQuery('');
    if (fn) fn();
  }

  return (
    <Animatable.View
      animation={shouldShow ? 'slideInDown' : 'slideOutUp'}
      duration={500}>
      <View
        style={[openSearchBox ? styles.fullScreenPanel : styles.searchPanel]}
        borderColor="light.50">
        <SafeAreaView>
          {!openSearchBox ? (
            <Box style={styles.topPanel}>
              <TouchableOpacity
                style={{paddingRight: 8}}
                onPress={() => setOpenMenu(true)}>
                <MCIcon name="menu" size={28} color="#3a3a3a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setOpenSearchBox(true)}>
                <Box height="100%" justifyContent="center">
                  <Text fontSize={16} color="dark.100">
                    Search here
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          ) : (
            <VStack width="100%">
              <Box style={styles.topPanel}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                    paddingRight: 4,
                    marginLeft: -4,
                  }}
                  onPress={() => closeSearchBox()}>
                  <FeatherIcon name="chevron-left" size={30} />
                </TouchableOpacity>
                <Input
                  padding={0}
                  height="100%"
                  fontSize={16}
                  borderWidth={0}
                  // _focus={{
                  //   borderWidth: 0,
                  // }}
                  onChangeText={setQuery}
                  placeholder="Search"
                  flex={1}
                  autoFocus={true}
                  color="dark.100"
                />
              </Box>
              <Box width="100%" bgColor="#f7f7f7" marginTop={4}>
                <FlatList
                  marginTop={4}
                  data={locations}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          closeSearchBox(() =>
                            setNavigationRoutes(
                              item.geometry.coordinates[1],
                              item.geometry.coordinates[0],
                            ),
                          )
                        }
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 14,
                          backgroundColor: '#fff',
                          borderBottomWidth: 1,
                          borderBottomColor: '#f7f7f7',
                        }}>
                        <Text>{item.text}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </Box>
            </VStack>
          )}
        </SafeAreaView>
      </View>
    </Animatable.View>
  );
};

function SearchBox() {}

export default SearchPanel;
