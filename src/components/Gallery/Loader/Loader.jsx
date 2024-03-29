import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
import css from "./Loader.module.css"

class Loader extends Component {
  render() {
    return (
      <div className={css.wrapper}> 
        {' '}
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;
