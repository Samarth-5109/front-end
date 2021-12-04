import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {useLocation }from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    downloadPage:{
      display:"flex",
      flexDirection:"column",
      width:"80%",
      margin:"0 auto",
    },
    
  }));

  function useQuery(){
      return new URLSearchParams(useLocation().search);
  }
export default function Download(){
    const classes = useStyles();
    let query = useQuery();

    //states
    const [title, setTitle]=useState("loading")
    const [url, setUrl] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [formats, setFormats] = useState("")
    const [audioFormats, setAudioFormats] = useState("")

    //effect
    useEffect(()=>{
        setUrl(query.get("url"))
        axios.get(`http://localhost:4000/video?videoId=${query.get("url")}`)
        .then(res=>{
            //console.log(res.data)
            setTitle(res.data.videoDetails.title)
            setThumbnail(res.data.videoDetails.thumbnails[0].url)
            setFormats(res.data.formats)
        })

        axios.get(`http://localhost:4000/audio?videoId=${query.get("url")}`)
        .then(res=>{
            setAudioFormats(res.data)
        })
    },[query.get("url")])

    //functions 
    const downloadFile = (itag, type) =>{
        console.log(itag,type)
        window.open(`http://localhost:4000/download?title=${title}&videoId=${url}&type=${type ? "mp4":"mp3 "}&itag=${itag}`)
    }
    return(
        <div className={classes.downloadPage}>
            <div className={classes.VideoPlayer}>
              <img src={thumbnail} style={{width:"80%"}} />
            </div>
            <h1>{title}</h1>
            <p>Video</p>
            <div className={classes.DownloadSection}>
                {formats && formats.map(format =>(
                   format.qualityLabel === null? "": format.hasAudio === true ?<Chip label={format.qualityLabel} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} color="primary"  style={{margin:"0px 7px 7px 0px", cursor:"pointer"}}/> :null
                ))}   
            </div>
            <p>Audio</p>
                <div className={classes.DownloadSection}>
                <div className={classes.DownloadSection}>
                {audioFormats && audioFormats.map(format =>(
                    <Chip label={"Audio/mp3"} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} color="secondary"  style={{margin:"0px 7px 7px 0px", cursor:"pointer"}}/>
                ))}   
            </div>
            </div>

            </div>
    )
}