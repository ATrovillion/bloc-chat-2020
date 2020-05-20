import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA4M_N2iTMfRdbPdDRJgr7PjwCLgZ5fDrQ",
    authDomain: "bloc-react-chat-2020.firebaseapp.com",
    databaseURL: "https://bloc-react-chat-2020.firebaseio.com",
    projectId: "bloc-react-chat-2020",
    storageBucket: "bloc-react-chat-2020.appspot.com",
    messagingSenderId: "1085700804788",
    appId: "1:1085700804788:web:4e396eee3bf4e6ae1d07e1",
    measurementId: "G-GNR1K5H5YS",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {rooms: RoomList}
  }

  render() {
    return (
      <div className="App">

        <div className="room-list">
          <RoomList firebase={firebase} />
        </div>
      </div>
    );
  }
}

export default App;
