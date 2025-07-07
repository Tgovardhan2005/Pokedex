function searchPokemon(){
    const name = document.getElementById("pokemon_name").value.toLowerCase().trim();
    const btn = document.getElementById("btn");
    
    if(name === '' || name === undefined){
        alert("Please enter a Pokémon name!");
        return;
    }
    
    // Add loading state
    btn.innerHTML = '<span class="loading"></span>';
    btn.disabled = true;
    
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    
    fetch(url)
        .then(function(response){
            if(!response.ok){
                throw new Error("Pokemon not found!");
            }
            return response.json();
        })
        .then(function(data){
            if(!data){
                return;
            }
            
            // Hide logo and show card with animation
            document.getElementById("pokemon_logo").style.display = "none";
            document.body.style.backgroundImage = `linear-gradient(135deg, rgba(18, 18, 35, 0.95), rgba(44, 62, 80, 0.9)), url("graphics.avif")`;
            
            const cards = document.getElementById("cards");
            cards.style.display = "flex";
            
            // Clear input
            document.getElementById("pokemon_name").value = '';
            
            // Populate card data
            document.getElementById("output_name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon_img").src = data.sprites.front_default;
            
            // Populate abilities
            const abilitiesList = document.getElementById("abilities");
            abilitiesList.innerHTML = '';
            data.abilities.forEach(function(item){
                const li = document.createElement('li');
                li.textContent = item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1).replace('-', ' ');
                abilitiesList.appendChild(li);
            });

            // Populate stats
            const statsList = document.getElementById('stats');
            statsList.innerHTML = '';
            data.stats.slice(0, 6).forEach(function(stat){
                const li = document.createElement('li');
                li.innerHTML = `<strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1).replace('-', ' ')}</strong>: ${stat.base_stat}`;
                statsList.appendChild(li);
            });
            
            // Reset button
            btn.innerHTML = 'Search';
            btn.disabled = false;
        })
        .catch(function(error){
            alert("Pokémon not found! Please check the spelling and try again.");
            console.error(error);
            
            // Reset button
            btn.innerHTML = 'Search';
            btn.disabled = false;
        });
}

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('pokemon_name');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });
});