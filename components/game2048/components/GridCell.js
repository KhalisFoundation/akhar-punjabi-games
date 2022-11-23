import { View } from 'react-native';
import React from 'react';

import Dimensions from '../../../util/dimensions';

const { width } = Dimensions.get('window');

const MARGIN_WIDTH = Dimensions.size['2'];
const ITEM_WIDTH = (width - Dimensions.size['27'] - MARGIN_WIDTH * 10) / 4;

const styles = {
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginHorizontal: MARGIN_WIDTH,
    backgroundColor: '#0005', // 'rgba(238, 228, 218, 0.35)',
    borderRadius: Dimensions.size['4'],
  }
};

const GridCell = () => <View style={styles.container} />;

export default GridCell;
