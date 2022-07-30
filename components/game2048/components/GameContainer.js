import {
	View,
	PanResponder,
} from 'react-native';
import React, {
	Component
} from 'react';
import GameMessage from './GameMessage';
import GridContainer from './GridContainer';
import TileContainer from './TileContainer';
import Dimensions from '../utils/dimensions';
const { width } = Dimensions.get('window');


const styles = {
	container: {
		width: width - Dimensions.size['10'],
		height: width - Dimensions.size['10'],
		backgroundColor: '#bbada0',
		borderRadius: Dimensions.size['2'],
		marginTop: Dimensions.size["12"],
	}
}

class GameContainer extends Component {
	render() {
		return (
			<View style={styles.container}>
				<GridContainer />
				<TileContainer tiles={this.props.tiles} />
			</View>
		)
	}
}

export default GameContainer
