import React, { useEffect, createRef } from 'react';
import { Button } from "baseui/button";
import lottie from "lottie-web";
import { Input } from "baseui/input";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';
import {Heading, HeadingLevel} from 'baseui/heading';
import {HeadingLarge, HeadingMedium, HeadingSmall, HeadingXSmall, Paragraph3} from 'baseui/typography';
import {
  Display1,
  Display2,
  Display3,
  Display4,
} from 'baseui/typography';
import "./index.css"
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import ArrowLeft from 'baseui/icon/arrow-left'
import {  MdDelete } from 'react-icons/md';
import {  VscCheck,VscChromeClose } from 'react-icons/vsc';

import { FileUploader } from "baseui/file-uploader";
import BackHeader from "./BackHeader"
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


export default function Update(props) {


 
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [business, setBusiness] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [price, setPrice] = React.useState();
  const [isValidPrice, setIsValidPrice] = React.useState(false);
  const [isVisitedPrice, setIsVisitedPrice] = React.useState(false);
  const showPriceError = !isValidPrice && isVisitedPrice && price 
  const [businessUid, setBusinessUid] = React.useState(props.b_uid);
  const [fileData, setFileData] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  let animationContainer =React.useRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // animationData: // local json file,
      path: 'https://assets1.lottiefiles.com/packages/lf20_DVSwGQ.json',
    });
    //return () => anim.destroy(); // optional clean up for unmounting
  }, [animationContainer]);

  const onChangePrice = (value) => {
    
    setIsValidPrice(!isNaN(value))
    setPrice(value)

  };

  const navigationWhatsapp= () =>{
    window.open('whatsapp://send?text=Join stage-stream&phone=14155238886' , '_self')
  }

  const pushData = ()=>{

    
    var tag
    selectedCategory == 0 ? tag = "General Update" : selectedCategory == 1 ? tag = "New Arrival" : tag = "Limited Time Activity"

    if(name == "") return alert("Please provide title to the update")
    else if(selectedCategory == null) return alert("Please select one category")
    else if(file == null ) return alert("Upload an image")
    else if( description== "" ) return alert("Enter a valid price")

    setUploading(true)

    setTimeout(navigationWhatsapp,2000)
    
    const ref = firebase.storage().ref(`/images`);
                      const uploadTask = ref.put(fileData);
                      uploadTask.on("state_changed", console.log, console.error, () => {
                        
                        ref
                          .getDownloadURL()
                          .then((url) => {
                            setFile(null);
                            firebase.firestore().collection("business_page").doc(businessUid).update({"h_image" : url, "h_title" :name , "h_about" :  description  ,  "h_tag" :tag, "h_timestamp" : Date.now() }).then(
                            firebase.firestore().collection("business_page").doc(businessUid).collection("updates").add({"image" : url, "title" :name , "about" :  description  ,  "tag" :tag, "timestamp" : Date.now() }) )
                           
                          });
                      })
    
  }


  // useEffect=()=>{



  // }

      return (
        <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>


          {uploading

            ?<div><BackHeader  b_uid={props.b_uid} heading={"Thank You"} subheading={"We have added the new update details to your website"} ></BackHeader>

            <div  ref={animationContainer} />

             <div style={{justifyContent:"center",display:"flex",alignItems:"center",position:"absolute",bottom:40, width:"100%" }}>
               <Button style={{backgroundColor:"#048848"}} onClick={()=> window.open(`whatsapp://send?text=Hello, I just added a new product to my website.&phone=91${business.whatsapp}` , '_self')} type="submit" size="large"  ><h4 style={{fontSize:20}}>Take me back to WhatsApp</h4></Button>
               </div>

            </div>
            :
        <div >

          <BackHeader heading={"Add update"} b_uid={props.b_uid} ></BackHeader>
          <div style={{padding:15, paddingTop:25, display: 'flex', justifyContent: "center", alignItems: 'center',}}>
            
          { file 
               ?<Card  overrides={{Root: {style: {width: "100%"}}}}>
              
               <FormControl
                  
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }}
                 label="Uploaded Image"
               >
                 <RadioGroup
                 >
                   
                 </RadioGroup>
               </FormControl>

               <img width='100%' height='200px' src={file} style={{borderRadius:4}} />

               <Button onClick={()=>setFile(null)} type="submit" size="compact" style={{justifyContent:"center",marginBottom:0,marginTop:20,width:"100%"}} ><MdDelete size={25} /></Button>

              
               </Card>
               
               :<Card  overrides={{Root: {style: {width: "100%"}}}}>
              
                <FormControl
                  
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }}
                  
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }}
                    label="Upload Image"
                >
                  <RadioGroup
                  >
                    
                  </RadioGroup>
                </FormControl>
                
               <FileUploader
                    onDrop={(acceptedFiles, rejectedFiles) => {
                      // handle file upload...
                     
                      setFile(URL.createObjectURL(acceptedFiles[0]))
                      setFileData(acceptedFiles[0])
                      
                    }}
                  />
                
                
                </Card>

        }
          </div>


          <div style={{padding:20,paddingTop:10,}}>
          <FormControl
                  
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }}

              label={() => "Title"}
            >
              <Input
                id="name"
                  value={name}
                  onChange={({target: {value}}) => setName(value)}
                  clearable ={true}
                  clearOnEscape
              />
            </FormControl>
          </div>

          <div style={{padding:20,marginTop:-25,}}>
          <FormControl   
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }} label="Description"   >
              <Textarea
                id="textarea-id"
                  value={description}
                  onChange={({target: {value}}) => setDescription(value)}
                  clearable ={true}
                  clearOnEscape
              />
            </FormControl>
          </div>

        
          <div style={{padding:20,marginTop:-25,}}>
            <FormControl
                  
                   overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          fontFamily:"UberMoveBold",
                          color:"#276EF1"
                        })
                      }
                    }}
              label={() => "Select one tag"}
            >
              <ButtonGroup  mode={"radio"} size={"compact"} shape={""} 
                    selected={selectedCategory}
                    onClick={(event, index) => {
                      setSelectedCategory(index);
                    }} >
                  <Button style={{marginTop:7.5,padding:12.5}}>General Update</Button>
                  <Button style={{marginTop:7.5,padding:12.5}}>New Arrival</Button>
                  <Button style={{marginTop:7.5,padding:12.5}}>Limited Time Activity</Button>
                </ButtonGroup>
            </FormControl>
          </div>


          

          <footer className='footer5'>
            
            <Button onClick={()=> pushData()} type="submit"  style={{marginTop:5,marginLeft:15,width:"60%",marginRight:15,height:60}} ><VscCheck size={30}></VscCheck></Button>
            <Button onClick={()=> pushData()} type="submit" kind={"secondary"}  style={{marginTop:5,marginLeft:15,width:"20%",marginRight:15,height:60,padding:15}} ><VscChromeClose size={20}></VscChromeClose></Button>

        </footer>
         
          
          </div>
          
         }
        </BaseProvider>
      </StyletronProvider>
      );
  

  }



              
