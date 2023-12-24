import "./app/assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Provider } from "react-redux";
import App from "./app/App";
import { store } from "./app/redux-store/store";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
