import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import Navbar from './components/layouts/Navbar';
import Navbar from "./components/header/Navbar-Kawaa";
import { selectIsLogged, signIn } from "./redux-store/authenticationSlice";
import Routes from "./routes/Routes";
import { getRole, getToken, isTokenValid } from "./services/tokenServices";
import Footer from "./components/footer/Footer";
import NavBarAdmin from "./components/header/Navbar-admin";

const contextClass = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const App = () => {
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  let isAdmin = false;

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) dispatch(signIn(token));
    setIsLogin(false);
  }, []);

  if (isLogged) {
    isAdmin = getRole() === "ROLE_ADMIN" || getRole() === "ROLE_SUPER";
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex cursor-default relative flex-col">
        {isLogged}
        <Navbar isLoggedIn={isLogged} />

        <main className="grow flex flex-col">
          {isAdmin ? <NavBarAdmin /> : ""}
          <Routes isLoggedIn={isLogged} />
        </main>
        <ToastContainer
          toastClassName={({ type }) =>
            contextClass[type || "default"] +
            " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
          bodyClassName={() => "text-sm font-white font-med block p-3"}
          position="bottom-left"
          autoClose={3000}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
