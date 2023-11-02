class ExampleClass {
    public name:string
    constructor() {
      this.name = 'Example';
    }
  
    arrowMethod = () => {
      console.log(this.name);
    };
  
    regularMethod() {
      console.log(this.name);
    }
  }
  
console.log(typeof ExampleClass)
type a = InstanceType<typeof ExampleClass>
type b = typeof ExampleClass

const arr = []
console.log(arr['find'])

type d = PropertyKey