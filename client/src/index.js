import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {  BrowserRouter as Router} from 'react-router-dom';
import Sidebar from './MyComponents/Sidebar';
import myStore ,{PersistStore} from './store';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from "react-cookie";
myStore.subscribe(()=>console.log(myStore.getState()));

ReactDOM.render(
  <Provider store={myStore}>
    <PersistGate persistor={PersistStore}>
    <CookiesProvider>
       <Router>
          <App/>
          
       </Router>
       </CookiesProvider>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
