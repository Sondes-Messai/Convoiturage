import React from "react";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { useNavigate } from "react-router-dom";

/**
 * Component Liste des conversations
 *
 * @author Hélène Dubourg
 */

function AdminChatTable({ chats, property, sortDirection, handleHeaderClick }) {
  const navigate = useNavigate()
  return (
    <table className="tsortDirection, pageIndex, pageSize, propertyable-auto w-full">
      <tbody>
        <tr className="bg-grey-afpa-light h-[40px] mb-4">
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
            className={`whitespace-nowrap cursor-pointer w-40`}
            onClick={() => handleHeaderClick("participants")}
          >
            <div className="flex justify-center items-center">
              <div
                className={`font-semibold text-left ${
                  property === "participants"
                    ? "text-green-afpa-alert"
                    : "text-green-afpa"
                }`}
              >
                PARTICIPANTS
              </div>
              {property === "participants" && (
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
              {property !== "participants" && (
                <ArrowIcon
                  width="15px"
                  height="15px"
                  className="-rotate-90 fill-grey-afpa ml-2"
                />
              )}
            </div>
          </th>
          <th className="w-16"></th>
        </tr>
        <tr className="h-[10px]"></tr>
        {chats.map((chat) => (
          <tr key={`chat-${chat.id}`}>
            <th className="text-center font-jakartaSans font-normal">
              {`${chat.createdDate.substring(
                8,
                10
              )}/${chat.createdDate.substring(
                5,
                7
              )}/${chat.createdDate.substring(0, 4)}`}
            </th>

            <th className="text-center font-jakartaSans font-normal">
              {chat.participants.map(
                (participant) =>
                  `${participant.firstName} ${participant.lastName}, `
              )}
            </th>
            <th>
              <button 
              onClick={() => navigate(`/chatArchivView/${chat.id}`)}>
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
        ))}
      </tbody>
    </table>
  );
}

export default AdminChatTable;
