import { View } from 'react-native';
import React from 'react';
import GridRow from './GridRow';

import Dimensions from '../../../util/dimensions';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width: width*0.8,
    height: width*0.8,
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    paddingHorizontal: width*0.01,
    paddingVertical: width*0.01,
    borderRadius: width*0.02,
    flexDirection: 'column',
    backgroundColor: '#FFB846', // 'rgba(238, 228, 218, 0.35)',
  }
};

const GridContainer = () => (
  <View style={styles.container}>
    <GridRow />
    <GridRow />
    <GridRow />
    <GridRow />
  </View>
);

export default GridContainer;
