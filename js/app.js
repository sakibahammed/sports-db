const allPlayers = ()=>{
    document.getElementById('player-container').innerHTML =''
    document.getElementById('spinner').style.display = 'block';
    const searchValue = document.getElementById('search-box').value;
    
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => { // showPlayerDetails(data.player)
        if(data.player == null){
            document.getElementById('spinner').style.display = 'block';
        }
        else{
            showPlayerDetails(data.player);
            document.getElementById('spinner').style.display = 'none';
        }
    })
   

    
};


const showPlayerDetails = (players) => {
    // if(players){
    //     document.getElementById('spinner').style.display = 'none';
    // }
    // else{
    //     document.getElementById('spinner').style.display = 'block';
    // }
    console.log(players);
    const playerContainer = document.getElementById('player-container');
    for(player of players){
       
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card border p-5">
    <div class="pro-pic">
        <img class="w-50" src="${player.strThumb}" alt="">
        <h2>${player.strPlayer}</h2>
        <h5>${player.strNationality}</h5>
        
        <div class="allbutton">
            <button class="btn btn-danger">delete</button>
            <button onclick="details('${player.idPlayer}')" class="btn btn-danger">details</button>
        </div>
    </div>
</div> 
    `;
    playerContainer.appendChild(div);
    }
    
    
}

const details = (id) =>{
   const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
   fetch(url)
   .then(res => res.json())
   .then(data => setDetails(data.players[0]))

}

const setDetails = (info) =>{
    console.log(info.strGender);

    if(info.strGender == "Male"){
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }
    else{
        document.getElementById('male').style.display = "none";
        document.getElementById('female').style.display = "block";
    }
   document.getElementById('details-container').innerHTML = `
   <div>
   <img src="${info.strThumb}" alt="">
   <h1>Name : ${info.strPlayer} </h1>
   </div> 

   `
}

