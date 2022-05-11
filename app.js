const findBtn = document.querySelector('.btn-find-сharacters');
const сharacterContainer = document.querySelector('.сharacter-container');

const changeFavourites = (e, characterId) => {
  //todo: implement changeFavourites function
};

const createCharacterNode = ({
  id,
  fullName,
  title,
  imageUrl,
  isFavourite = false,
}) => {
  const container = document.createElement('div');
  container.classList.add('сharacter-card');

  const avatar = document.createElement('img');
  avatar.classList.add('сharacter-avatar');
  avatar.setAttribute('src', imageUrl);

  const bodyContainer = document.createElement('div');
  bodyContainer.classList.add('card-body');

  const fullNameItem = document.createElement('h4');
  fullNameItem.classList.add('сharacter-fullname');
  fullNameItem.innerText = `${fullName},`;

  const titleItem = document.createElement('h5');
  titleItem.classList.add('сharacter-title');
  titleItem.innerText = title;

  const reactionContainer = document.createElement('div');
  reactionContainer.classList.add('reaction-container');

  const reactionImage = document.createElement('img');
  reactionImage.classList.add('reaction-img');
  if (isFavourite) {
    reactionImage.classList.add('favourite');
  }
  reactionImage.setAttribute(
    'src',
    `assets/images/${isFavourite ? 'fulled-heart.webp' : 'empty-heart.png'}`
  );

  reactionImage.addEventListener('click', (e) => changeFavourites(e, id));

  bodyContainer.append(fullNameItem);
  bodyContainer.append(titleItem);
  reactionContainer.append(reactionImage);
  container.append(avatar, reactionContainer, bodyContainer);
  return container;
};

const forwardRenderCharactersByFilter = async () => {
  //todo: add loader while fetching data
  const localData = localStorage.getItem('favourites');
  const favourites = localData ? JSON.parse(localData) : [];

  сharacterContainer.replaceChildren();
  const сharacterNodes = [];
  const сharacterNameInput = document.querySelector('.сharacter-input');
  const сharacters = await getCharacters(сharacterNameInput.value);
  for (const { id, fullName, imageUrl, title } of сharacters) {
    сharacterNodes.push(
      createCharacterNode({
        id,
        fullName,
        imageUrl,
        title,
        isFavourite: favourites.includes(id),
      })
    );
  }
  сharacterContainer.append(...сharacterNodes);
};

findBtn.addEventListener('click', forwardRenderCharactersByFilter);

const getCharacters = async (сharacterNameInput = '') => {
  const response = await fetch(
    `https://my-got-api.herokuapp.com/${сharacterNameInput}`
  );
  const characters = await response.json();
  return characters;
};
