import React, { useEffect, createRef, useRef } from 'react';
import { Button } from "baseui/button";
import lottie from "lottie-web";
import './index.css';
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
import { FaStoreAlt,FaMapMarkerAlt,FaClock ,FaArrowRight ,FaLongArrowAltRight,FaHandsHelping} from "react-icons/fa";
import { IoStorefrontSharp,IoDocumentTextSharp } from "react-icons/io5";
import { Accordion, Panel } from "baseui/accordion";
import Products from './Products';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {PaymentCard, valid} from 'baseui/payment-card';
import {MaskedInput} from 'baseui/input';
import { CgArrowLongRight } from "react-icons/cg";
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
import loaderAnimation from "./loader.json"
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
  
const engine = new Styletron();

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

function getFormOverrides(width) {
  return {
    ControlContainer: {
      style: {
        width,
        marginRight: '5px',
      },
    },
  };
}



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
  const [isOpenDrawerPayments, setIsOpenDrawerPayments] = React.useState(false);
  const [isOpenDrawerMaps, setIsOpenDrawerMaps] = React.useState(false);

  //const [activeKey, setActiveKey] = React.useState("0");
  const [activeKey, setActiveKey] = React.useState(0);
  const [css] = useStyletron();
  const [business, setBusiness] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [showLottie, setShowLottie] = React.useState(true);


  useEffect(() => {

    firebase.firestore().collection('business_page').where("subdomain","==",props.b_name).onSnapshot(querySnapshot => {
      var groups = [];

      querySnapshot.forEach(documentSnapshot => {

        groups.push({
          ...documentSnapshot.data(),
          uid : documentSnapshot.id
        });

    
      });

      setBusiness(groups[0])
      setName(groups[0].name)

      console.log("business_uid data : " + groups[0].image)
      var b_uid = groups[0].uid


      firebase.firestore().collection("business_page").doc(b_uid).collection("products").onSnapshot(querySnapshot => {
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
      
    })

  }, []);


  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loaderAnimation,
      //path : "https://assets1.lottiefiles.com/datafiles/AX286g9fHnxZQVr/data.json"
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, [animationContainer]);

 
  const navigationWhatsapp= () =>{
    window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')
  }



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
    
//  }

 
  

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
           <section className='onePage'  >
           {<img style={myStyle} src={business.image} onLoad={()=>setShowLottie(false)}></img> }
            {showLottie && <div style={{marginTop:-100,marginLeft:-400}} ref={animationContainer}></div> }
                
           </section>
           <section style={{scrollSnapAlign:"start", height: `${95+imageSize/10 }vh`, backgroundColor:"#fff",display:"flex" }}>



           
            <div style={{width:"85%",marginLeft:"7.5%",marginTop:85}}>

            <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }}
      activateOnFocus
     
    >
      <Tab title="Notifications"  overrides={{
        Tab: {
          style: ({ $isActive,$theme }) => ({
            fontFamily: $isActive ? "UberMoveBold" : "UberMoveMedium",
            color: $isActive ? "#276EF1" : "#000",
            width:"33.3%"
          })
        }
      }}><div className='cardDotted'>
                           <div  style={{ display: 'flex', justifyContent: "flex-start" ,alignSelf:"center",alignItems:"center",marginLeft:1.5,marginBottom:-5}}>
                                    <p  style={{color: "#276EF1"}}>{moment(business.h_timestamp).fromNow()}</p>
                                    <p  style={{marginLeft:5,marginRight:5}} color={"#000"} >  •  </p>
                                    <p   style={{color: "#276EF1"}}>{business.h_tag}</p>

                                </div>
                           <img width='100%' height="auto" src={business.h_image} style={{borderRadius:4}} onLoad={ onImgLoad }   />
                          {!imageLoadedHighlight && ( <div style={{marginTop:-30,}}><SkeletonTheme  baseColor="#eee" highlightColor="#fff" height={"250px"} duration={0.75}   /></div> )}
                           <h2 style={{marginTop:"15px",marginBottom:"5px",color:"#000"}}  >{business.h_title}</h2>

                           <p style={{color:"#000",marginLeft:2}}>{business.h_about}</p>
                               <Button onClick={()=>window.open(`whatsapp://send?text=Hello ${business.name}, ${'\n'}Just visited your website, wanted to know more about ${business.h_title} : ${business.h_about}.&phone=91${business.whatsapp}`,"_self")} kind='primary'  style={{width: '100%',marginTop:25,backgroundColor:"#276EF1"}}>
                               <p style={{color:"#fff",fontSize:20,marginTop:0,marginBottom:0}}>Learn More</p>

                               </Button>
                       </div></Tab>
      <Tab title="Offers" overrides={{
        Tab: {
          style: ({ $isActive,$theme }) => ({
            fontFamily: $isActive ? "UberMoveBold" : "UberMoveMedium",
            color: $isActive ? "#276EF1" : "#000",
            width:"33.3%"
          })
        }
      }}>
<div className='cardDotted'>
                          
                           <img width='100%' height="auto" src={"https://www.zambo.in/assets/offers.gif"} style={{borderRadius:4}} onLoad={ onImgLoad }   />
                          {!imageLoadedHighlight && ( <div style={{marginTop:-30,}}><SkeletonTheme  baseColor="#eee" highlightColor="#fff" height={"250px"} duration={0.75}   /></div> )}
                           <h2 style={{marginTop:"15px",marginBottom:"5px",color:"#000"}}  >WhatsApp Us</h2>

                           <p style={{color:"#000",marginLeft:2}}>We have something on everthing for everyone. Mic Drop !!</p>

                               <Button kind='primary'  style={{width: '100%',marginTop:25,backgroundColor:"#276EF1"}}>
                               <p style={{color:"#fff",fontSize:20,marginTop:0,marginBottom:0}}><MdWavingHand size={30} /></p>

                               </Button>
                       </div>

      </Tab>

      { products.length==0

      ? null

      :

      <Tab title="Products" overrides={{
        Tab: {
          style: ({ $isActive,$theme }) => ({
            fontFamily: $isActive ? "UberMoveBold" : "UberMoveMedium",
            color: $isActive ? "#276EF1" : "#000",
            width:"33.3%"
          })
        }
      }}>

      <div >
                           
            <div style={{width:"100%",marginTop:20}}>
            <FlexGrid
      flexGridColumnCount={2}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
      
    >{products.map((item,index) => index<4 &&  <FlexGridItem onClick={()=>{
   
    }} ><div  className={ imageLoadedProductSection ? 'cardDottedProduct' :  'cardDottedProduct'}>
                             
    <img width='100%' height="auto" src={item.image } style={{borderRadius:4}} onLoad={()=> setImageLoadedProductSection (true)} />
    {!imageLoadedProductSection  && (
             
             <div style={{marginTop:-25}} >
               {/* <Spinner color='#000' size="30px" style={{margin:"43%"}}/> */}
               <SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"125px"} duration={0.75}   />
               <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"20px"} duration={0.75}  /></div>
             </div>
   
           )}
   
     { !imageLoadedProductSection  ?null:<h3 style={{marginTop:"10px",marginBottom:"0px",color:"#000",fontSize:16}}  >{item.name || <div style={{ marginTop:10}}><SkeletonTheme baseColor="#eee" highlightColor="#fff" height={"10px"} duration={0.75}  /></div>}</h3>
   }
                </div></FlexGridItem>
                
                )}


            </FlexGrid>
        </div>
                               <Button onClick={()=> setIsOpenDrawer(true)} kind='primary' size='mini'  style={{width: '100%',marginTop:40,backgroundColor:"#000"}}>
                               <p style={{color:"#fff",fontSize:20,paddingTop:10,paddingBottom:-5}}>View All Products</p>
                               </Button>
                       </div>



      </Tab>

  }
    </Tabs>
                       
                </div>  
                
           </section>
          <section className='threePage'>

              

          <div style={{marginTop:120,marginLeft:15,marginRight:15,width:"90%"}}>
        

          <Accordion>

          <Panel
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <BsHourglassSplit style={{marginRight:15}}  size={19}/>
          Founded
        </div>
      }
      >
        <p style={{color:"#276EF1",fontSize:20,width:"100%"}}>{business.year}</p>
      </Panel>

      <Panel
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <IoDocumentTextSharp style={{marginRight:15}}  size={19}/>
          Overview
        </div>
      }
      >
        <p style={{color:"#276EF1",fontSize:20,width:"100%"}}>
        <div  style={{ display: 'flex', justifyContent: "flex-start" ,alignSelf:"center",alignItems:"center"}}>
                                    <p  style={{color: "#276EF1"}}>{business.category}</p>
                                    <p  style={{marginLeft:5,marginRight:5}} color={"#00276EF10"} >  •  </p>
                                    <p   style={{color: "#276EF1"}}>{business.type}</p>

                                </div>
          {business.description}</p>
      </Panel>

      
      <Panel onClick={()=>setIsOpenDrawerMaps(true)} 
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <IoStorefrontSharp style={{marginRight:15}}  size={19}/>
          Address
        </div>
      }
      >
        <p style={{color:"#276EF1",fontSize:20,width:"100%"}}>{business.address}</p>
        <div onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${business.address}&dir_action=navigate`,"_self")} className={css({display: 'flex'})}>

        
          <Button onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${business.address}&dir_action=navigate`,"_self")} 
                  style={{marginTop:20,width:"100%",}}><h2 style={{color:"#fff",fontSize:25,marginBottom:-2 }} >Navigate</h2></Button>



          </div>
      </Panel>
      <Panel onClick={()=>setIsOpenDrawer(true)} 
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <BsFillHandbagFill style={{marginRight:15}}  size={19}/>
          Products
        </div>
      }
      >
        <Button onClick={()=> setIsOpenDrawer(true)} kind='primary' size='mini'  style={{width: '100%',marginTop:10,backgroundColor:"#000"}}>
                               <CgArrowLongRight style={{margin:10}} size={25} />
                               </Button>
      </Panel>
      <Panel
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <FaClock style={{marginRight:15}}  size={18}/>
          Timings
        </div>
      }
      >
        { business.closed === "No Holiday" ?
        <p style={{color:"#276EF1",fontSize:20,width:"100%"}}>Open everyday  </p>
        : <p style={{color:"#276EF1",fontSize:20,width:"100%"}}> open everyday except {business.closed} </p>
    }
      </Panel>
      <Panel 
       title={
        <div style={{display: 'flex', alignItems: 'center',justifyContent:"center", fontSize:25,fontFamily:"UberMoveMedium",color:"#262626"}} >
          <RiCellphoneFill style={{marginRight:15}}  size={19}/>
          Contact Us
        </div>
      }
      >
      <p onClick={()=>window.open(`tel:${business.phone}`,"_self")} style={{color:"#276EF1",fontSize:20,width:"100%"}}>{business.phone}</p>

      </Panel>

     



    </Accordion>


          </div>
    

                    
           </section> 

           {scrolled === 0?  <footer className={"footer0"} >
                        <h3 style={{color:"#fff", fontSize:30,alignSelf:"center",justifyContent:"center",display:"flex",fontFamily:"UberMoveBold"}}>{business.name || name }</h3>
                                                
                    </footer> 
                    : null}
        
                     {scrolled === 1?
                <footer className={"footer2"} >


                        <Button onClick={()=>window.open(`tel:${business.phone}`,"_self")} shape="default" style={{margin:7.5,padding:12.5,paddingLeft:"15%",paddingRight:"15%"}}><RiPhoneFill size ={25}/></Button>
                        <Button onClick={()=>window.open(`whatsapp://send?text=Hello, ${'\n'}Just visited your business website, wanted to know more.&phone=91${business.whatsapp}`,"_self")} kind="secondary" style={{margin:7.5,padding:12.5,paddingLeft:"4%",paddingRight:"4%"}}><RiWhatsappFill color={"#048848"} size={25}/></Button>
                        <Button onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${business.address}&dir_action=navigate`,"_self")} kind="secondary" style={{margin:7.5,padding:12.5,paddingLeft:"4%",paddingRight:"4%"}}><RiMapPin2Fill color={"#E11900"} size={25}/></Button>
                        <Button onClick={() => setIsOpenDrawerPayments(true)} kind="secondary" style={{margin:7.5,padding:12.5,paddingLeft:"4%",paddingRight:"4%"}}><BsCreditCard2BackFill color={"#276EF1"} size={25}/></Button>

                </footer> :null}
                <Drawer
                    isOpen={isOpenDrawerPayments}
                    autoFocus
                    onClose={() => setIsOpenDrawerPayments(false)}
                    anchor={"bottom"}
                    size='auto'
                  >
                    <div className={css({display: 'flex'})}>

                    <p  style={{color:"#000",fontSize:30,marginTop:1,marginBottom:25 }} >  Credits  </p>
                    <h4  style={{color:"#007aff",fontSize:17,fontFamily:"UberMoveBold",marginTop:-10,marginBottom:10,marginLeft:2,width:"100%" }} >  website created using w2www chatbot on WhatsApp </h4>

                    <img width='200px' height="200px" style={{marginLeft:"20%"}}
                    src={"https://www.itsitio.com/wp-content/uploads/2019/10/WSPPR_Ecommerce.gif"}  />

                    <Button onClick={()=>window.open(`whatsapp://send?text=Hello, ${'\n'}Just visited your business website, wanted to know more.&phone=91${business.whatsapp}`,"_self")} 
                            style={{marginTop:20,width:"100%",}}><h2 style={{color:"#fff",fontSize:25,marginBottom:-2 }} >Get   Started</h2></Button>

  

    </div>
                  </Drawer>

                  <Drawer
                    isOpen={isOpenDrawerMaps}
                    autoFocus
                    onClose={() => setIsOpenDrawerMaps(false)}
                    anchor={"right"}
                    size='auto'
                    width="40%"
                    overrides={{
                      DrawerContainer: {
                        style: ({ $theme }) => ({
                          outline: `#000 solid 1px`,
                          backgroundColor:"#eee",
                          width:"60%",
                        })
                      }
                  }}
                  >
                    <div className={css({display: 'flex'})}>

                    <footer className={"footer4"} >
                        <h4  style={{color:"#fff",fontSize:30,fontFamily:"UberMoveBold"}} >  Address  </h4>
                    </footer>
                    <h4  style={{color:"#007aff",fontSize:20,fontFamily:"UberMoveBold",marginTop:50,marginBottom:10,width:"100%" }} >  {business.address} </h4>

        
                      <img width='200%' height="auto" style={{marginLeft:"-62%",position:"absolute",bottom:70}}
                      src={"https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/4HW2Q7VU7BHJNIQLQ5KZSCFCZM.gif"}  />

                      <Button onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${business.address}&dir_action=navigate`,"_self")} 
                              style={{marginTop:20,width:"75%",position:"absolute",bottom:25}}><h2 style={{color:"#fff",fontSize:25,marginBottom:-2 }} >Navigate</h2></Button>



                 
  

    </div>
                  </Drawer>

                {scrolled === 1?  <footer className={"footer3"} >

                            <div >

                                <h4  style={{color:"#000",fontSize:30,fontFamily:"UberMoveBold",marginTop:-3,marginBottom:-0.5 }} >  {business.name}  </h4>
                                <div  style={{ display: 'flex', justifyContent: "flex-start" ,alignSelf:"center",alignItems:"center",marginLeft:1.5}}>
                                    <p  style={{color: "#555",fontSize:15}}>{business.category}</p>
                                    <p  style={{marginLeft:5,marginRight:5}} color={"#000"} >  •  </p>
                                    <p   style={{color: "#555",fontSize:15}}>{business.type}</p>

                                </div>
                            </div>


                            <Button  onClick={() => setIsOpenDrawer(true)} 
                            style={{paddingTop:10,paddingBottom:12.5,marginRight:10,paddingLeft:15,paddingRight:15}}><BsFillHandbagFill size={30}/></Button>

                                <Drawer
                                    
                                    onClose={() => setIsOpenDrawer(false)}
                                    isOpen={isOpenDrawer}
                                    overrides={{
                                      DrawerContainer: {
                                        style: ({ $theme }) => ({
                                          outline: `#000 solid 1px`,
                                          backgroundColor:"#eee",
                                          width:"60%",
                                        })
                                      }
                                  }}
                                >
                                <Products b_uid={business.uid}/>
                                </Drawer>



                  
                    </footer> 
                    : null}


{ scrolled === 1? 
                    <div style={{position:"fixed",bottom:70,marginLeft:"35%"}}><FixedMarker
      label="WhatsApp Us"
      color="white"
      background="#048848"
      needle={"tall"} 
      
    /></div> :null}
           
       </div>



  

        </BaseProvider>
      </StyletronProvider>
      );
  

  }



              
