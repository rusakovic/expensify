import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })


// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// // database.ref('expenses')
//   // .once('value')
//   // .then((snapshot) => {
//   //   const expenses = [];

//   //   snapshot.forEach((childSnapshot) => {
//   //     expenses.push({
//   //       id: childSnapshot.key,
//   //       ...childSnapshot.val()
//   //     })
//   //   });
//   //   console.log(expenses)
//   // })

//   // database.ref('expenses')
//   //   .on('value', (snapshot) => {
//   //     const expenses = [];

//   //   snapshot.forEach((childSnapshot) => {
//   //     expenses.push({
//   //       id: childSnapshot.key,
//   //       ...childSnapshot.val()
//   //     })
//   //   });
//   //   console.log(expenses)
//   //   })

// // database.ref('expenses').push({
// //   description: 'Water',
// //   note: 'Should be more economy',
// //   amount: 223,
// //   createdAt: 2134235
// // })


// // database.ref('notes/-LtVG8Y_AVF4W5SfEKTJ').remove()

// // // database.ref('notes').push({
// // //   title: 'Course topic',
// // //   body: 'go for a  run'
// // // })



// // database.ref('notes').set(notes)

// // database.ref().on('value', (snapshot) => {
// //   console.log(snapshot.val())
// // })

// // database.ref('location/city')
// //   .once('value')
// //   .then((snapshot) => {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch((error) => {
// //     console.log('fetching and error', error)
// //   })


// // database.ref().set({
// //   name: 'Max Rusakovič',
// //   age: 29,
// //   stressLevel: 6,
// //   job: {
// //     title: 'software developer',
// //     company: 'Google'
// //   },
// //   location: {
// //     city: 'Miensk',
// //     country: 'Belarus'
// //   }
// // }).then(() => {
// //  console.log('data is saved')
// // }).catch((error) => {
// //   console.log('This failed.', error)
// // });

// // database.ref().update({
// //   stressLevel: 5,
// //   'location/city': 'Seatle',
// //   'job/company': 'Amazon'
// // });


// // database.ref().remove()
// //   .then(() => {
// //     console.log('removing is done')
// //   })
// //   .catch((error) => {
// //     console.log('removing is not succes', error)
// //   })