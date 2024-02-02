import { Component } from "react";


import css from "./App.module.css"
import ImageGalleryIten from "./Gallery/ImageGalleryItem/ImageGalleryItem";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
 
  
  render() {
    
   
    return (
      <div className={css.App}>
        <ToastContainer autoClose={5000} />
        
        <ImageGalleryIten  />
     
      </div>
    );
  }
}



export  {App}