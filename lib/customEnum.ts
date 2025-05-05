// Такой код будет компилироваться в понятный JS, в отличие от родного TS Enum
type ValueOf<T> = T[keyof T];

const ColorEnum = {
	   RED: "red",
	   GREEN: "green",
	   BLUE: "blue",
} as const;

type Color = ValueOf<typeof ColorEnum>;

// Example usage:
function setColor(color: Color) {
  console.log(color);
}

setColor(ColorEnum.RED); // Output: "red"