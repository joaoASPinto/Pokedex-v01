const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".header__search-box_txt");
const ButtonPrev = document.querySelector(".btn_prev");
const ButtonNext = document.querySelector(".btn_next");

let searchPokemon = 1;

const fecthPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";

  const data = await fecthPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block ";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Pokemon não encontrado :(";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
ButtonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
ButtonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

renderPokemon(searchPokemon);
