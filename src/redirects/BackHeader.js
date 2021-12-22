import React,{Component} from 'react';
import {
  Display1,
  Display2,
  Display3,
  Display4,
} from 'baseui/typography';
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import ArrowLeft from 'baseui/icon/arrow-left'
import "./index.css"
import { BsArrowLeft } from "react-icons/bs";

export default class BackHeader extends Component{
  
  constructor(props) {
    super(props);
    this.state={
      b_uid : props.b_uid
    }
  }

    

    render() {
      return (
        
        <div onClick={()=>window.open(`https://products.prod.gq/b_uid=${this.state.b_uid}` ,"_blank" )}  style={{paddingTop:10, marginLeft:17.5, justifyContent: "flex-start"}}>
          
          <BsArrowLeft  size={33} style={{marginTop:15}}/>

          <div >

            <h1 style={{fontFamily:"UberMoveMedium",paddingTop:15}} >  {this.props.heading}  </h1>
            <StyledBody style={{fontFamily:"UberMoveBold",marginLeft:18,marginTop:5,marginRight:15}}>{this.props.subheading} </StyledBody>

          </div>

        </div>
      );
    }

  }



              
