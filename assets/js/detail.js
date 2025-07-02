function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const pokemonId = getUrlParameter('id');

function loadPokemonDetail(pokemonId) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
        .then(pokemon => {
            document.getElementById('pokemonName').textContent = pokemon.name;

            const detailElement = document.getElementById('pokemonDetail');

            detailElement.innerHTML = `
                    <div class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        
                        <div class="types">
                            ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join("")}
                        </div>

                        <div class="container">
                        <div class="stats">
                            <h2>Stats:</h2>
                            <ul>
                                ${pokemon.stats.map(statSearch => `
                                    <li>${statSearch.stat.name}: ${statSearch.base_stat}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="abilities">
                            <h2>Abilities:</h2>
                            <ul>
                                ${pokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}
                            </ul>
                        </div>
                        </div>
                    </div>
                `;
        });
}

loadPokemonDetail(pokemonId);
