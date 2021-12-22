
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import './index.css';
import App from './App';
import Navigate_Whatsapp from "./redirects/Navigate_Whatsapp";
import ProductsPage from "./redirects/ProductsPage";
import * as serviceWorker from './serviceWorker';
import Display_Product from './Display_Product';
import queryString from 'query-string'
import firebase from "firebase"
import Home from './Home';
import Products from './Products';
import SimpleMap from './SimpleMap';
import UploadProduct from './redirects/UploadProduct';
import Update from './redirects/Update';


const gotoproduct =() =>{

const query = window.location.href
const uid = query.split("b_uid=")[1]


return( 

  query.includes("addproduct") 
    ? <UploadProduct  b_uid={uid}  />
    :query.includes("update") 
    ? <Update  b_uid={uid}  />
    :query.includes("products") 
      ?<ProductsPage  b_uid={uid}/>
      :null
      // :query.includes("updates") 
      //   ?
  )

}

const gotohome =() =>{

      var x = window.location.href.split(".")[0].split("//")[1] 

      if(x == "whatsapp"){
        return( <Navigate_Whatsapp  /> )
      }
      else{
        return( <Home    b_name={x}  /> )
      }
  
  
  }



ReactDOM.render(

  <React.StrictMode>
    {
      window.location.href.includes("b_uid") 
      ?gotoproduct()
      :gotohome()
      

    }
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
