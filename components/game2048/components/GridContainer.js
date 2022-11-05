import { View } from 'react-native';
import React from 'react';
import GridRow from './GridRow';

import Dimensions from '../../../util/dimensions';
const { width } = Dimensions.get('window');

const styles = {
  container: {
    width: width - Dimensions.size['27'],
    height: width - Dimensions.size['27'],
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    paddingHorizontal: Dimensions.size['2'],
    paddingVertical: Dimensions.size['2'],
    borderRadius: Dimensions.size['2'],
    flexDirection: 'column',
    backgroundColor: '#FFB846',// 'rgba(238, 228, 218, 0.35)',
  }
}

const GridContainer = () => (
  <View style={styles.container}>
    <GridRow />
    <GridRow />
    <GridRow />
    <GridRow />
  </View>
)

export default GridContainer;
