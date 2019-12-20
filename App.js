import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity,Button, Text, View, Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { gender: null, 
      photo_male:[],
      photo_female:[],
      host: '192.168.0.105'
    };
    this.getPhoto();
  }
  //fetch data from server
  getPhoto(){
    fetch(`http://${this.state.host}:8000/view/male`)
    .then((res)=> res.json())
    .then((responseJosn)=>{
      this.setState({photo_male: responseJosn.table})
    })
    fetch(`http://${this.state.host}:8000/view/female`)
    .then((res)=> res.json())
    .then((responseJosn)=>{
      this.setState({photo_female: responseJosn.table})
    })
  }
  //function for rendering the photo list
  getPhotoList(){
    switch(this.state.gender){
      case "male":
        return this.state.photo_male.map((link, key) =>(<Image key={key} source={{uri: `http://${this.state.host}:8000/male/${link}`}} style={{width: 400, height: 400}}/>));
      case "female":
        return this.state.photo_female.map((link, key) =>(<Image key={key} source={{uri: `http://${this.state.host}:8000/female/${link}`}} style={{width: 400, height: 400}}/>));
      default:
        return;
    }
  }
  render(){
    var ImageListArr = this.getPhotoList();
    return (
      <View style={styles.container}>
      <View style={styles.buttongroup}>
          <Text style={styles.title}>Please choose a gender:</Text>
          <Text style={styles.title}>{this.state.gender}</Text>
        </View>
        <View style={styles.buttongroup}>
          <TouchableOpacity 
            style={styles.buttons}
            onPress={()=>{this.setState({gender: "male"})}}>
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttons}
            onPress={()=>{this.setState({gender: "female"})}}>
            <Text>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttons}
            onPress={()=>{this.getPhoto()}}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {ImageListArr}
        </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40
  },
  title: {
    fontSize: 20
  },
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',   
  },
  buttons: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#34b4eb',
    padding: 10,
    margin: 20
  }
});
