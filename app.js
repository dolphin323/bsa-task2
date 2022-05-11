const findBtn = document.querySelector('.btn-find-characters');
const characterContainer = document.querySelector('.character-container');

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
  container.classList.add('character-card');

  const avatar = document.createElement('img');
  avatar.classList.add('character-avatar');
  avatar.setAttribute('src', imageUrl);

  const bodyContainer = document.createElement('div');
  bodyContainer.classList.add('card-body');

  const fullNameItem = document.createElement('h4');
  fullNameItem.classList.add('character-fullname');
  fullNameItem.innerText = `${fullName},`;

  const titleItem = document.createElement('h5');
  titleItem.classList.add('character-title');
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

  characterContainer.replaceChildren();
  const characterNodes = [];
  const characterNameInput = document.querySelector('.character-input');
  const characters = await getCharacters(characterNameInput.value);
  for (const { id, fullName, imageUrl, title } of characters) {
    characterNodes.push(
      createCharacterNode({
        id,
        fullName,
        imageUrl,
        title,
        isFavourite: favourites.includes(id),
      })
    );
  }
  characterContainer.append(...characterNodes);
};

findBtn.addEventListener('click', forwardRenderCharactersByFilter);

const getCharacters = async (characterNameInput = '') => {
  const response = await fetch(
    `https://my-got-api.herokuapp.com/${characterNameInput}`
  );
  const characters = await response.json();
  return characters;
};
