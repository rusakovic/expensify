
// OBJECT DESCTUCTION

// const person = {
//   name: 'Max',
//   age: 29,
//   location: {
//     city: 'Miensk',
//     temperature: 22
//   }
// }

// const { name: firstname = 'Anon', age, location } = person;

// console.log(`${firstname} is ${age}`);

// const { city, temperature: temp } = person.location

// console.log(`It's ${temp} in ${city}`)


// ARRAY DESTRUCTION

const address = ['50 Janki Lučyny', 'Miensk', 'Mienskaja vobl', '220112'];

const [ street, city, voblasc, zip ] = address;

console.log(`you're in ${city} and ${voblasc}`);

const item = ['Coffee (hot)', '$2.0', '$2.5', '$2.75'];
const [name, , medium] = item;

console.log(`A ${name} costs ${medium}`)

