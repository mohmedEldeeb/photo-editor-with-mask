import React from 'react'
import Carousel from 'react-multi-carousel';
import butterfly from "../assets/butterfly.svg"
import 'react-multi-carousel/lib/styles.css';
import { ImageName } from './context-image';
import assets  from "../assets/splash.jpg"

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
class WithScrollbar extends React.Component {
  static contextType = ImageName
  constructor(props){
    super(props)
    this.state = { additionalTransfrom: 0 ,image:assets};
  }
    
    setImage=(img)=>{
      this.setState({...this.state,image:img})
      console.log(this.context)
      this.context.setImage(img)
    }
    render() {
      return (
        <Carousel
          ssr={false}
          ref={el => (this.Carousel = el)}
          partialVisbile={false}
          itemClass="slider-image-item"
          responsive={responsive}
          containerClass="carousel-container-with-scrollbar"
          additionalTransfrom={-this.state.additionalTransfrom}
          beforeChange={nextSlide => {
            if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
              this.setState({ additionalTransfrom: 150 });
            }
            if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
              this.setState({ additionalTransfrom: 0 });
            }
          }}
        >
          <div key="2" onClick={()=>this.setImage(butterfly)}  className="image-container increase-size">
            <img
              draggable={false}
              style={{ width: "100%", cursor: "pointer" }}
              src={butterfly}
            />
          </div>
          <div key="1" onClick={()=>this.setImage(assets)} className="increase-size">
            <img
              draggable={false}
              style={{ width: "100%", cursor: "pointer" }}
              src={assets}
            />
          </div>
          <div key="20" onClick={()=>this.setImage(butterfly)} className="image-container increase-size">
            <img
              draggable={false}
              style={{ width: "100%", cursor: "pointer" }}
              src={butterfly}
            />
          </div>
          <div key="10" onClick={()=>this.setImage(assets)} className="increase-size">
            <img
              draggable={false}
              style={{ width: "100%", cursor: "pointer" }}
              src={assets}
            />
          </div>
        </Carousel>
      );
    }
  }
  
  export default WithScrollbar;