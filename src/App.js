//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Download from "./components/Download"
import {
  useHistory,
  //setLocation,
  Route,
  Link,Switch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  app:{
    display:"flex",
    flexDirection:"column",
    width:"80%",
    margin:"0 auto",
  },
  form:{
    display:"flex",
    flexDirection:"column",
  },
  Button:{
    marginTop:"8px",backgroundColor:"red",color:"#fff",
   '&:hover': {
    backgroundColor: 'transparent',
    color: 'red',
},

},
title:{
  color:"red",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  cursor:"pointer",
},
}));
function App() {
  const classes = useStyles();
  let history = useHistory();
// states 
 const[url, setUrl]=useState("")
// functions
const handleSubmit = ()=>{
  if(url ===""){
    alert("please enter a URL...")
  }else{
    history.push(`/download?url=${url}`)
    console.log("form submit")
}
  }
  
  const handleUrlChange = (e)=>{
    setUrl(e.target.value)
  }
  return (
    <div className={classes.app}>
      <div className={classes.title}>
        <YouTubeIcon style={{fontSize:"120px"}}/>
      <h1 style={{marginTop:0}}>YouTube video Downloader</h1>
      </div>
       
       <form className={classes.form} noValidate autoComplete="off">
         <TextField id="outlined-basic"  variant="outlined" label="Enter Youtube URL.." required onChange={handleUrlChange} value={url}/>
         <Button onClick={handleSubmit}variant="contained" color= "secondary" className={classes.Button}>
           Download
         </Button>
       </form>
       <Switch>
         <Route path="/download">
            <Download />
         </Route>
       </Switch>

    </div>
  );
}

export default App;
