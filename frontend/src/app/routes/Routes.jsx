import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/admin/AdminHomeView";
import LoginView from "../views/LoginView";
import ForgetPasswordView from "../views/ForgetPasswordView";
import { PrivateRoute } from "./PrivateRoute";
import CguView from "../views/CguView";
import MentionsLegalesView from "../views/MentionsLegalesView";
import PolitiqueProtectionView from "../views/PolitiqueProtectionDonneesView";
import ContactezNousView from "../views/ContactezNousView";
import ProfilView from "../views/profilPage/ProfilView";
import SignupForm from "../views/signupPage/SignupForm";
import AccueilView from "../views/accueilPage/AccueilView";
import AccueilNonConnecteView from "../views/accueilPage/AcceuilNonConnecteView";
import AdminUsers from "../views/admin/AdminUsers";
import AdminAddUser from "../views/admin/AdminAddUser";
import AddCarView from "../views/cars/AddCarView1";
import AddCarView2 from "../views/cars/AddCarView2";
import AdminUserEditView from "../views/admin/AdminUserEditView";
import AdminArchivesView from "../views/admin/AdminArchivesView";
import RecapTrajetView from "../views/trajetPage/RecapTrajetView";
import PostRideView from "../views/trajetPage/PostRideView";
import TrajetsView from "../views/trajetPage/TrajetsView";
import NewRide from "../views/trajetPage/NewRideView";
import RideInfo from "../views/trajetPage/RideInfo";
import ConfirmeRideView from "../views/trajetPage/ConfirmeRideView";
import NotFoundView from "../views/NotFoundView";
import AdminPreference from "../views/admin/AdminPreference";
import AdminSiteAfpa from "../views/admin/AdminSiteAfpa";
import AdminContactUsView from "../views/admin/AdminConctacUsView";
import ChatView from "./../views/chat/ChatView";
import PictureDelete from "./../assets/img/confirmDelete.png";
import PictureInscription from "./../assets/img/confirmInscription.png";
import PictureReservation from "./../assets/img/confirmReservation.png";
import ConfirmationView from "../views/ConfirmationView";
import ChatArchivView from "../views/chat/ChatArchivView";
import AdminTrajetRecapCard from "../components/admin/AdminTrajetRecapCard";
import DemandesView from "../views/demandesPage/DemandesView";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = (isLoggedIn) => {
	const logged = isLoggedIn.isLoggedIn;
	return (
		<RoutesContainer>
			<Route
				path={URL.URL_ADMIN_HOME}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminHomeView />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ALL_USERS_ADMIN}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminUsers />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADD_USER_ADMIN}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminAddUser />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADMIN_EDIT_USER}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminUserEditView />
					</PrivateRoute>
				}
			/>

			<Route
				path={URL.URL_ADMIN_ARCHIVES}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminArchivesView />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADMIN_PREFERENCE}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminPreference />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADMIN_SITE_AFPA}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminSiteAfpa />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADMIN_CONTACT_US}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminContactUsView />
					</PrivateRoute>
				}
			/>
			<Route
				path={URL.URL_ADMIN_TRAJET}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<AdminTrajetRecapCard />
					</PrivateRoute>
				}
			/>

			<Route
				path={URL.URL_CHATARCHIVVIEW}
				element={
					<PrivateRoute roles={[ROLE_ADMIN]}>
						<ChatArchivView />
					</PrivateRoute>
				}
			/>
			<Route path={URL.URL_FORGET_PASSWORD} element={<ForgetPasswordView />} />
			<Route path={URL.URL_CGU} element={<CguView />} />
			<Route
				path={URL.URL_MENTIONS_LEGALES}
				element={<MentionsLegalesView />}
			/>
			<Route
				path={URL.URL_POLITIQUE_PROTECTION_DONNEES}
				element={<PolitiqueProtectionView />}
			/>
			<Route path={URL.URL_CONTACTEZ_NOUS} element={<ContactezNousView />} />
			<Route path={URL.URL_PROFIL} element={<ProfilView />} />
			<Route path={URL.URL_CGU} element={<CguView />} />
			<Route
				path={URL.URL_MENTIONS_LEGALES}
				element={<MentionsLegalesView />}
			/>
			<Route
				path={URL.URL_POLITIQUE_PROTECTION_DONNEES}
				element={<PolitiqueProtectionView />}
			/>
			<Route path={URL.URL_PROFIL} element={<ProfilView />} />
			<Route path={URL.URL_LOGIN} element={<LoginView />} />
			<Route path={URL.URL_REGISTER} element={<SignupForm />} />
			<Route
				path={URL.URL_HOME}
				element={logged ? <AccueilView /> : <AccueilNonConnecteView />}
			/>
			<Route
				path={URL.URL_CONFIRMATION_INSCRIPTION}
				element={
					<ConfirmationView
						buttonId="Ok_confirmation_inscription"
						pictureSrc={PictureInscription}
						style={1}
					>
						<p className="font-bold font-jakartaSans text-2xl text-white text-center">
							Votre compte Kawaa a été supprimé avec succès. Toutes vos données
							ont été définitivement archivées.
						</p>
					</ConfirmationView>
				}
			/>
			<Route
				path={URL.URL_CONFIRMATION_DELETE}
				element={
					<ConfirmationView
						buttonId="Ok_confirmation_suppression"
						pictureSrc={PictureDelete}
						style={2}
					>
						<p className="font-bold font-jakartaSans text-2xl text-white text-center">
							Votre compte Kawaa a été supprimé avec succès. Toutes vos données
							ont été définitivement archivées.
						</p>
					</ConfirmationView>
				}
			/>
			<Route
				path={URL.URL_CONFIRMATION_RESERVATION}
				element={
					<ConfirmationView
						buttonId="Ok_confirmation_reservation"
						pictureSrc={PictureReservation}
						style={3}
					>
						<h4 className="text-gradient pb-8 font-bold">
							Trajet Reservé avec Succès !
						</h4>
						<p className=" font-jakartaSans text-1xl text-gray-500 text-justified pb-8">
							Votre demande a été transmise au conducteur pour aprobation,
							il/elle sera chargé(e) de confirmer la réservation et de finaliser
							les détails avec vous.
						</p>
						<p className=" font-jakartaSans text-1xl text-gray-500 text-justified">
							Veuillez noter que vous devez attendre la confirmation du
							conducteur avant que la reservation ne soit définitivement
							confirmée. Une fois la confiramtion effectuée, nous vous enverrons
							une notification et vous pourrez alors vous préparer en
							conséquence.
						</p>
					</ConfirmationView>
				}
			/>
			<Route path={URL.URL_ADD_CAR} element={<AddCarView />} />
			<Route path={URL.URL_ADD_CAR2} element={<AddCarView2 />} />
			<Route path={URL.URL_TRAJETS} element={<TrajetsView />} />
			<Route path={URL.URL_RECAP_TRAJET} element={<RecapTrajetView />} />
			<Route path={URL.URL_NEW_RIDE} element={<NewRide />} />
			<Route path={URL.URL_RIDE_INFO} element={<RideInfo />} />
			<Route path={URL.URL_POST_RIDE} element={<PostRideView />} />
			<Route path={URL.URL_CONFIRME_RIDE} element={<ConfirmeRideView />} />
			<Route path={URL.URL_CHAT} element={<ChatView />} />
			<Route path={URL.URL_DEMANDES} element={<DemandesView />} />

			<Route path="*" element={<NotFoundView />} />
		</RoutesContainer>
	);
};

export default Routes;
