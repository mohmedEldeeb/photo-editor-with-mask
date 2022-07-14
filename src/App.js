import { PhotoEditor } from "./pages";
import { ImageName } from "./pages/context-image";
import butterfly from "./assets/butterfly.svg"
import splash from "./assets/splash.jpg"
import { useState } from "react";
function App() {
  const [image ,setImage] =useState(splash)
  const value ={ image , setImage }
  return (
    <ImageName.Provider value={value}>

      <PhotoEditor />
    </ImageName.Provider>
    
    );
}

export default App;
