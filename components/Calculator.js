
require('../lib/swisscalc.lib.format.js');
require('../lib/swisscalc.lib.operator.js');
require('../lib/swisscalc.lib.operatorCache.js');
require('../lib/swisscalc.lib.shuntingYard.js');
require('../lib/swisscalc.display.numericDisplay.js');
require('../lib/swisscalc.display.memoryDisplay.js');
require('../lib/swisscalc.calc.calculator.js');

import React from 'react';
import { StyleSheet, Dimensions, PanResponder, View, Text } from 'react-native';
import Button from './Button';
import Display from './Display';

export default class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      orientation: 'portrait',
    }
    
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    Dimensions.addEventListener('change', () => {
      const { width, height } = Dimensions.get('window');
      var orientation = (width > height) ? 'landscape' : 'portrait';
      this.setState({ orientation: orientation });
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => { },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      },
    })
  }

  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.updateDisplay();
  }

  onUnaryOperatorPress = (operator) => {
    this.calc.addUnaryOperator(operator);
    this.updateDisplay();
  }

  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.updateDisplay();
  }

  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.updateDisplay();
  }

  onClearPress = () => {
    this.calc.clear();
    this.updateDisplay();
  }

  onPlusMinusPress = () => {
    this.calc.negate();
    this.updateDisplay();
  }

  onMemoryPlusPress = () => {
    this.calc.memoryPlus();
    this.updateDisplay();
  }

  onMemoryMinusPress = () => {
    this.calc.memoryMinus();
    this.updateDisplay();
  }
  
  onMemoryClearPress = () => {
    this.calc.memoryClear();
    this.updateDisplay();
  }

  onMemoryRecallPress = () => {
    this.calc.memoryRecall();
    this.updateDisplay();
  }

  onBackspacePress = () => {
    this.calc.backspace();
    this.updateDisplay();
  }

  updateDisplay = () => {
    this.setState({ display: this.calc.getMainDisplay() });
  }

  renderPortrait() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent: 'flex-end'}} {...this.panResponder.panHandlers}>
          <Display display={this.state.display} />
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={this.onClearPress} title='AC' backgroundColor='#D1D1D1' />
            <Button onPress={this.onPlusMinusPress} title='+/-' backgroundColor='#D1D1D1' />
            <Button onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator) }} title='%' backgroundColor='#D1D1D1' />
            <Button onPress={() => { this.onBinaryOperatorPress(this.oc.DivisionOperator) }} title='/' backgroundColor='#FF9800' />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={() => { this.onMemoryClearPress() }} title='mc' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onMemoryRecallPress() }} title='mr' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onMemoryMinusPress() }} title='m-' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onMemoryPlusPress() }} title='m+' backgroundColor='#FF9800' />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={() => { this.onDigitPress('7') }} title='7' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('8') }} title='8' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('9') }} title='9' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title='x' backgroundColor='#FF9800' />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={() => { this.onDigitPress('4') }} title='4' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('5') }} title='5' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('6') }} title='6' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onBinaryOperatorPress(this.oc.SubtractionOperator) }} title='-' backgroundColor='#FF9800' />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={() => { this.onDigitPress('1') }} title='1' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('2') }} title='2' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onDigitPress('3') }} title='3' backgroundColor='#2E3B42' />
            <Button onPress={() => { this.onBinaryOperatorPress(this.oc.AdditionOperator) }} title='+' backgroundColor='#FF9800' />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button onPress={() => { this.onDigitPress('0') }} title='0' backgroundColor='#2E3B42' style={{flex:2}} />
            <Button onPress={() => { this.onDigitPress('.') }} title=',' backgroundColor='#2E3B42' />
            <Button onPress={this.onEqualsPress} title='=' backgroundColor='#FF9800' />
          </View>
        </View>

      </View>
    );
  }

  renderLandscape() {
    return (
      <View>
        <Text>Landscape</Text>
      </View>
    )
  }

  render() {
    var view = (this.state.orientation == 'portrait')
      ? this.renderPortrait()
      : this.renderLandscape();

    return (
      <View style={{flex:1}}>
        {view}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 50, backgroundColor: 'black' },
})