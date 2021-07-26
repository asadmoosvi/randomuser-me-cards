async function getUser() {
  let url = "https://randomuser.me/api";
  let json = await fetch(url).then((response) => response.json());
  let user = json.results[0];
  return user;
}

async function addUser(user, prepend=false) {
  const users = document.querySelector(".users");
  const newUser = document.createElement("div");
  newUser.classList.add("user");
  newUser.innerHTML = `
    <div class="user__image">
      <img src="${user.picture.large}">
    </div>

    <div class="user__location">
      ${user.location.city}, ${user.location.country}
    </div>

    <div class="user__name">${user.name.first} ${user.name.last}</div>

    <div class="user__username">@${user.login.username}</div>

    <a class="user__email" href="mailto:${user.email}">${user.email}</a>
  `;

  if (prepend)
    users.prepend(newUser);
  else
    users.appendChild(newUser);
}


let headingUpdated = false;

async function updateHeading() {
  if (!headingUpdated) {
    console.log('updating heading...');
    const mainHeading = document.querySelector('.main-heading');
    mainHeading.textContent = 'Users';
    headingUpdated = true;
  }
}


async function main() {
  const addUserBtn = document.querySelector('#add-user');
  const userCount = 12;
  for (let i = 0; i < userCount; i++) {
    addUser(await getUser());
    updateHeading();
  }
}

main();

const addUserBtn = document.querySelector('#add-user');
addUserBtn.onclick = () => {
  getUser().then(user => {
    addUser(user, true);
  });
}
