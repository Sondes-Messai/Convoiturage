import React from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


function AdminRideTable({
  rides,
  property,
  sortDirection,
  handleHeaderClick,
  condition,
}) {
  const archivedRides = rides
  const navigate = useNavigate()

  return (
    <table className="table-auto w-full">
      <tbody>
        <tr className="bg-grey-afpa-light h-[40px] mb-4">
          <th
            className={`whitespace-nowrap cursor-pointer w-40`}
            onClick={() => handleHeaderClick("driver")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "driver"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                CONDUCTEUR
              </div>
              {property === "driver" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "driver" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className={`whitespace-nowrap cursor-pointer w-40`}
            onClick={() => handleHeaderClick("date")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "date"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                DATE
              </div>
              {property === "date" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "date" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className={`whitespace-nowrap cursor-pointer w-60`}
            onClick={() => handleHeaderClick("start")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "start"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                POINT DE DEPART
              </div>
              {property === "start" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "start" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th
            className="whitespace-nowrap cursor-pointer w-36"
            onClick={() => handleHeaderClick("arrival")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "arrival"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                POINT D'ARRIVEE
              </div>
              {property === "arrival" && (
                <div className="ml-2">
                  {sortDirection === "ASC" ? (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="-rotate-90 fill-grey-afpa"
                    />
                  ) : (
                    <ArrowIcon
                      width="15px"
                      height="15px"
                      className="rotate-90 fill-grey-afpa"
                    />
                  )}
                </div>
              )}
              {property !== "arrival" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th className="w-28"></th>
        </tr>
        <tr className="h-[30px]"></tr>
        {archivedRides.map(
          (ride) =>
            (
              <tr
                key={`ride-${ride.departDate}-${ride.driverId}`}
                
              >
                <th className="flex flex-col justify-center items-center h-[90px]">
                  <img
                    className="rounded-full"
                    src={ride.driverPicture.url}
                    width="50px"
                    height="50px"
                  />
                  <span className="flex flex-row">{ride.driverLastName} {ride.driverFirstName}</span>
                 
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {ride.departDate.substring(0,11)}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {ride.departDate.substring(11,16)}
                </th>
                <th className="text-center font-jakartaSans font-normal">
                  {ride.arrivalDate.substring(11,16)}
                </th>
                <th>
              <button 
              onClick={() => {
                navigate(`/admin/rideCard/${ride.id}`)
                }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.1642 10.1092C14.1642 10.3135 14.0796 10.5111 13.9317 10.6521L6.99578 17.266C6.72931 17.5201 6.30731 17.5101 6.05323 17.2436C5.79913 16.9771 5.80914 16.5551 6.07563 16.301L12.4992 10.1757C12.5339 10.1426 12.5336 10.0871 12.4984 10.0544L6.08176 4.08843C5.81211 3.83773 5.79676 3.4159 6.04746 3.14627C6.29816 2.8766 6.72001 2.86125 6.98964 3.11197L13.9248 9.56003C14.0757 9.7003 14.1629 9.89877 14.1641 10.1046C14.1641 10.1062 14.1642 10.1077 14.1642 10.1092Z" />
                </svg>
              </button>
            </th>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

AdminRideTable.propTypes = {
  rides: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  handleHeaderClick: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
}
export default AdminRideTable;
