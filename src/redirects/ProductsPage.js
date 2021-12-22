

// import React, { useEffect, createRef } from 'react';
// import { Button } from "baseui/button";
// import lottie from "lottie-web";
// import { Input } from "baseui/input";
// import {Client as Styletron} from 'styletron-engine-atomic';
// import {Provider as StyletronProvider} from 'styletron-react';
// import {LightTheme, BaseProvider, styled} from 'baseui';
// import {StatefulInput} from 'baseui/input';
// import {Heading, HeadingLevel} from 'baseui/heading';
// import {HeadingLarge, HeadingMedium, HeadingSmall, HeadingXSmall, Paragraph3} from 'baseui/typography';
// import {
//   Display1,
//   Display2,
//   Display3,
//   Display4,
// } from 'baseui/typography';
// import "./index.css"
// import {
//   Card,
//   StyledBody,
//   StyledAction
// } from "baseui/card";
// import ArrowLeft from 'baseui/icon/arrow-left'
// import {  MdDelete } from 'react-icons/md';

// import { FileUploader } from "baseui/file-uploader";
// import WhatsappHeader from "./WhatsappHeader"
// import firebase from "firebase"
// import {RadioGroup, Radio} from 'baseui/radio';
// import { FormControl } from "baseui/form-control";
// import { ButtonGroup } from "baseui/button-group";
// import {Textarea} from 'baseui/textarea';
// import {Block} from 'baseui/block';
// import {useStyletron} from 'baseui';
// import {Alert} from 'baseui/icon';
// import Check from 'baseui/icon/check'
// import Delete from 'baseui/icon/delete'
// import { Avatar } from "baseui/avatar";
// const engine = new Styletron();

// function Negative() {
//   const [css, theme] = useStyletron();
//   return (
//     <div
//       className={css({
//         display: 'flex',
//         alignItems: 'center',
//         paddingRight: theme.sizing.scale500,
//         color: theme.colors.negative400,
//       })}
//     >
//       <Alert size="18px" />
//     </div>
//   );
// }


// export default function UploadProduct(props) {


 
//   const [name, setName] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [business, setBusiness] = React.useState();
//   const [selectedCategory, setSelectedCategory] = React.useState(null);
//   const [price, setPrice] = React.useState();
//   const [isValidPrice, setIsValidPrice] = React.useState(false);
//   const [isVisitedPrice, setIsVisitedPrice] = React.useState(false);
//   const showPriceError = !isValidPrice && isVisitedPrice && price 
//   const [businessUid, setBusinessUid] = React.useState(props.b_uid);
//   const [fileData, setFileData] = React.useState(null);
//   const [file, setFile] = React.useState(null);
//   const [uploading, setUploading] = React.useState(false);

//   let animationContainer =React.useRef();

//   useEffect(() => {
//     const anim = lottie.loadAnimation({
//       container: animationContainer.current,
//       renderer: 'svg',
//       loop: true,
//       autoplay: true,
//       // animationData: // local json file,
//       path: 'https://assets1.lottiefiles.com/packages/lf20_DVSwGQ.json',
//     });
//     //return () => anim.destroy(); // optional clean up for unmounting
//   }, [animationContainer]);

//   const onChangePrice = (value) => {
    
//     setIsValidPrice(!isNaN(value))
//     setPrice(value)

//   };

//   const navigationWhatsapp= () =>{
//     window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')
//   }

//   const pushData = ()=>{

    
//     var tag
//     selectedCategory == 0 ? tag = "Best Selling" : selectedCategory == 1 ? tag = "New Arrival" : tag = "Product Line"

//     if(name == "") return alert("Please provide name of product")
//     else if(selectedCategory == null) return alert("Please select one category")
//     else if(file == null ) return alert("Upload an image of product")
//     else if(showPriceError ) return alert("Enter a valid price")

//     setUploading(true)

//     setTimeout(navigationWhatsapp,2000)
    
//     const ref = firebase.storage().ref(`/images`);
//                       const uploadTask = ref.put(fileData);
//                       uploadTask.on("state_changed", console.log, console.error, () => {
                        
//                         ref
//                           .getDownloadURL()
//                           .then((url) => {
//                             setFile(null);
//                             firebase.firestore().collection("business_page").doc(businessUid).collection("products").add({"image" : url, "name" :name , "description" : description == "" ? false : description  , "price":price, "tag" :tag, "timestamp" : Date.now() })
                           
//                           });
//                       })
    
//   }


//   // useEffect=()=>{



//   // }

//       return (
//         <StyletronProvider value={engine}>
//         <BaseProvider theme={LightTheme}>


//           {uploading

//             ?<div><WhatsappHeader heading={"Thank You"} subheading={"We have added product details to your website"} ></WhatsappHeader>

//             <div  ref={animationContainer} />

//              <div style={{justifyContent:"center",display:"flex",alignItems:"center",position:"absolute",bottom:40, width:"100%" }}>
//                <Button onClick={()=> window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')} type="submit" size="large"  >Take me back to whatsapp</Button>
//                </div>

//             </div>
//             :
//         <div className='containerPage'>

//           <WhatsappHeader heading={"Add Product"} ></WhatsappHeader>
//           <div style={{padding:15, paddingTop:25, display: 'flex', justifyContent: "center", alignItems: 'center',fontFamily:"UberMoveBold"}}>
            
//           { file 
//                ?<Card  overrides={{Root: {style: {width: "100%"}}}}>
              
//                <FormControl
//                  label="Uploaded Image"
//                >
//                  <RadioGroup
//                  >
                   
//                  </RadioGroup>
//                </FormControl>

//                <img width='100%' height='200px' src={file} style={{borderRadius:4}} />

//                <Button onClick={()=>setFile(null)} type="submit" size="compact" style={{justifyContent:"center",marginBottom:0,marginTop:20,width:"100%"}} ><MdDelete size={25} /></Button>

              
//                </Card>
               
//                :<Card  overrides={{Root: {style: {width: "100%"}}}}>
              
//                 <FormControl
//                   label="Upload Image"
//                 >
//                   <RadioGroup
//                   >
                    
//                   </RadioGroup>
//                 </FormControl>
                
//                <FileUploader
//                     onDrop={(acceptedFiles, rejectedFiles) => {
//                       // handle file upload...
                     
//                       setFile(URL.createObjectURL(acceptedFiles[0]))
//                       setFileData(acceptedFiles[0])
                      
//                     }}
//                   />
                
                
//                 </Card>

//         }
//           </div>


//           <div style={{padding:20,paddingTop:10,}}>
//           <FormControl

//               label={() => "Name of product"}
//             >
//               <Input
//                 id="name"
//                   value={name}
//                   onChange={({target: {value}}) => setName(value)}
//                   clearable ={true}
//                   clearOnEscape
//               />
//             </FormControl>
//           </div>

//           <div style={{padding:20,marginTop:-25,}}>
//             <FormControl
//               label={() => "Price of product"}
//               caption={()=> "not mandatory"}
//               error={
//                 showPriceError
//                   ? 'Please enter a valid price'
//                   : null
//               }
//             >
//               <Input  id="price"
//                   value={price}
//                   onChange={ input => onChangePrice(input.target.value) }
//                   onBlur={() =>  setIsVisitedPrice(true) }
//                   error={showPriceError}
//                   />
//             </FormControl>
//           </div>
//           <div style={{padding:20,marginTop:-25,}}>
//             <FormControl
//               label={() => "Select one category"}
//             >
//               <ButtonGroup  mode={"radio"} size={"compact"} shape={""} 
//                     selected={selectedCategory}
//                     onClick={(event, index) => {
//                       setSelectedCategory(index);
//                     }} >
//                   <Button style={{marginTop:7.5,padding:12.5}}>Best Selling</Button>
//                   <Button style={{marginTop:7.5,padding:12.5}}>New Arrivals</Button>
//                   <Button style={{marginTop:7.5,padding:12.5}}>Product Line</Button>
//                 </ButtonGroup>
//             </FormControl>
//           </div>


//           <div style={{padding:20,marginTop:-25,}}>
//           <FormControl label="Product Description"   >
//               <Textarea
//                 id="textarea-id"
//                   value={description}
//                   onChange={({target: {value}}) => setDescription(value)}
//                   clearable ={true}
//                   clearOnEscape
//               />
//             </FormControl>
//           </div>

//           <footer style={{position:"absolute",bottom:20,padding:15,paddingTop:75, display: 'flex',  alignItems: 'center',}}>
            
//               <Button onClick={()=> pushData()} type="submit" size="compact" style={{justifyContent:"center",marginBottom:30,width:"80%"}} ><Check size={40}></Check></Button>
//                 <Block margin="scale300" />
//               <Button kind={"secondary"} type="submit" size='large' style={{justifyContent:"center",marginBottom:30,width:"20%"}}><Delete size={28} ></Delete></Button>
//           </footer>
          
//           </div>
//          }
//         </BaseProvider>
//       </StyletronProvider>
//       );
  

//   }


import React, { useEffect, createRef, useRef } from 'react';
import { Button } from "baseui/button";
import lottie from "lottie-web";
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { BsFillHandbagFill ,BsCreditCard2BackFill,BsHourglassSplit,BsPlusLg} from "react-icons/bs";
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
import { FaStoreAlt,FaMapMarkerAlt,FaClock ,FaArrowRight ,FaLongArrowAltRight,FaHandsHelping} from "react-icons/fa";
import { IoStorefrontSharp,IoDocumentTextSharp } from "react-icons/io5";
import { Accordion, Panel } from "baseui/accordion";
import ProductList from './ProductList';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {PaymentCard, valid} from 'baseui/payment-card';
import {MaskedInput} from 'baseui/input';
import { CgArrowLongRight } from "react-icons/cg";
import { VscAdd } from "react-icons/vsc";

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
import {Grid, Cell} from 'baseui/layout-grid';
import ArrowRight from 'baseui/icon/arrow-right'
import {  MdWavingHand } from 'react-icons/md';
import { FileUploader } from "baseui/file-uploader";
import firebase from "firebase"
import {RadioGroup, Radio} from 'baseui/radio';
import { FormControl } from "baseui/form-control";
import { ButtonGroup } from "baseui/button-group";
import {Textarea} from 'baseui/textarea';
import {Block} from 'baseui/block';
import {useStyletron} from 'baseui';
import {Alert} from 'baseui/icon';
import Check from 'baseui/icon/check'
import Delete from 'baseui/icon/delete'
import { Avatar } from "baseui/avatar";
import {FixedMarker} from 'baseui/map-marker';
import DeleteAlt from 'baseui/icon/delete-alt';
//import { Tabs, Tab } from "baseui/tabs";
import loaderAnimation from "../loader.json"
import {
    Tabs,
    Tab,
    StyledTabList,
    StyledTabPanel,
  } from 'baseui/tabs-motion';
  import Skeleton from 'react-loading-skeleton'
  import SkeletonTheme from 'react-loading-skeleton'
  import { Spinner } from "baseui/spinner";
  import moment from "moment"
  import 'react-loading-skeleton/dist/skeleton.css'
import { ContactSupportTwoTone } from '@material-ui/icons';
import UploadProduct from './UploadProduct';
  
const engine = new Styletron();



export default function Home(props) {

  var hours = new Date().getHours();
 
  const [name, setName] = React.useState( hours > 4 && hours <12 ?"Good Morning" : hours > 12 && hours <16 ? "Good Afternoon" : hours > 16 && hours <22 ?"Good Evening" : hours > 16 && hours <23 ?"Good Night" : hours > 0 && hours <4 ?"Good Night" :"Welcome"  );
  const [description, setDescription] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [price, setPrice] = React.useState();
  const [isValidPrice, setIsValidPrice] = React.useState(false);
  const [isVisitedPrice, setIsVisitedPrice] = React.useState(false);
  const showPriceError = !isValidPrice && isVisitedPrice && price 
  const [businessUid, setBusinessUid] = React.useState(props.b_uid);
  const [fileData, setFileData] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(0);
  const [imageSize, setImageSize] = React.useState(0);
  const [number, setNumber] = React.useState('');
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [code, setCode] = React.useState();
  let counterScrolled = 0;
  let animationContainer =React.useRef();
  const [imageLoadedHighlight, setImageLoadedHighlight]=React.useState(false);
  const [imageLoadedProductSection, setImageLoadedProductSection]=React.useState(false);

  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const [isOpenDrawerAdd, setIsOpenDrawerAdd] = React.useState(false);

  const [isOpenDrawerPayments, setIsOpenDrawerPayments] = React.useState(false);
  const [isOpenDrawerMaps, setIsOpenDrawerMaps] = React.useState(false);

  //const [activeKey, setActiveKey] = React.useState("0");
  const [activeKey, setActiveKey] = React.useState(0);
  const [css] = useStyletron();
  const [business, setBusiness] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [showLottie, setShowLottie] = React.useState(true);


  useEffect(() => {

    

    firebase.firestore().collection('business_page').doc(props.b_uid).onSnapshot(doc=>{

      setBusiness(doc.data())
      setName(doc.data().subdomain)
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



 
  const navigationWhatsapp= () =>{
    window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')
  }



  const pushData = ()=>{

    
    var tag
    selectedCategory == 0 ? tag = "Best Selling" : selectedCategory == 1 ? tag = "New Arrival" : tag = "Product Line"

    if(name == "") return alert("Please provide name of product")
    else if(selectedCategory == null) return alert("Please select one category")
    else if(file == null ) return alert("Upload an image of product")
    else if(showPriceError ) return alert("Enter a valid price")

    setUploading(true)

    setTimeout(navigationWhatsapp,2000)
    
    const ref = firebase.storage().ref(`/images`);
                      const uploadTask = ref.put(fileData);
                      uploadTask.on("state_changed", console.log, console.error, () => {
                        
                        ref
                          .getDownloadURL()
                          .then((url) => {
                            setFile(null);
                            firebase.firestore().collection("business_page").doc(businessUid).collection("products").add({"image" : url, "name" :name , "description" : description == "" ? false : description  , "price":price, "tag" :tag, "timestamp" : Date.now() })
                           
                          });
                      })
    
 }

 
  

  const onImgLoad=({target:img})=>{
    setImageSize(img.offsetHeight)
    setImageLoadedHighlight(true) 
}

  const handleScroll = (e) => {
     
      setScrolled(1)
     
 }

const turnOffLottie=()=>{
  setShowLottie(false)
}

const myStyle={
      height:'100vh',
      marginTop:'-70px',
      fontSize:'50px',
      width: "100%",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: "center",
        overflow: "scroll",
        overflowX:"hidden",
        backgroundColor:"#fff",
        objectFit: "cover"
    };

useEffect(() => {
  const img = new Image()
  img.src = business.image
  img.onload = () => {
    
    setBackgroundImage('url(' +business.image + ')') 
  }
}, [business.image])




 


      return (
        <StyletronProvider value={engine} style={{height:"100vh"}}>
        <BaseProvider theme={LightTheme} style={{height:"100vh"}}>

  

       <div className='containerPage' onScroll={handleScroll} id={"main"}>
          

            <div style={{marginTop:25,padding:15,marginBottom:150}}><ProductList b_uid={props.b_uid}/></div>
            
     
            <footer className={"footer0"} >
                        <h3 style={{color:"#fff", fontSize:30,alignSelf:"center",justifyContent:"center",display:"flex",fontFamily:"UberMoveBold",}}>{business.name || name }</h3>
                                                
                    </footer> 

     
        <Drawer
          isOpen={isOpenDrawerAdd}
          autoFocus={false}
          onClose={() => setIsOpenDrawerAdd(false)}
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
<UploadProduct />
                </div>
        </Drawer>

       


               <footer className={"footer3"} >

                            <div >

                                <h4  style={{color:"#000",fontSize:30,fontFamily:"UberMoveBold",marginTop:-3,marginBottom:0 }} >  Products  </h4>
                                <div  style={{ display: 'flex', justifyContent: "flex-start" ,alignSelf:"center",alignItems:"center",marginLeft:1.5}}>
                                    <p  style={{fontSize:15,color: "#262626"}}>Add/Delete any product from here</p>
                                  

                                </div>
                            </div>


                             <Button onClick={()=>window.open(`https://addproduct.prod.gq/b_uid=${props.b_uid}`)}
                            style={{paddingTop:10,paddingBottom:12.5,marginRight:10,paddingLeft:15,paddingRight:15}}><BsPlusLg size={17.5}/></Button>
    

                  
                    </footer> 
             



                    <div style={{position:"fixed",bottom:60,marginLeft:"16%"}}><FixedMarker
      label="Take me back to Whatsappp →"
      color="white"
      background="#048848"
      needle={"tall"} 
      
    /></div> 
           
       </div>



  

        </BaseProvider>
      </StyletronProvider>
      );
  

  }



              


              
