import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: 50,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
  },
});

export default styles;
