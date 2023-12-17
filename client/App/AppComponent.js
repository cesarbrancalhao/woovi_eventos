import 'normalize.css/normalize.css';
import React from 'react';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Footer from '../Footer/FooterContainer';
import Navbar from '../Navbar/NavbarComponent';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.greeting}>
          <h1 className={styles.sawasdee}></h1>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Footer viewer={this.props.viewer} />
      </div>
    );
  }
}
