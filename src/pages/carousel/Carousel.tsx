import {useId} from 'react';


interface CarouselProps {
  
  images: { src: string; alt: string }[];
 
}

const Carousel: React.FC<CarouselProps> = ({ images}) => {

  const uniqueId = useId();

  return (
    <div id={uniqueId} className="carousel slide h-50  mt-100 " data-ride="carousel"
   >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            key={index}
          >
            <img className="d-block w-100 " src={image.src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href={`#${uniqueId}`}
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href={`#${uniqueId}`}
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
