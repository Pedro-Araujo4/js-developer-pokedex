const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

const limit = 10
let offset = 0

const maxRecords = 151;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {    
        const newHtml = pokemons.map((pokemon) => `
            <button class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                 <ol class="types">
                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                 </ol>


                    <img src="${pokemon.photo}" 
                         alt="${pokemon.name}">
                </div>
            </button>
        `).join('')

        pokemonList.innerHTML += newHtml
    })  
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {  
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
   
})


pokemonList.addEventListener('click', (event) => {
    const button = event.target.closest('.pokemon');
    if (button) {
        const pokemonId = button.getAttribute('data-pokemon-id');
        window.location.href = `./detail.html?id=${pokemonId}`;
        }
})






