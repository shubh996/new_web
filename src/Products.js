import React, { useEffect, createRef, useRef } from 'react';
import { Button } from "baseui/button";
import lottie from "lottie-web";
import './index.css';
import { Select } from "baseui/select";
import { BsFillHandbagFill ,BsCreditCard2BackFill,BsHourglassSplit,} from "react-icons/bs";
import { RiCellphoneFill,RiWhatsappFill,RiMapPin2Fill,RiShareForwardFill ,RiMailFill,RiPhoneFill,RiShoppingCartFill,RiMicrosoftFill} from "react-icons/ri";
import { Input } from "baseui/input";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';
import {Heading, HeadingLevel} from 'baseui/heading';
import {DisplayLarge, HeadingLarge, HeadingMedium, HeadingSmall, HeadingXSmall, Paragraph3} from 'baseui/typography';
import {Drawer, SIZE} from 'baseui/drawer';
import {StatefulTabs, StyledTab} from 'baseui/tabs';
import {Label2} from 'baseui/typography';
import { FaStoreAlt,FaMapMarkerAlt,FaClock  } from "react-icons/fa";
import { IoStorefrontSharp,IoDocumentTextSharp } from "react-icons/io5";
import { Accordion, Panel } from "baseui/accordion";
import { CgArrowLongLeft } from "react-icons/cg";
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
import {
    ThemeProvider,
    createTheme,
    lightThemePrimitives
  } from "baseui"
import {Grid, Cell} from 'baseui/layout-grid';
import ArrowLeft from 'baseui/icon/arrow-left'
import {  MdDelete } from 'react-icons/md';
import { FileUploader } from "baseui/file-uploader";
import firebase from "firebase"
import {RadioGroup, Radio} from 'baseui/radio';
import { FormControl } from "baseui/form-control";
import { ButtonGroup } from "baseui/button-group";
import {Textarea} from 'baseui/textarea';
import {Block} from 'baseui/block';
import {Alert} from 'baseui/icon';
import {useStyletron} from 'baseui';
import {StatefulPopover} from 'baseui/popover';
//import { Tabs, Tab } from "baseui/tabs";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import Skeleton from 'react-loading-skeleton'
import SkeletonTheme from 'react-loading-skeleton'
import { Spinner } from "baseui/spinner";

import 'react-loading-skeleton/dist/skeleton.css'



export default function Products(props) {

  let animationContainer =React.useRef();

  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

 
  const [products, setProducts] = React.useState([]);
  const [business, setBusiness] = React.useState([]);
  const [imageLoaded, setImageLoaded]=React.useState(false);
  const [imageLoadedFull, setImageLoadedFull]=React.useState(false);
  const [current, setCurrent] = React.useState({})

 

  useEffect(() => {

    

    firebase.firestore().collection('business_page').doc(props.b_uid).onSnapshot(doc=>{

      setBusiness(doc.data())
    
    })

    


      firebase.firestore().collection("business_page").doc(props.b_uid).collection("products").onSnapshot(querySnapshot => {
         var groups_l = []; 

        querySnapshot.forEach(documentSnapshot => {

          if(documentSnapshot.data().tag ){
            groups_l.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
          });
          }    
        
        });
        setProducts(groups_l)

    })
      


  }, []);

 

 

      return (

        <div >
        

        <footer className={"footer4"} >
            <h4  style={{color:"#fff",fontSize:30,fontFamily:"UberMoveBold"}} >  Products  </h4>
        </footer>

        <Drawer
          isOpen={isOpenDrawer}
          autoFocus={false}
          onClose={() => setIsOpenDrawer(false)}
          anchor='right'
          overrides={{
            DrawerContainer: {
              style: ({ $theme }) => ({
                outline: `#000 solid 1px`,
                backgroundColor:"#eee",
                width:"80%",
              })
            }
        }}

        >
          <div style={{width:"100%",marginTop:10}}>
                        <div>

                        <Button onClick={()=> setIsOpenDrawer(false)} kind='minimal' size='mini'style={{marginLeft:-10}} >
                               <CgArrowLongLeft style={{marginBottom:10}} size={35} />
                               </Button>

                               <h2 style={{marginTop:"5px",marginBottom:"5px",color:"#000",fontFamily:"UberMoveBold"}}  >{current.name}</h2>

                           
                            <img width='100%' height="auto" src={current.image} onLoad={()=> setImageLoadedFull(true)} />
                            {!imageLoadedFull && (
          
                                <div >
                                  {/* <Spinner color='#000' size="30px" style={{margin:"43%"}}/> */}
                                  <SkeletonTheme baseColor="#eee" highlightColor="#FFF" height={"200px"} duration={0.75}  />
                                </div>

                              )}

                            <h3 style={{marginBottom:"15px",marginTop:10,color:"#276EF1",fontSize:17,marginLeft:1.5,fontFamily:"UberMoveBold"}}  >{current.tag}</h3>

                            <p style={{color:"#555",marginLeft:2}}>
                                {current.description}
                            </p>
                            <h4 style={{marginTop:"5px",marginBottom:"5px",color:"#276EF1",fontSize:17,marginLeft:1.5,fontFamily:"UberMoveBold"}}  >{current.price ? "Price : " +"  ₹ " + business.h_price: null }</h4>


                            <footer className={"footer25"} >
                                  <Button onClick={()=>window.open(`whatsapp://send?text=Hello *${business.name}}* , ${'\n'}Just visited your business website, wanted to know more about your ${current.tag} *${current.name}* : ${current.description}.&phone=91${business.whatsapp}`,"_self")} kind="secondary" style={{margin:7.5,padding:12.5,width:"42%",backgroundColor:"#048848"}}><RiWhatsappFill color={"#fff"} size={30}/></Button>
                                  <Button onClick={()=>window.open(`tel:${business.phone}`,"_self")} shape="default" style={{margin:7.5,padding:12.5,width:"42%"}}><RiPhoneFill size ={30}/></Button>
                             </footer>

                    
                                
                        </div>
                </div>
        </Drawer>
 
        <div style={{marginTop:50}}>
          {
            !products.length == 0 
            ?  <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            
          >
          
          <FlexGridItem >
            <div  className={ imageLoaded ? 'cardDottedProduct' :  'cardDottedProduct'}>
                   <div  >
                     <SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"100px"} duration={0.75}   />
                     <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>
                   </div>
  
            </div>
         </FlexGridItem>

         <FlexGridItem >
            <div  className={ imageLoaded ? 'cardDottedProduct' :  'cardDottedProduct'}>
                   <div  >
                     <SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"100px"} duration={0.75}   />
                     <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>
                   </div>
  
            </div>
         </FlexGridItem>

         <h4  style={{color:"#276EF1",fontSize:30,fontFamily:"UberMoveBold",marginTop:20}} >  Stay Tuned  </h4>
         <h4  style={{color:"#000",fontSize:30,fontFamily:"UberMoveBold",marginTop:20}} >  We will soon update our product line here </h4>

         
         
      </FlexGrid>
         
        :<FlexGrid
      flexGridColumnCount={1}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
      
    >{products.map((item) =><FlexGridItem onClick={()=>( setCurrent(item) ,setIsOpenDrawer(true)  )} ><div  className={ imageLoaded ? 'cardDottedProduct' :  'cardDottedProduct'}>
                             
    <img width='100%' height="auto" src={item.image } style={{borderRadius:4}} onLoad={()=> setImageLoaded(true)} />
    {!imageLoaded && (
             
             <div style={{marginTop:-25}} >
               {/* <Spinner color='#000' size="30px" style={{margin:"43%"}}/> */}
               <SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"150px"} duration={0.75}   />
               <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>
             </div>
   
           )}
   
     { !imageLoaded ?null:<h3 style={{marginTop:"10px",marginBottom:"0px",color:"#000",fontSize:16}}  >{item.name || <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>}</h3>
   }
   </div></FlexGridItem>)}</FlexGrid>
}
        </div>

          </div> 
    

      );
  

  }



              
