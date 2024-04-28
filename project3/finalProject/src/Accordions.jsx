import AccordionList from "./data/AccordionList";
import React, {useState} from "react";
import './Accordions.css';

function Accordions({className}){

    const [showAccordion, setShowAccordion] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    const Accordionlist = AccordionList.map( (item,idx) =>{
        return(
            <li className="Accordion__item" key={idx}>
                <div className="Accordion__title__area" onClick={() => handleAccordionClick(idx)}>
                {/* setShowAccordion(!showAccordion) */}
                    <h3 className="Accordion__h3__title">
                    {item.title}
                    </h3>
                    <div className="Accordion__arrow" aria-label={showAccordion ? '-' : '+'}>{showAccordion ? '-' : '+'}</div>
                </div>
                {idx === activeIndex && <div className="Accordion__content">
                    <p>{item.content1}</p>
                    <p>{item.content2}</p>
                    <p>{item.content3}</p>
                    <p>{item.content4}</p>
                </div>}
            </li>
            
        );
    });

    return(
        <ul className={className}>
            {Accordionlist}
        </ul>
    );
}

export default Accordions;