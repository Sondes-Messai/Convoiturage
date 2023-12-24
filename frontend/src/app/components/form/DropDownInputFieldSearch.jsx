import React, { useEffect, useState } from "react";
import { ArrowIcon } from "../../assets/icons/Icons";

function DropDownInputFieldSearch(props) {

    const [isOpen, setOpen] = useState(false);
    const [isChoosen, setChoosen] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
   
    useEffect(() => { setInputValue(props.placeholder)},[])
    
    const handleInputChange = (value) => {
        props.passInput(value);
      };

    return (
        <React.Fragment >
            < div className="flex flex-col">
                <label htmlFor={props.name} className="text-grey-afpa text-xs ml-3">{props.label} </label>
                <div className={`p-2 bg-grey-afpa-light relative mt-1 ${isOpen ? 'rounded-t-3xl' : 'rounded-3xl'}`}>
                    <div className="px-1 py-1  flex justify-between items-center cursor-pointer test" onClick={() => { setOpen(!isOpen)  }}>
                        <span placeholder={props.placeholder} className="text-[15px] text-black ">{inputValue}</span>
                        <button type="button" className="focus:outline-none focus:shadow-outline">
                            <ArrowIcon width="20px" height="20px" className={isOpen ? "closed hover:text-rose-afpa mr-2" : "rotate-90 hover:text-rose-afpa mr-2"} />
                        </button>
                    </div>
                    <div className={isOpen ? " absolute left-[0px]  bg-grey-afpa-light w-full rounded-b-3xl flex flex-col z-10" : "hidden"}>
                        <hr />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            onChange={handleSearchChange}
                            value={searchValue}
                            className="h-11 w-11/12 rounded-full my-2 self-center px-4 py-1"
                        />
                        {
                            props.data
                            .filter((el) => el.town.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((el) =>
                                <span onClick={() => { setInputValue(el.town); setOpen(!isOpen); handleInputChange(el.town); setChoosen(true) }} 
                                key={`ville-${el.id}`} className="h-11 flex items-center text-black font-jakartaSans text-[15px] hover:font-bold hover:text-rose-afpa hover:bg-grey-afpa-mid pl-6 -my-1" id={`ville-${el.id}`}>
                                    {el.town}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DropDownInputFieldSearch;