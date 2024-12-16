{
	/**
	 * Возвращает модальный элемент, основанный на текущем хэше.
	 *
	 * @returns {HTMLElement|null} модальный элемент или null
	 */
	function findModalElement() {
		// Получаем текущий хэш без символа #
		const hash = location.hash.slice(1);
		// Проверяем, относится ли хэш к модальному окну
		if (hash && hash.toLocaleLowerCase().includes("modal")) {
			// Находим элемент с идентификатором, соответствующим хэшу
			const element = document.getElementById(hash);
			// Находим и возвращаем элемент модального окна
			return element;
		}

		return null;
	}

	/**
	 * Закрывает модальное окно при нажатии клавиши Escape.
	 *
	 * @param {KeyboardEvent} event - Объект события нажатия клавиши.
	 * @param {HTMLElement} modalElement - Модальный элемент, который должен быть закрыт.
	 * @param {string} [selectorForCloseElementsInModal=«.modalClose»] - Селектор для поиска элементов внутри модального окна, которые могут вызвать закрытие.
	 */
	function closeModalByEscape(
		event,
		modalElement,
		selectorForCloseElementsInModal = ".modalClose"
	) {
		const modalCloseElements = modalElement.querySelectorAll(
			selectorForCloseElementsInModal
		);
		const closeModalElement = modalCloseElements[0];
		const isEscapeKeyPressed = event.key === "Escape";
		if (isEscapeKeyPressed && closeModalElement) {
			closeModalElement.click();
		}
	}

	/**
	 * Возвращает массив элементов, которые могут быть сфокусированными, из
	 * переданного контейнера.
	 *
	 * @param {HTMLElement} node - контейнер, из которого берутся элементы
	 * @returns {HTMLElement[]|null} массив элементов, или null, если таких элементов нет
	 */
	function focusable(node) {
		const focusableElementsInModal = Array.from(
			node.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);

		return focusableElementsInModal.length > 0 ? focusableElementsInModal : null;
	}

	/**
	 * Обрабатывает взаимодействие модальным окном, управляя фокусом и
	 * закрытием по нажатию Escape.
	 * Сохраняет текущий сфокусированный элемент перед тем, как сфокусироваться на
	 * модальном окне. Восстанавливает фокус на ранее сфокусированном элементе.
	 */
	function modalHandler() {
		// Сохраняем текущий фокус
		const previousFocusedElement = document.activeElement;
		// Находим модальное окно
		const modalElement = findModalElement();

		if (modalElement === null) return;
		// Слушаем нажатие Escape
		window.addEventListener("keydown", (event) =>
			closeModalByEscape(event, modalElement)
		);
		// Фокусируемся на первом элементе внутри модального окна
		const focusableElementInModal = focusable(modalElement)[1];
		if (focusableElementInModal) {
			focusableElementInModal.focus();
		} else {
			// Восстанавливаем фокус и удаляем обработчик закрытия по Escape
			previousFocusedElement.focus();
			document.removeEventListener("keydown", closeModalByEscape);
		}
	}

	window.addEventListener("hashchange", modalHandler);
}
