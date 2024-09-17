import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/tranequafauntleroy')
.then(response => {
  console.log(response)
})
.catch(err => {
  console.log(err)
})
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [ 'tetondan','dustinmyers','justsml','luishrd','bigknell'];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(gitData) {
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const userTitle = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const link = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  const cards = document.querySelector('.cards');

  image.src = gitData.avatar_url;
  link.href = gitData.html_url;
  link.textContent = gitData.html_url
  cardInfo.textContent = gitData.name;
  userName.textContent = gitData.login; 
  location.textContent = `Location: ${gitData.location}`;
  profile.textContent = `Profile: `
  followers.textContent = `Followers: ${gitData.followers}`;
  following.textContent = `Following: ${gitData.following}`;
  bio.textContent = `Bio: ${gitData.bio}`;

  cardInfo.classList.add('card-info');
  userTitle.classList.add('name');
  userName.classList.add('username');
  card.classList.add('card');

  cards.appendChild(card);
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(userTitle);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  
  return cards;
}

function getCards(name) {
  axios.get(`https://api.github.com/users/${name}`)
  .then(response => {
      const newCard = cardMaker(response.data);
      document.querySelector('.cards').appendChild(newCard);
      console.log(response.data);
  })
  .catch(error => {
    console.log('you are doing something wrong!')
    })
}

getCards('tranequafauntleroy');

const newCard = followersArray.map(user => {
  return getCards(user)
})

newCard.forEach(user =>{
  document.querySelector('.card').appendChild(user)
})

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
