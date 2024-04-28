import Accordions from "./Accordions";
import './About.css';
import CarouselImage from "./CarouselImage";
import About_logo_image from "../images/711701507384_pic.jpg";
import About_carousel_img1 from '../images/kerde-severin-NVD_32BBZFE-unsplash.jpg';
import About_carousel_img2 from '../images/sam-pak-X6QffKLwyoQ-unsplash.jpg';
import About_carousel_img3 from '../images/ahmad-mohammed-wGc4AQ3BJ_U-unsplash.jpg';

function About({setPage}) {

    const images = [
        About_carousel_img1,
        About_carousel_img2,
        About_carousel_img3,
      ];

    const image_alt =[
        'The PlayStation 5 consoles image from https://unsplash.com/photos/black-and-white-xbox-one-game-controller-NVD_32BBZFE',
        'The Xbox consoles image from https://unsplash.com/photos/person-holding-black-game-controller-X6QffKLwyoQ',
        'The Switch Controller image from https://unsplash.com/photos/rocket-league-game-on-nintendo-switch-wGc4AQ3BJ_U',
    ];

    return (
        <div className="About_main_content">
            <CarouselImage className="carousel__container" images={images} alt={image_alt}/>
            <div className="About_left_side">
                <img
                    src={About_logo_image}
                    className="about__image"
                    alt="The about page image which is my personally own picture for my undergraduate university(711701507384_pic.jpg)"
                />
                <h2 className="about_h2_title">Our Company</h2>
                <p className="about__description">
                    We have many games, here  is the ultimate destination for playing and discussing games.
                </p>
                <p className="about_QA">
                    Q&A:
                </p>
                <Accordions className="Accordion__list"/>
            </div>
        </div>
    );
}

export default About;