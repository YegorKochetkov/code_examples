{
	// Функция закрытия модального окна
	/**
	 * Finds and returns the close button of the modal element based on the current URL hash.
	 * If the hash corresponds to a modal element, the close button inside it is returned.
	 * If no such element or button is found, returns null.
	 */
	const findModalClose = () => {
		// Получаем текущий хэш без символа #
		const hash = location.hash.slice(1);

		if (hash) {
			// Находим элемент с идентификатором, соответствующим хэшу
			const element = document.getElementById(hash);

			// Проверяем, является ли элемент модальным окном
			if (element?.classList.contains("modal")) {
				// Находим и возвращаем кнопку закрытия
				return element.querySelector("a.modalClose");
			}
		}

		return null;
	};

	// Программное закрытие модального окна по нажатию клавиши Escape
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			const closeButton = findModalClose();
			if (closeButton) {
				closeButton.click();
			}
		}
	});
}
