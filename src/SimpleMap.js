import React, { Component } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonTheme from 'react-loading-skeleton'



const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ marginTop:20}}>
        <SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"250px"} duration={0.75}  />
        <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>
        </div>
    );
  }
}

export default SimpleMap;