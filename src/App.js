import React from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA4M_N2iTMfRdbPdDRJgr7PjwCLgZ5fDrQ",
    authDomain: "bloc-react-chat-2020.firebaseapp.com",
    databaseURL: "https://bloc-react-chat-2020.firebaseio.com",
    projectId: "bloc-react-chat-2020",
    storageBucket: "bloc-react-chat-2020.appspot.com",
    messagingSenderId: "1085700804788",
    appId: "1:1085700804788:web:4e396eee3bf4e6ae1d07e1",
    measurementId: "G-GNR1K5H5YS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
