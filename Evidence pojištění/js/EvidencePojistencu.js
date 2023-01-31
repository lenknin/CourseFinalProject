'use strict';

class Evidence {

	constructor() {
		const pojistenciZeStorage = localStorage.getItem("pojistenci");
		this.pojistenci = pojistenciZeStorage ? JSON.parse(pojistenciZeStorage) : [];

		this.jmenoInput = document.getElementById("jmeno");
		this.prijmeniInput = document.getElementById("prijmeni");
		this.vekInput = document.getElementById("vek");
		this.telefonInput = document.getElementById("telefon");
		this.ulozitButton = document.getElementById("ulozit");
		this.vypisElement = document.getElementById("vypis");

		this._ulozPojistenceDoEvidence();
	}

	_ulozPojistenceDoEvidence() {
		this.ulozitButton.onclick = () => {
			const pojistenec = new Pojistenec(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
			this.pojistenci.push(pojistenec);
			this.ulozPojistence();
			this.vypisPojistence();

		};
	}

	vypisPojistence() {
		this.vypisElement.innerHTML = "";
		for (const pojistenec of this.pojistenci) {

			const zaznam = document.createElement("tr");
			zaznam.className = "zaznam";
			zaznam.insertAdjacentHTML("beforeend", `<td>${pojistenec.jmeno}</td> <td>${pojistenec.prijmeni}</td> <td>${pojistenec.vek}</td> <td>${pojistenec.telefon}</td>`);

			

			this._pridejTlacitko("Smazat pojištěnce", () => {
				if (confirm("Opravdu si přejete smazat pojištěnce z evidence?")) {
					this.pojistenci = this.pojistenci.filter(z => z !== pojistenec);
					this.ulozPojistence();
					this.vypisPojistence();
				}
			}, zaznam);
			zaznam.insertAdjacentHTML("beforeend", "</tr>");
			this.vypisElement.appendChild(zaznam);
		}
	}

	_pridejTlacitko(titulek, callback, element) {
		const button = document.createElement("button");
		button.onclick = callback;
		button.innerText = titulek;
		element.appendChild(button);
	}

	ulozPojistence() {
		localStorage.setItem("pojistenci", JSON.stringify(this.pojistenci));
	}

}

