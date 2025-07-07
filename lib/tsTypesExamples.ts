// Check it in https://www.typescriptlang.org/play/

// Type that can accept any array without using 'any'
type ArrayType = readonly unknown[];

function getAnyArray(param: ArrayType) {
	return param;
}

// Test cases
function testGetAnyArray() {
	// Test with different types of arrays
	const numArray = [1, 2, 3];
	const strArray = ["a", "b", "c"];
	const mixedArray = [1, "two", true];
	const emptyArray: unknown[] = [];

	// Test with as const arrays
	const constNumArray = [1, 2, 3] as const;
	const constStrArray = ["a", "b", "c"] as const;
	const constMixedArray = [1, "two", true] as const;

	// Assertions
	const resultNumArray = getAnyArray(numArray);
	const resultStrArray = getAnyArray(strArray);
	const resultMixedArray = getAnyArray(mixedArray);
	const resultEmptyArray = getAnyArray(emptyArray);

	const resultConstNumArray = getAnyArray(constNumArray);
	const resultConstStrArray = getAnyArray(constStrArray);
	const resultConstMixedArray = getAnyArray(constMixedArray);

	// Type checks (these will be compile-time checks)
	type CheckNumArray = typeof resultNumArray;
	type CheckStrArray = typeof resultStrArray;
	type CheckMixedArray = typeof resultMixedArray;
	type CheckEmptyArray = typeof resultEmptyArray;

	type CheckConstNumArray = typeof resultConstNumArray;
	type CheckConstStrArray = typeof resultConstStrArray;
	type CheckConstMixedArray = typeof resultConstMixedArray;
}

//#############################################################
// Type that can accept any non-empty array without using 'any'
type NonEmptyArrayType = readonly [unknown, ...unknown[]];

function getNotEmptyArray(param: NonEmptyArrayType) {
	return param;
}

// Test cases
function testGetNotEmptyArray() {
	// Test with different types of non-empty arrays
	const numArray: NonEmptyArrayType = [1, 2, 3];
	const strArray: NonEmptyArrayType = ["a", "b", "c"];
	const mixedArray: NonEmptyArrayType = [1, "two", true];

	// Test with as const arrays
	const constNumArray: NonEmptyArrayType = [1, 2, 3] as const;
	const constStrArray: NonEmptyArrayType = ["a", "b", "c"] as const;
	const constMixedArray: NonEmptyArrayType = [1, "two", true] as const;

	// Assertions
	const resultNumArray = getNotEmptyArray(numArray);
	const resultStrArray = getNotEmptyArray(strArray);
	const resultMixedArray = getNotEmptyArray(mixedArray);

	const resultConstNumArray = getNotEmptyArray(constNumArray);
	const resultConstStrArray = getNotEmptyArray(constStrArray);
	const resultConstMixedArray = getNotEmptyArray(constMixedArray);

	// @ts-expect-error
	getNotEmptyArray([]); // error cause array is empty
	getNotEmptyArray([1, "df"]);
}

//#########################################################################
// Type function that can accept any number of arguments without using 'any'
const structureTypeExample = {
	arr: [
		1,
		{
			obj: {
				name: "dfasdf",
				value: "",
			},
		},
		{
			hello: 1,
		},
	],
	value: 1,
} as const;

structureType(structureTypeExample);

function structureType(value: {
	arr: readonly [
		unknown,
		{ obj: { name: string } & Record<string, unknown> } & Record<
			string,
			unknown
		>,
		...unknown[],
	];
}): string {
	return value.arr[1].obj.name;
}

// Update the function parameter type so that it can accept parameters that are not in the type when you create the object at the time you call the function:
structureType2({
	arr: [
		1,
		{
			obj: {
				name: "dfasdf",
				value: "",
			},
		},
		{
			hello: 1,
		},
	],
	value: 1,
});

function structureType2(
	value: {
		arr: readonly [
			unknown,
			{ obj: { name: string } & Record<string, unknown> } & Record<
				string,
				unknown
			>,
			...unknown[],
		];
	} & Record<string, unknown>,
): string {
	return value.arr[1].obj.name;
}

// Union with which type will always result in the original type?
type TestUnion<T> = T & unknown;
type ResultTest = TestUnion<string>; // string
type ResultTest2 = TestUnion<{ a: 1 }>; // {a: 1}

// Union with which type will always result in never?
type TestUnionNever<T> = T & never;
type ResultTest3 = TestUnionNever<string>; // never
type ResultTest4 = TestUnionNever<{ a: 1 }>; // never

// When intersecting with which type will always result in the original type?
type TestIntersectionUnion<T> = T | never;
type ResultTestUnion = TestIntersectionUnion<string>; // string
type ResultTest2Union = TestIntersectionUnion<{ a: 1 }>; // {a: 1}

// The intersection with which type will always result in unknown?
type TestIntersectionUnion2<T> = T | unknown;
type ResultTestUnion2 = TestIntersectionUnion2<string>; // unknown
type ResultTest2Union2 = TestIntersectionUnion2<{ a: 1 }>; //unknown

// Which type can be used to filter numbers?
type FilterNumber<T> = T extends number ? never : T;
type FilterTest = FilterNumber<1 | 2 | "a" | "b">; // should be "a" | "b"

// How to extract an event by type from a union?
type ExtractByField<T, Key extends keyof T, Value> = T extends Record<
	Key,
	Value
>
	? T
	: never;
type Event1 = { type: "user-created"; data: { name: "user1" } };
type Event2 = { type: "user-deleted"; data: { id: 1 } };

type ResultFindEvent = ExtractByField<Event1 | Event2, "data", { id: 1 }>; // should be Event2

// Universal helper with autocompletion:
// Main helper type
type ExtractByDiscriminant<
	TUnion,
	TKey extends keyof TUnion,
	TValue extends TUnion[TKey],
> = TUnion extends Record<TKey, TValue> ? TUnion : never;

type Event11 = { type: "user-created"; data: { name: string } };
type Event22 = { type: "user-deleted"; data: { id: number } };
type Event3 = { type: "user-updated"; data: { id: number; name: string } };
type AllEvents = Event11 | Event22 | Event3;

// 🔍 Type filtering with autocompletion:
type UserDeletedEvent = ExtractByDiscriminant<
	AllEvents,
	"type",
	"user-updated"
>;
// = { type: "user-deleted"; data: { id: number } }

// How to write a type to call the function 3 ways?
structureUnion({ isOne: true }, 1);
// @ts-expect-error
structureUnion({ isOne: true }, 1, 2); // error since there is only one additional parameter at isOne
structureUnion({ isTwo: true }, 1, 2);
structureUnion({ isThree: true }, 1, 2, 3);

type ConfigMap = {
	isOne: [number];
	isTwo: [number, number];
	isThree: [number, number, number];
};

type ConfigKey = keyof ConfigMap;

type StructureArgs = {
	[K in ConfigKey]: [{ [P in K]: true }, ...ConfigMap[K]];
}[ConfigKey];

function structureUnion(...params: StructureArgs) {}

// How to write a type to call the function 3 ways?
anyCallback((a: number) => {});
anyCallback((a: string, b: number) => "string");

function anyCallback<Args extends unknown[], Return>(
	cb: (...args: Args) => Return,
) {}

// What type should be passed to the parameter of Ref type to make any other Ref assignable to this type?
type Ref<T> = { current: T } | ((value: T) => void);
type SuperRef<T> = Ref<T>;

function storeRef<T>(anyRef: SuperRef<T>) {}

const numberRef = {} as Ref<number>;
const stringRef = {} as Ref<string>;

storeRef(numberRef);
storeRef(stringRef);
