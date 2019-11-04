const add = (a, b) => a + b;
const generateGreeting = (name = 'Annonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7)

})

test('Testing the names', () => {
  const name = generateGreeting('Mike')
  expect(name).toBe('Hello Mike!')
})

test('Should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Annonymous!')
})