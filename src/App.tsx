import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Form from './components/form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}

export default App;
