import addressService from "../../services/addressService";
import React, { useState, useEffect } from "react";

const AddressSearch = ({ className, placeholder, setValue, value }) => {
	//initialisation des constantes
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);

	useEffect(() => {
		// Mettez à jour la valeur du champ de saisie lorsque la valeur prop `value` change
		if (value.properties && value.properties.label !== searchTerm) {
			setSearchTerm(value.properties.label);
		}
	}, [value]);

	/**
	 * méthode se lançant lors de la saisie du champs de recherche
	 * extraction de la valeur du champs et utilisation du service address pour l'autocomplete
	 */
	const handleSearchChange = async (event) => {
		const { value } = event.target;
		setSearchTerm(value);
		if (value.length >= 3) {
			try {
				const data = await addressService.autocomplete(value);
				setResults(data.features);
			} catch (error) {
				console.error("Erreur lors de la recherche d'adresses :", error);
			}
		} else {
			setResults([]);
		}
	};

	function reset() {
		setSearchTerm("");
		setValue("");
	}

	/**
	 * méthode qui permet de cliquer sur un résultat de l'autocomplète
	 * de remplacer la valeur du champs de saisie par ce résultat
	 * puis retour d'une liste vide pour la liste des résultat
	 */
	const handleResultClick = (result) => {
		setSearchTerm(result.properties.label);
		setValue(result);
		setResults([]);
	};

	return (
		<div>
			<input
				type="text"
				placeholder={placeholder}
				value={searchTerm}
				onChange={handleSearchChange}
				className={className}
				onBlur={reset}
				onClick={reset}
			/>
			<ul className="z-50 absolute bg-white w-[40%] max-h-[10rem] overflow-y-auto rounded shadow-md">
				{results.map((result) => (
					<li
						key={result.properties.id}
						className="p-2 hover:bg-gray-100 cursor-pointer"
						onClick={() => handleResultClick(result)}
					>
						{result.properties.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AddressSearch;
