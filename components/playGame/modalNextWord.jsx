/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet, Modal, Text, TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';

import { closeNextLevelModal } from '../../redux/actions';

import theColors from '../../util/colors';

function WordsDoneModal() {
  const state = useSelector((theState) => theState.theGameReducer);
  const dispatch = useDispatch();

  let colors;
  if (state === undefined) {
    colors = theColors.false;
  } else {
    colors = theColors[state.darkMode];
  }

  const styles = StyleSheet.create({
    container: {
      width: '70%',
      height: '60%',
      left: '15%',
      top: '15%',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: colors.modalNextWord.container,
      borderRadius: 10,
    },
    titles: {
      fontSize: 20,
      textAlign: 'center',
    },
    wordBox: {
      backgroundColor: colors.modalNextWord.wordBox,
      borderRadius: 20,
      margin: 1,
    },
    wordDoneText: {
      fontSize: 25,
      textAlign: 'center',
    },
    continue: {
      flexDirection: 'row',
      backgroundColor: colors.modalNextWord.continue,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    continueText: {
      textAlign: 'center',
    },
  });
  return (
    <Modal
      visible={state.nextLevelModal[0]}
      animationType="slide"
      transparent
      onRequestClose={() => dispatch(closeNextLevelModal())}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.theWords}>
          <Text style={styles.titles}>First Word</Text>
          <View style={styles.wordBox}>
            <Text style={styles.wordDoneText}>
              Gurmukhi Text:
              {' '}
              {state.nextLevelModal[1].punjabiText}
            </Text>
            <Text style={styles.wordDoneText}>
              English Text:
              {' '}
              {state.nextLevelModal[1].engText}
            </Text>
            <Text style={styles.wordDoneText}>
              Meaning:
              {' '}
              {state.nextLevelModal[1].meaning}
            </Text>
            <Text style={styles.wordDoneText}>
              Word Type:
              {' '}
              {state.nextLevelModal[1].type}
            </Text>
          </View>
          <Text style={styles.titles}>Second Word</Text>
          <View style={styles.wordBox}>
            <Text style={styles.wordDoneText}>
              Gurmukhi Text:
              {' '}
              {state.nextLevelModal[2].punjabiText}
            </Text>
            <Text style={styles.wordDoneText}>
              English Text:
              {' '}
              {state.nextLevelModal[2].engText}
            </Text>
            <Text style={styles.wordDoneText}>
              Meaning:
              {' '}
              {state.nextLevelModal[2].meaning}
            </Text>
            <Text style={styles.wordDoneText}>
              Word Type:
              {' '}
              {state.nextLevelModal[2].type}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => dispatch(closeNextLevelModal())}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
          <Icon name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default WordsDoneModal;
