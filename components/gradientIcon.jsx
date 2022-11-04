import * as React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export const gradionIcon = (data, height, width) => {
    const state = useSelector((theState) => theState.theGameReducer);
    return (<MaskedView
            style={{ width: width, height: height }}
            maskElement={(
                <View
                style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                {data}
                </View>
                )}
            >
            <LinearGradient
                colors={['#FF0076', '#590FB7']}
                style={{ flex: 1 }}
            />
            </MaskedView>)
}