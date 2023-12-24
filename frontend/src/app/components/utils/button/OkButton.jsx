import React from "react";
import Button from "./Button";

export default function OkButton({ className, children, onClick, type }) {
	return (
		<Button type={type} onClick={onClick} buttonClass={className}>
			{children}
		</Button>
	);
}
