import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import usePanZoom from "use-pan-and-zoom";
import { useScreenshot , createFileName} from 'use-react-screenshot'

import "../styles/photo-editor.scss";
  
const PhotoEditor = () => {
  const [initWidth,setInitWidth]=useState(100)
  const [initHeight,setInitHeight]=useState(100)
  const [ ifImage,setifImage ] =useState(false)
  const [minX, setMinX] = useState()
  const [minY, setMinY] = useState()
  const [maxX, setMaxX] = useState()
  const [maxY, setMaxY] = useState()
  const [ valueRotate ,setValueRoteat ]=useState(0)
  const [ valueScaleX , setValueScaleX ]=useState(1)
  const [ valueScaleY , setValueScaleY ]=useState(1)
  
  const { transform, panZoomHandlers,pan,zoom,container, setContainer } = usePanZoom({
    enableZoom:false,
    minX, 
    maxX ,
    minY,
    maxY,
  });
  const imageRef=useRef()
  const screenShotRef=useRef()
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  })
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const getImage = () => takeScreenshot(screenShotRef.current).then(download)
  useEffect(()=>{
    console.log("contenar",container,pan)
    if(ifImage){
      let imgWidth=imageRef.current.getBoundingClientRect().width;
      let imageHeight=imageRef.current.getBoundingClientRect().height;
      let containerWidth=container.offsetWidth;
      console.log("width",imgWidth,containerWidth)
      
      if(initWidth == 100){
        setMinX(- (((imgWidth /  100 ) * 15)))
        setMaxX((((imgWidth /  100 ) * 15) ))
        setMinY(0)
        setMaxY(0)
      }else {
        setMinX(- (((containerWidth /  100 ) * 15) + (imgWidth*.5)) )
        setMaxX((- (((containerWidth /  100 ) * 15) + (imgWidth*.5))) +containerWidth )
        setMinY(- ( imageHeight * .5))
        setMaxY(0)
      }

      console.log((((containerWidth /  100 ) * 15) + (imgWidth*.25)))
    }
  },[pan])

  
  const onDrop = useCallback((droppedFiles) => {
    //
    setifImage(true)
    return droppedFiles
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      accept: "image/*",
    });

  const selectedImage = acceptedFiles.length > 0 && (
    <img
      ref={imageRef}
      style={{width:`${initWidth}%`,height:`${initHeight}%`,transform:`rotate(${valueRotate}deg) scaleX(${valueScaleX}) scaleY(${valueScaleY}`}}
      alt={acceptedFiles[0].name}
      key={acceptedFiles[0].path}
      src={URL.createObjectURL(acceptedFiles[0])}
    />
  );
  const ZoomInOrZoomOut=()=>{
    if(initWidth == 100 ){
      setInitWidth(200)
      setInitHeight(200)
    }else {
      setInitWidth(100)
      setInitHeight(100)
    }
  }
  const handleValueRotate=()=>{
    
    if(valueRotate == 0){
      setValueRoteat(90)
    }else if (valueRotate == 90){
      setValueRoteat(180)
    }else if( valueRotate == 180){
      setValueRoteat(270)
    }else {
      setValueRoteat(0)
    }
    console.log(valueRotate)
  }
  const changeScaleX=()=>{
    setValueScaleX(- valueScaleX)
  }
  const changeScaleY=()=>{
    setValueScaleY(- valueScaleY)
  }
  return (
    <div className="App">
      <div className="photo-editor">
        <div ref={screenShotRef} className="photo-viewer">
          <div
            className="image-outer-container"
            ref={(el) => setContainer(el)}
            {...panZoomHandlers}
          >
            <button className="image-screenshot btn" onClick={getImage} >download image</button>
            <div className="image-inner-container" style={{ transform }}>
              {selectedImage}
            </div>

          </div>
        </div>
        <div className="drop-zone" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text">
            {isDragActive ? (
              <p>Drop the images here</p>
            ) : (
              <div>
                <i className="n-icon n-icon-upload"></i>
                <p>Drag &amp; Drop or click to select an image</p>
              </div>
            )}
          </div>
        </div>
          <div>
            <button className="btn" onClick={ZoomInOrZoomOut}>Zoom in &amp; Zoom out</button>
          </div>
          <div className="buttonEdidor">
            <button key="1" className="btn" onClick={handleValueRotate}>Rotate </button>
            <button key="2" className="btn" onClick={changeScaleX}>scaleX</button>
            <button key="3" className="btn" onClick={changeScaleY}>scaleY</button>
          </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
