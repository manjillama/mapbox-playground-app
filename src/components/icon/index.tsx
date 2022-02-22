import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

type IconType = 'fa' | 'mi' | 'fa5' | 'ant' | 'mci' | 'ion' | 'fea';

// eslint-disable-next-line no-undef
export type {IconType};

function Icon({
  name,
  size = 24,
  color,
  as,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  as: IconType;
  style?: StyleProp<TextStyle>;
}): JSX.Element {
  if (as === 'fa')
    return <FontAwesome name={name} size={size} color={color} style={style} />;
  if (as === 'mi')
    return (
      <MaterialIcons name={name} size={size} color={color} style={style} />
    );
  if (as === 'ant') return <AntDesign name={name} size={size} color={color} />;
  if (as === 'mci')
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={style}
      />
    );
  if (as === 'ion')
    return <Ionicons name={name} size={size} color={color} style={style} />;

  if (as === 'fea')
    return <FeatherIcon name={name} size={size} color={color} style={style} />;
  return <FontAwesome5 name={name} size={size} color={color} style={style} />;
}

export default Icon;
