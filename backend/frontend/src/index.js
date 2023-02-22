import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import {Provider} from 'react-redux'
import store from './store'
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
  <Provider store={store}>
    <ScrollToTop />
    <ToastContainer />
         <App />
         </Provider>
      
     </BrowserRouter>
);


