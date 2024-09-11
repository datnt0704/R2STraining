/** @format */

// import changeName from './object';

// console.log('print 1');
// Promise.resolve().then(() => {
//   console.log('print 6');
//   setTimeout(() => {
//     console.log('print 7');
//   }, 0);
// });
// setTimeout(() => {
//   console.log('print 4');
// }, 10);
// Promise.resolve().then(() => {
//   console.log('print 2');
//   setTimeout(() => {
//     console.log('print 5');
//   }, 0);
// });
// console.log('print 3');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + '/users', { method: 'GET' })
      .then((response) => {
        if (response.status !== 200) {
          reject('error');
        }
        return response.json(); // async
      })
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}
fetchUsers().then((users) => console.log('users ', users));

async function fetchUsers2() {
  // Promise 500
  // Promise
  const response = await fetch(BASE_URL + '/users', { method: 'GET' }); // Promise
  if (response.status !== 200) {
    throw new Error('error');
  }
  const users = await response.json();
  return users;
}

async function fetchUserById(userId) {
  //Promise 500
  const response = await fetch(BASE_URL + '/users/' + userId);
  if (response.status !== 200) {
    throw new Error('fetch error ' + userId);
  }
  const user = await response.json();
  return user;
}

async function fetchData(url) {
  const response = await fetch(url, { method: 'GET' }); // Promise
  if (response.status !== 200) {
    throw new Error('error');
  }
  const data = await response.json();
  return data;
}

fetchData(BASE_URL + '/users/3').then();
fetchData(BASE_URL + '/posts').then();

fetchUserById(2).then((user) => console.log('user @@@ ', user));

fetchUsers2().then((users) => console.log('users 2 ', users));

/**
 * 2: success
 * 4: client issue 401
 * 5: server error
 * 3: navigation
 */

// Challenge 8:
/**
 * url: posts:: https://jsonplaceholder.typicode.com/posts
 * users: https://jsonplaceholder.typicode.com/users
 * 
 * 1. fetch posts and users
 * 2. return data following the below format
 * [{
 * 	id: 1,
		title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		body: "quia et suscipi suscipit recusandae consequuntur expedita et cum ",
		author: "Leanne Graham",
 * }, {}, {}]
 */

async function handleData() {
  // > 1
  const fetchUsers = fetchData(BASE_URL + '/users'); // Promise 5:00:01
  const fetchPosts = fetchData(BASE_URL + '/posts'); // Promise 5:00:01

  const users = await fetchUsers; // 500
  const posts = await fetchPosts; // 1

  // 1s
  // combineData(users, posts); //

  // const usersMap = new WeakMap(usersData.map((user) => [user.id, user.name]));
  const nums = new Set([1, 4, 5, 4, 5, 6]); // remove duplicated numbers
  console.log('nums ', nums);
}
handleData();

// 11 / 2 = 5.5

console.log('floor', Math.floor(11 / 2));
console.log('ceil', Math.ceil(11 / 2));
Math.abs(-1);

const arr = [];

const arr1 = new Array(12).fill(0);
