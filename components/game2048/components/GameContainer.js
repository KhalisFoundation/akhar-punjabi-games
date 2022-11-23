/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import {
  View
} from 'react-native';
import React, {
  Component
} from 'react';
import GridContainer from './GridContainer';
import TileContainer from './TileContainer';
import Dimensions from '../../../util/dimensions';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width: width - Dimensions.size['27'],
    height: width - Dimensions.size['27'],
    backgroundColor: '#bbada0',
    borderRadius: Dimensions.size['2'],
    marginTop: Dimensions.size['12'],
  }
};

class GameContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GridContainer />
        <TileContainer tiles={this.props.tiles} />
      </View>
    );
  }
}

export default GameContainer;
