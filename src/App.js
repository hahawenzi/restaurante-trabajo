import React, { Component } from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
