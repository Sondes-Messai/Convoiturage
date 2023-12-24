import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/Logo-Kawaa.svg";
import { Link, useNavigate } from "react-router-dom";
import * as URL from "../../constants/urls/urlFrontEnd";
import DropDownItem from "./DropDownItem";
import { ArrowIcon } from "../../assets/icons/ArrowIcon";
import { DemandeIcon } from "../../assets/icons/DemandeIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { MessageIcon } from "../../assets/icons/MessageIcon";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { PlusIconInverted } from "../../assets/icons/PlusIconInverted";
import { ProfilDropDownIcon } from "../../assets/icons/ProfilDropDownIcon";
import { TrajetIcon } from "../../assets/icons/TrajetIcon";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux-store/authenticationSlice";
import InputGradient from "../utils/input/InputGradient";
import userService from "../../services/userService";
import { formatProfil } from "../utils/Outils";
import { getEmail } from "../../services/tokenServices";
import LinkGradientButton from "../utils/button/LinkGradientButton";
import LinkWhiteButton from "../utils/button/LinkWhiteButton";
import Modal from "../Modal";
import GreenButton from "../utils/button/GreenButton";

/**
 * @COMPONENT NAVBAR
 * @AUTHOR Quentiinos
 **/

const Navbar = (data) => {
	const dispatch = useDispatch();
	const isLoggedIn = data.isLoggedIn;
	const [isHovered, setIsHovered] = useState(false);
	const [profil, setProfil] = useState({});
	let carCondition = profil.role && profil.role.label === "ROLE_USER";
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const Disconnect = () => {
		console.log("disconnect");
		dispatch(signOut());
	};

	const DropDownItems = [
		{ link: "/", text: "Les trajets", icon: "TrajetIcon" },
		{ link: "/chat", text: "Les messages", icon: "MessageIcon" },
		{ link: "les-demandes", text: "Les demandes", icon: "DemandeIcon" },
		{ link: "/profil", text: "Votre profil", icon: "ProfilDropDownIcon" },
		{
			link: "/",
			text: "Deconnexion",
			icon: "LogoutIcon",
			action: () => Disconnect(),
		},
	];

	const getIconComponent = (choice) => {
		switch (choice) {
			case "TrajetIcon":
				return (
					<TrajetIcon
						width="36px"
						height="36px"
						className="mr-4 fill-grey-afpa"
					/>
				);
			case "MessageIcon":
				return (
					<MessageIcon
						width="36px"
						height="36px"
						className="mr-4 fill-grey-afpa"
					/>
				);
			case "DemandeIcon":
				return (
					<DemandeIcon
						width="36px"
						height="36px"
						className="mr-4 fill-grey-afpa"
					/>
				);
			case "LogoutIcon":
				return (
					<LogoutIcon
						width="36px"
						height="36px"
						className="mr-4 fill-grey-afpa"
					/>
				);
			default:
				return (
					<ProfilDropDownIcon
						width="36px"
						height="36px"
						className="mr-4 fill-grey-afpa"
					/>
				);
		}
	};

	const getProfilLoad = async () => {
		const profile = await userService.getUserByEmailOrMatricule(getEmail());
		await setProfil(formatProfil(profile));
	};

	const handleRide = async () => {
		await userService
			.getUserByEmailOrMatricule(getEmail())
			.then((result) => {
				if (result.cars && result.cars.length > 0) {
					navigate("/new-ride");
				} else {
					setShowModal(true);
				}
			})
			.catch((err) => {
				console.log("Erreur lors du chargement du profil :", error);
			});
	};

	const goToCar = () => {
		setShowModal(false);
		navigate("/addCar2");
	};

	useEffect(() => {
		getProfilLoad();
	}, [isLoggedIn]);

	return (
		<nav className="flex justify-center">
			<div className="flex h-16 w-9/12">
				<div className="w-2/5 flex items-center">
					<a href="/" className="flex justify-start items-center">
						<img src={Logo} alt="Logo" className="w-14 h-14 mr-2" />
						<span className="text-2xl font-quicksand font-bold">KAWAA !</span>
					</a>
				</div>
				<div className="w-3/5 flex justify-end items-center">
					{isLoggedIn ? (
						<div className="flex">
							{carCondition && (
								<InputGradient
									onHover={() => setIsHovered(true)}
									onLeave={() => setIsHovered(false)}
								>
									{isHovered ? (
										<PlusIconInverted
											width="30px"
											height="30px"
											className="mr-3"
										/>
									) : (
										<PlusIcon width="30px" height="30px" className="mr-3" />
									)}
									<span
										className="text-white font-jakartaSans mr-3"
										style={{ cursor: "pointer" }}
										onClick={handleRide}
									>
										Proposer un trajet
									</span>
								</InputGradient>
							)}
							<Modal
								isOpen={showModal}
								isInfo
								onCancel={() => setShowModal(!showModal)}
								width={"80"}
							>
								<h2 className="font-jakartaSans text-sm text-grey-afpa-dark font-bold mb-4">
									Vous devez ajouter une voiture à votre profil pour créer un
									trajet."
								</h2>
								<p className="font-jakartaSans text-grey-afpa-dark text-sm mb-4">
									Cliquez ici pour être redirigé vers l'ajout d'un véhicule
								</p>
								<GreenButton onClick={goToCar}>Redirection</GreenButton>
								<hr className="w-3/4 mb-8" />
							</Modal>
							<div className="group relative flex items-center">
								<button className="h-11 rounded-full flex justify-center items-center">
									<img src={profil.picture} alt="" width="50px" height="50px" />
									<ArrowIcon
										width="20px"
										height="20px"
										className="ml-2 rotate-90 group-focus-within:rotate-0 group-focus-within:fill-rose-afpa"
									/>
								</button>
								<div className="bg-white invisible border-0 w-[340px] absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-50">
									<ul className="flex flex-col items-center">
										{DropDownItems.map((d) => (
											<DropDownItem
												key={d.text}
												link={d.link}
												text={d.text}
												onClick={d.action}
											>
												{getIconComponent(d.icon)}
											</DropDownItem>
										))}
									</ul>
								</div>
							</div>
						</div>
					) : (
						<>
							<LinkWhiteButton
								link={URL.URL_REGISTER}
								children={"INSCRIPTION"}
							/>

							<LinkGradientButton link={URL.URL_LOGIN} children={"CONNEXION"} />
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
