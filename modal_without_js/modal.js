{
	// Функция закрытия модального окна
	const findModalClose = () => {
		// Получаем текущий хэш без символа #
		const hash = location.hash.slice(1);
		
		if (hash) {
			// Находим элемент с идентификатором, соответствующим хэшу
			const element = document.getElementById(hash);
			
			// Проверяем, является ли элемент модальным окном
			if (element?.classList.contains('modal')) {
				// Находим и возвращаем кнопку закрытия
				return element.querySelector('a.modalClose');
			}
		}
		
		return null;
	};

	// Программное закрытие модального окна по нажатию клавиши Escape
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			const closeButton = findModalClose();
			if (closeButton) {
				closeButton.click();
			}
		}
	});
}