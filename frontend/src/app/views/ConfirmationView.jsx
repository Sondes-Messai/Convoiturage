import React from "react";
import { useNavigate } from "react-router-dom";
import OkButton from "../components/utils/button/OkButton";

const ConfirmationView = ({ children, buttonId, pictureSrc, style }) => {
	const navigate = useNavigate();
	return (
		<div
			className={
				style === 3
					? "h-screen w-screen absolute top-0 z-60  flex px-40 justify-center pt-28"
					: "h-screen w-screen absolute top-0 z-60 gradient flex px-40 justify-center pt-28"
			}
		>
			<div className="">
				<img src={pictureSrc} alt="" />
			</div>
			<div className="flex-col flex w-2/6 items-center pt-10">
				{children}
				<OkButton
					className={
						style === 3
							? "mt-16 shadow-[0_10px_20px_0_rgba(0,0,0,0.15)] h-[47px] w-[134px] border-gradient-button text-green-400 rounded-3xl font-bold justify-center"
							: "btnKawaaGreenVide text-center shadow-lg shadow-green text-white font-bold py-2 px-4 mr-2"
					}
					onClick={() => navigate("/")}
					id={buttonId}
				>
					<span>OK</span>
				</OkButton>
			</div>
		</div>
	);
};

export default ConfirmationView;
