import React, { useEffect, useState } from "react";
import {PoubelleIcon, EditIcon} from "../../assets/icons/Icons";
import eye from "../../assets/img/eye.svg";
import noeye from "../../assets/img/noeye.svg";


const SiteAfpaLine = (props) => {
 const [prefVisible, setPrefVisible] = useState(props.site.visibility)
  
const toogleVisibility = () => {
  
    setPrefVisible(!prefVisible);
    props.setVisibility(!prefVisible, props.site.id, props.site);
   
 }

 const deleteById = (id) => {
   props.deleteOne(id)
 }

  return (
    <React.Fragment>
          <div className="w-9/12 max-md:w-full flex shadow-custom rounded-full my-1 justify-between border border-grey-afpa-light">
            
            <div className="w-max flex items-start">
              <p className="self-center ml-8 text-[14px] font-medium">
                {props.site.name}
              </p>
              
            </div>
            <div className=" flex items-center ">
              <div className="eye-button border-l">
                {prefVisible ? (
                  <img
                    src={eye}
                    onClick={() => toogleVisibility()}
                    alt=""
                    className=" w-7 h-7 mx-2 -my-1 cursor-pointer opacity-50 hover:opacity-100 "
                  />
                ) : (
                  <img
                    src={noeye}
                    onClick={() => toogleVisibility()}
                    alt=""
                    className=" w-7 h-7 mx-2 -my-1 cursor-pointer opacity-50 hover:opacity-100 "
                  />
                )}
              </div>
              <div onClick={() => deleteById(props.site.id)} className="bg-grey-afpa-light rounded-r-3xl flex hover:bg-red-100 cursor-pointer">
                <PoubelleIcon
                  className="mr-4 ml-2 my-2 text-red-icon "
                  color="#cd5d5d"
                  width="25px"
                  height="25px"
                />
              </div>
            </div>
          </div>
          </React.Fragment>
  );
};

export default SiteAfpaLine;
