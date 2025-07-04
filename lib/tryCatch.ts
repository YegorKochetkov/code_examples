// Скрипт для запуска асинхронных функций с обработкой ошибок
type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
	promise: Promise<T>
): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error };
	}
}

// Пример: возврат всегда будет числом, несмотря на возможное бросание ошибки
const doSomething = async () => {
	const result = Math.random();

	if (result > 0.5) throw new Error("Too big");

	return result;
};

// всегда точно знаем, что либо number, либо Error
const { data, error } = await tryCatch(doSomething());
