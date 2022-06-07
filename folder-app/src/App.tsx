import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';

import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Page from './Components/Page';
import PrivateRoute from './Components/PrivateRoute';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/folder/:id' element={
            <PrivateRoute> 
              <Page /> 
            </PrivateRoute>
            }
          />
          <Route path='/' element={
            <PrivateRoute> 
              <Home /> 
            </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  )
};

export default App;