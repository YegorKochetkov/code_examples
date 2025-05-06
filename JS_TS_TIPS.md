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
- use **exhaustiveCheck: never** in switch to check that  all cases processed:

```ts
enum Values {
  one,
  two,
}

switch(obj: Values){
  case Values.one:
    return obj.one;
  case Values.two:
    return obj.two;
  default:
    const exhaustiveCheck: never = obj; // throw error if not all cases processed
    return obj;
}
```
