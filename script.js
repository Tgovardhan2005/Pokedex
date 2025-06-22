function searchPokemon(){
    const name=document.getElementById("pokemon_name").value.toLowerCase().trim();
    if(name==='' || name===undefined){
        alert("Please Enter the Input")
        return;
    }
    const url="https://pokeapi.co/api/v2/pokemon/"+name;
    fetch(url)
        .then(function(response){
            if(!response.ok){
                alert("Pokemon Not Found!")
                return;
            }
            return response.json();
        })
        .then(function(data){
            if(!data){
                return;
            }
            document.getElementById("pokemon_logo").style.display="none";
            document.body.style.backgroundImage=`url("graphics.avif")`;
            document.body.style.backdropFilter=`blur(8px)`;
            document.getElementById("cards").style.display="flex";
            document.getElementById("pokemon_name").value='';
            document.getElementById("pokemon_name").style.top="110px";
            document.getElementById("btn").style.top="110px";
            document.getElementById("output_name").textContent=data.name.toUpperCase();
            document.getElementById("pokemon_img").src=data.sprites.front_default;   
            
            const abilitiesList=document.getElementById("abilities");
            abilitiesList.innerHTML='';
            data.abilities.forEach(function(items){
                const li=document.createElement('li');
                li.textContent=items.ability.name.charAt(0).toUpperCase()+items.ability.name.slice(1);
                abilitiesList.appendChild(li);
            });

            const statsList=document.getElementById('stats');
            statsList.innerHTML='';
            data.stats.slice(0,5).forEach(function(stats){
                const li=document.createElement('li');
                li.innerHTML=`<b>${stats.stat.name.charAt(0).toUpperCase()+stats.stat.name.slice(1)}</b>&nbsp;<b>:</b>&nbsp;&nbsp;${stats.base_stat}`;
                statsList.appendChild(li);
            });
        })
        .catch(function(error){
            alert("Something Went Wrong");
            console.error(error);
        });
            
}