const BASE_URL = "https://jsonplaceholder.typicode.com/";

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(BASE_URL + endpoint);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPostsAndUsers() {
  try {
    const posts = await fetchFromAPI('posts');
    const users = await fetchFromAPI('users');

    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user.name;
    });

    const formattedData = posts.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      author: userMap[post.userId],
    }));

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error('Error: ', error);
  }
}

getPostsAndUsers();
