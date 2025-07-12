function searchPokemon(){
    const name = document.getElementsByClassName("pokemon_name1")[0].value.toLowerCase().trim();
    const btn1 = document.getElementsByClassName("btn")[0];
    const cards1 = document.getElementById("cards1");
    const cards2 = document.getElementById("cards2");
    
    if(name === '' || name === undefined){
        alert("Please enter a Pokémon name!");
        return;
    }
    
    btn1.innerHTML = '<span class="loading"></span>';
    btn1.disabled = true;
    
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
            
            document.getElementById("pokemon_logo").style.display = "none";
            document.body.style.backgroundImage = `linear-gradient(135deg, rgba(18, 18, 35, 0.95), rgba(44, 62, 80, 0.9)), url("vilot_background.jpg")`;
            
            cards1.style.display = "flex";
            
            cards1.classList.remove("winner-glow");
            cards2.classList.remove("winner-glow");
            
            document.getElementById("output_name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon_img").src = data.sprites.front_default;
            
            const abilitiesList = document.getElementById("abilities");
            abilitiesList.innerHTML = '';
            data.abilities.forEach(function(item){
                const li = document.createElement('li');
                li.textContent = item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1).replace('-', ' ');
                abilitiesList.appendChild(li);
            });

            
            btn1.innerHTML = 'Search';
            btn1.disabled = false;
        })
        .catch(function(error){
            alert("Pokémon not found! Please check the spelling and try again.");
            console.error(error);
            
            btn1.innerHTML = 'Search';
            btn1.disabled = false;
        });

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementsByClassName('pokemon_name1');
    input[0].addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });
});

}

function searchPokemonvs(){
    const name = document.getElementsByClassName("pokemon_name2")[0].value.toLowerCase().trim();
    const pre_name = document.getElementsByClassName("pokemon_name1")[0].value.toLowerCase().trim();
    const btn1 = document.getElementsByClassName("btn")[1];
    const btn_battle=document.getElementsByClassName("btn_battle")[0];
    const cards1 = document.getElementById("cards1");
    const cards2 = document.getElementById("cards2");
 
    
    if(pre_name==="" || pre_name===undefined){
        alert("Enter a First Pokémon name!");
        return;
    }
    if(name===pre_name){
        alert("Enter a different Pokémon name!");
        return;
    }
    if(name === '' || name === undefined){
        btn_battle.style.display="none";  
        alert("Please enter a Pokémon name!");
        return;
    }
    btn_battle.style.display="block";  
    
    btn1.innerHTML = '<span class="loading"></span>';
    btn1.disabled = true;
    
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
            
            document.getElementById("pokemon_logo").style.display = "none";
            document.body.style.backgroundImage = `linear-gradient(135deg, rgba(18, 18, 35, 0.95), rgba(44, 62, 80, 0.9)), url("vilot_background.jpg")`;
            
            cards2.style.display = "flex";
            
            cards1.classList.remove("winner-glow");
            cards2.classList.remove("winner-glow");
            
            document.getElementById("output_name2").textContent = data.name.toUpperCase();
            document.getElementById("pokemon_img2").src = data.sprites.front_default;
            
            const abilitiesList = document.getElementById("abilities2");
            abilitiesList.innerHTML = '';
            data.abilities.forEach(function(item){
                const li = document.createElement('li');
                li.textContent = item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1).replace('-', ' ');
                abilitiesList.appendChild(li);
            });            

            btn1.innerHTML = 'Search';
            btn1.disabled = false;
        })
        .catch(function(error){
            alert("Pokémon not found! Please check the spelling and try again.");
            console.error(error);
            

            btn1.innerHTML = 'Search';
            btn1.disabled = false;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementsByClassName('pokemon_name2');
    input[0].addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPokemonvs();
        }
    });
});

function addConfetti(card) {

    const oldConfetti = card.querySelector('.confetti');
    if (oldConfetti) oldConfetti.remove();

    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#fff700', '#ee5a24', '#5f27cd', '#00b894', '#fdcb6e'];
    for (let i = 0; i < 24; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 90 + 5}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.3}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.appendChild(piece);
    }
    card.appendChild(confetti);

    setTimeout(() => {
        if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
    }, 1800);
}

function removeWinnerEffects(card) {
    card.classList.remove("winner-glow");
    const oldConfetti = card.querySelector('.confetti');
    if (oldConfetti) oldConfetti.remove();
}

function Battle(){
    const btn_battle=document.getElementById("btn_battle");
    const name1 = document.getElementsByClassName("pokemon_name1")[0].value.toLowerCase().trim();
    const name2 = document.getElementsByClassName("pokemon_name2")[0].value.toLowerCase().trim();
    const cards1 = document.getElementById("cards1");
    const cards2 = document.getElementById("cards2");
    const pokemon_name1=document.getElementById("output_name");
    const pokemon_name2=document.getElementById("output_name2");

    cards1.classList.remove("winner-glow");
    cards2.classList.remove("winner-glow");
    if (window.getComputedStyle(cards1).display === "none" || window.getComputedStyle(cards2).display === "none") {
        alert("Please search for both Pokémon before battling!");
        return;
    }
    const url1 = "https://pokeapi.co/api/v2/pokemon/" + name1;
    const url2 = "https://pokeapi.co/api/v2/pokemon/" + name2;

    Promise.all([
        fetch(url1).then(res => {
            if(!res.ok) throw new Error("Pokemon not found!");
            return res.json();
        }),
        fetch(url2).then(res => {
            if(!res.ok) throw new Error("Pokemon not found!");
            return res.json();
        })
    ]).then(([data1, data2]) => {
        const powers1 = data1.stats.map(stat => stat.base_stat);
        const powers2 = data2.stats.map(stat => stat.base_stat);

        let won1 = 0;
        let won2 = 0;
        const len = Math.min(powers1.length, powers2.length);

        if(powers1[0] > powers2[0]){
            won1 += 2;
        } else if(powers1[0] < powers2[0]){
            won2 += 2;
        }
        for(let i=1; i<len; i++){
            if(powers1[i] > powers2[i]){
                won1++;
            } else if(powers1[i] < powers2[i]){
                won2++;
            }
        }
        if(won1 > won2){
            pokemon_name1.textContent="WINNER";
            cards1.classList.add("winner-glow");
            addConfetti(cards1);
        } else if(won1 < won2){
            pokemon_name2.textContent="WINNER";
            cards2.classList.add("winner-glow");
            addConfetti(cards2);
        } else {
            if(powers1[0] > powers2[0]){
                pokemon_name1.textContent="WINNER";
                cards1.classList.add("winner-glow");
                addConfetti(cards1);
            } else if(powers2[0] > powers1[0]){
                pokemon_name2.textContent="WINNER";
                cards2.classList.add("winner-glow");
                addConfetti(cards2);
            } else {
                pokemon_name1.textContent="Its a Tie";
                pokemon_name2.textContent="Its a Tie";
                cards1.classList.add("winner-glow");
                cards2.classList.add("winner-glow");
            }
        }
    }).catch(error => {
        alert("Pokémon not found! Please check the spelling and try again.....");
        console.error(error);
    });
}
