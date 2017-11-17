import React, {Component} from 'react'
import TopHeader from './top-header'
import Footer from './footer'
require('../css/common.css')

export default class Layout extends Component {
  render(){
    return (
      <div className="top-component">
        <TopHeader />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}