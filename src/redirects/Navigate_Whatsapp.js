import React,{Component} from 'react';



export default class Navigate_Whatsapp extends Component{
  
  constructor(props) {
    super(props);
  }

    componentDidMount () {
        window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')
    }

    render() {
      return (
        <div style={{width:"100%",}}>apple</div>
      );
    }

  }



              
