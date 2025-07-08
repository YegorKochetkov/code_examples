# Speed optimization

- use **&&** instead **if() {}**
- use **>, <, >=, <=** instead convert to boolean, like **([].length !== 0)** instead  **(![])**
- use array with predetermined size: **const x = Array(size)** instead **const x = []**
- use **var**
- use **.then** instead **await**
- only **one return** from function
- prefer **return** instead **void\undefined return** from function (function must be without side effects)
- destructuring of arrays is best done through object **const {a, b} = data** instead **const [a, b] = data**
- avoid **if** branches and non-pure function - help compiler to optimize your code
- use **unreachableCase: never**  or **assertUnreachable()** in switch to check that  all cases processed:

```ts
const colors = [
    "Green",
    "Blue",
    "Red",
    "Yellow",
] as const;

const toRGB = (color: typeof colors[number]) => {
  switch (color) {
    case "Green":
      return "#6abe30";

    case "Blue":
      return "#2a66b0";

    case "Red":
      return "#e97451";

    // case "Yellow":
    //   return "#ffdafa";

  default: 
  // Variant with exhaustive check:
  //  let unreachableCase: never = color;
           //^ Type 'Yellow' is not assignable to type 'never'
  //  throw new Error("Unexpected value encountered");

  // Variant with helper:
   assertUnreachable(color, "Unexpected value encountered!");
                    //^ Argument of type 'Yellow' is not assignable to parameter of type 'never'
  }
};

/**
 * Helper function that throws an error with a custom message when encountering unreachable code paths
 * @param arg - Value of type never, representing an unreachable code path
 * @param message - Custom error message to throw
 * @throws {Error} Always throws an error with the provided message
 * @example
 * ```ts
 * // In an exhaustive switch statement:
 * default:
 *   assertUnreachable(value, "Unexpected value encountered");
 * ```
 */
const assertUnreachable = (arg: never, message: string) => {
  // btw, the nice thing about doing `console.error` here instead is you can safely pass along `arg` to be logged as well
  // console.error(message + " " + arg);
  throw new Error(message);
}
```

- when working with regular expressions it is better to declare them once in literal style and use outside of the function - this option is the fastest. For simple checks, use **.test()** for true/false. This method returns a boolean value and does not create any additional objects as **.match()** or **.exec()**:

```ts
const regValue = /[aeiou]+/gi;

(function reg() {
    for (let i = 0; i < 10000; ++i) {
        for(let j = 0; j < 1000; ++j) {
            regValue.exec(str);
        }
    }
}());
```

- allows you to subscribe to the system button back, which is used to close the modals for android users:

```ts
const modal = useModalState()
useEffect(() => {
  const closeWatcher = new CloseWatcher()
  closeWatcher.onclose = () => modal.close()

  return () => closeWatcher.destroy()
}, [])
```

- Avoid **await** syntax, as it leads to slow code. Use the **Promise** syntax instead.
