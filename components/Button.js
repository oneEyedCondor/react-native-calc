
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {

  static defaultProps = {
    onPress: function() { },
    title: '',
    color: 'white',
    backgroundColor: 'black',
    radius: 40,
    style: { },
  }

  render() {
    var r = this.props.radius;
    var w = this.props.radius * 1.6;
    var h = this.props.radius * 1.6;
    var bc = this.props.backgroundColor;

    return (
      <TouchableOpacity onPress={this.props.onPress} 
        style={[styles.container, { width: w, height: h, borderRadius: r, backgroundColor: bc }, { ...this.props.style }]}>
        <Text style={[styles.text, { color: this.props.color }]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', margin: 5, flex: 1},
  text: { fontSize: 18 },
});