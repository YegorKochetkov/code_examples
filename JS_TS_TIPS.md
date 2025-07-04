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

- when working with regular expressions it is better to declare them once in literal style and use outside of the function - this option is the fastest. For simple checks, use .test() for true/false. This method returns a boolean value and does not create any additional objects as .match() or .exec():

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
