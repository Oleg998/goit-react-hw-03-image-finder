import { Component } from "react";

import Searchbar from "./Gallery/Searchbar/Searchbar";
import css from "./App.module.css"
import ImageGalleryIten from "./Gallery/ImageGalleryItem/ImageGalleryItem";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {   
    search: '',    
  };

  handelSearchForm = data => {
    this.setState({
      search: data,

    });
  };
  render() {
    const {handelSearchForm}=this;
    const {search}=this.state
    return (
      <div className={css.App}>
        <ToastContainer autoClose={5000} />
        <Searchbar onSubmit={handelSearchForm} />
        <ImageGalleryIten searchItem={search}  />
     
      </div>
    );
  }
}



export  {App}