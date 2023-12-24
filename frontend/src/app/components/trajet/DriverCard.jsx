import React from "react";
import { BlablaIcon } from "../../assets/icons/BlablaIcon";
import { MaskIcon } from "../../assets/icons/MaskIcon";
import { MusicIcon } from "../../assets/icons/MusicIcon";
import { SmokerIcon } from "../../assets/icons/SmokerIcon";

function DriverCard(props) {
	let ride = {};
	ride = props.obj;
	let preferences = {};
	preferences = ride.driverPreferences;

	return (
		<div className="flex flex-col justify-between border-gray-300 border-solid border-l border-r border-t border-b rounded-3xl w-1/2 px-5 py-16 mt-5">
			<div className="flex flex-col items-center justify-center">
				<div className="w-[120px] h-[120px] rounded-full ">
					<img
						src={ride.driverPicture.url}
						alt=""
						className="rounded-3xl w-full p-0"
					/>
				</div>
				<p className="font-jakartaSans font-bold mt-3">{`${ride.driverFirstName} ${ride.driverLastName}`}</p>
			</div>
			<div className="flex flex-col items-center justify-between h-1/3 ">
				<hr className="w-3/4 h-[3px] my-3" />
				<div className="w-full flex">
					<div className="w-1/2">
						<img
							src="https://images.caradisiac.com/images/1/1/5/3/161153/S1-essai-video-skoda-citigo-2017-constat-des-tcheques-522337.jpg"
							alt=""
							className="rounded-3xl"
						/>
					</div>
					<div className="w-1/2  h-full flex flex-col">
						<p className="font-jakartaSans text-grey-afpa text-base text-left">
							{ride.carBrand}
						</p>
						<p className="font-jakartaSans text-grey-afpa text-base text-left">
							{ride.carModel}
						</p>
						<p className="font-jakartaSans text-grey-afpa text-base text-left">
							{ride.carColor}
						</p>
						<p className="font-jakartaSans text-grey-afpa text-base text-left">
							{ride.carLicensePlate}
						</p>
					</div>
				</div>
				<hr className="w-3/4 h-[3px] my-3" />
			</div>
			<div className="flex flex-col">
				<p className="font-jakartaSans font-bold text-sm text-center">
					Mes préférences
				</p>
				<div className="flex justify-around mt-5">
					{preferences !== null ? (
						<>
							<SmokerIcon
								width="30px"
								height="30px"
								className={
									preferences.some((pref) => pref.label === "smoker")
										? "fill-green-afpa"
										: "fill-grey-afpa"
								}
							/>
							<BlablaIcon
								width="30px"
								height="30px"
								className={
									preferences.some((pref) => pref.label === "blabla")
										? "fill-green-afpa"
										: "fill-grey-afpa"
								}
							/>
							<MusicIcon
								width="30px"
								height="30px"
								className={
									preferences.some((pref) => pref.label === "music")
										? "fill-green-afpa"
										: "fill-grey-afpa"
								}
							/>
							<MaskIcon
								width="30px"
								height="30px"
								className={
									preferences.some((pref) => pref.label === "mask")
										? "fill-green-afpa"
										: "fill-grey-afpa"
								}
							/>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}

export default DriverCard;
