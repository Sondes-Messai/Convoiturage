import React, { useEffect, useState } from "react";
import PhoneNumber from "../utils/PhoneNumber";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import PropTypes from "prop-types";

function ProfilComponent({ isProfil, className, onClick, label, profile }) {
  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }}
      type="button"
      tabIndex={0}
    >
      {isProfil ? (
        <>
          <div className="w-16 h-16 mr-3">
            <img src={profile.picture} alt="" className="rounded-full" />
          </div>
          <div className="flex-col flex-1">
            <div className="font-jakartaSans font-bold">
              {profile.firstName + " " + profile.lastName}
            </div>
            <PhoneNumber>{profile.phone}</PhoneNumber>
          </div>
        </>
      ) : (
        <div className="flex-col flex-1">
          <div className="font-jakartaSans ml-3">{label}</div>
        </div>
      )}
      <div>
        <ArrowIcon
          width="20px"
          height="20px"
          className="group-hover:fill-rose-afpa"
        />
      </div>
    </div>
  );
}

export default ProfilComponent;

ProfilComponent.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })
};
