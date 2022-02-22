import React, {useEffect, useState} from 'react';
import {Box, FlatList, Input, Text, View, VStack} from 'native-base';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MAPBOX_ACCESS_TOKEN} from '@env';
import {debounce} from 'lodash';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../components/icon';
import {marginRight} from 'styled-system';
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
  setOpenNavigationMenu: (openMenu: boolean) => void;
  shouldShow: boolean;
  setNavigationRoutes: (
    destLat: number,
    destLon: number,
    showMarker?: boolean,
  ) => void;
};

const fetchLocations = async (query: any, cb: any) => {
  let locations = [];
  if (query) {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.trim()}.json?country=np&limit=12&types=place,address,region,district,locality,neighborhood,poi&language=en&access_token=${MAPBOX_ACCESS_TOKEN}`,
      );
      locations = res.data.features;
    } catch (err) {
      console.error('MBX geocoding api', err);
    }
  }
  cb(locations);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchLocations(query, cb);
}, 200);

const SearchPanel = ({
  setNavigationRoutes,
  setOpenNavigationMenu,
  shouldShow,
}: Props) => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    debouncedFetchData(query, (res: any) => {
      setLocations(res);
    });
  }, [query]);

  function closeSearchBox(selectedLocation = '', fn?: () => void) {
    setOpenSearchBox(false);
    setQuery(selectedLocation);
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
                onPress={() => setOpenNavigationMenu(true)}>
                <Icon as="fea" name="menu" size={28} color="#3a3a3a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setOpenSearchBox(true)}>
                <Box height="100%" justifyContent="center">
                  <Text fontSize={16} color="dark.100">
                    {query ? query : 'Search here'}
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
                  <Icon as="fea" name="chevron-left" size={30} />
                </TouchableOpacity>
                <Input
                  padding={0}
                  height="100%"
                  fontSize={16}
                  borderWidth={0}
                  // _focus={{
                  //   borderWidth: 0,
                  // }}
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search"
                  flex={1}
                  autoFocus={true}
                  color="dark.100"
                />
              </Box>
              <View
                width="100%"
                position="relative"
                zIndex={10000}
                height="100%"
                bgColor="#f7f7f7"
                marginTop={4}>
                <FlatList
                  marginTop={4}
                  data={locations}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          closeSearchBox(item.place_name, () =>
                            setNavigationRoutes(
                              item.geometry.coordinates[1],
                              item.geometry.coordinates[0],
                              true,
                            ),
                          )
                        }
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 14,
                          backgroundColor: '#fff',
                          borderBottomWidth: 1,
                          borderBottomColor: '#f7f7f7',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <RenderSearchPlaceIcon placeType={item.place_type[0]} />

                        <Text marginLeft={3} flexShrink={1}>
                          {item.place_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            </VStack>
          )}
        </SafeAreaView>
      </View>
    </Animatable.View>
  );
};

function RenderSearchPlaceIcon({placeType}: {placeType: string}) {
  if (placeType === 'poi')
    return <Icon size={18} as="mci" name="fireplace-off" />;

  return <Icon size={18} as="ion" name="location-sharp" />;
}

export default SearchPanel;
