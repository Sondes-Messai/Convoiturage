import React, { useState } from "react";
import { ArrowIcon } from "../../assets/icons/Icons";

function DropDownInputVariant(props){

    const [isOpen, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (name ,value) => {
        props.passValue(name, value);
      };

    return (
        <React.Fragment >
            < div className="flex flex-col">
        <label htmlFor={props.name} className="text-grey-afpa text-xs ml-3">{props.label} </label>
        <div className="rounded-3xl p-2 bg-grey-afpa-light relative mt-2">
            <div className="px-1 py-1  flex justify-between items-center cursor-pointer test" onClick={() => {setOpen(!isOpen)}}>
                <span className="text-[15px] text-grey-afpa">{inputValue}</span>
                <button type="button" className="focus:outline-none focus:shadow-outline">
                    <ArrowIcon width="20px" height="20px" className={isOpen ? "closed hover:text-rose-afpa mr-2"  : "rotate-90 hover:text-rose-afpa mr-2"}/>
                </button>
            </div>
            <div className={isOpen ? "py-4  flex flex-col" : "hidden"}>
                <hr />
                
                {
                   props.data.map((el) => 
                    <span onClick={() => {setInputValue(el.nom); setOpen(!isOpen); handleInputChange(props.name, el.nom)}} key={`ville-${el.id}`} className="h-11 flex items-center text-grey-afpa font-jakartaSans text-[15px] hover:font-bold hover:text-rose-afpa hover:bg-grey-afpa-mid pl-6" id={`ville-${el.id}`}>{el.nom}</span>
                    )
                }
            </div>
        </div>
        
            {/* <select className="rounded-3xl p-2 bg-grey-afpa-light mt-2 font-jakartaSans" id={props.name} name={props.name} >
                
                {props.data.map(el => <option className="text-red" key={el.id}>{el.nom}</option>)}
              
            </select> */}
            
           
            </div>
            
        </React.Fragment>

    )
}

export default DropDownInputVariant;