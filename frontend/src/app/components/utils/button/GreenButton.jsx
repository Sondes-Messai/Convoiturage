import React from "react";
import Button from "./Button";

export default function GreenButton({ children, cas, onClick, type }) {
	function appliquerClasseCSS(cas) {
		switch (cas) {
			case "isCO":
				return "btnKawaaGreenCo text-white text-center font-semibold py-2 px-4 rounded-3xl font-jakartaSans";
			case "with-m-y":
				return "btnKawaaGreen text-white text-center font-semibold py-2 px-4 rounded-3xl z-20 font-jakartaSans my-24";
			default:
				return "btnKawaaGreen text-white text-center font-semibold py-2 px-4 rounded-3xl z-20 font-jakartaSans";
		}
	}

	return (
		<Button
			type={type}
			onClick={onClick}
			buttonClass={`${appliquerClasseCSS(cas)}`}
		>
			{children}
		</Button>
	);
}
