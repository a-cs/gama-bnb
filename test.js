console.log("js carregado")
var diasEstadia = 3



async function readData(){
    
    const read = await fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    const data = await read.json();
    
    // document.getElementById('demo').innerHTML = data[x]["name"] ;
    // document.getElementById('demo1').innerHTML = data[x]["property_type"] ;
    // document.getElementById('demo2').innerHTML = "R$ "+ data[x]["price"] ;
    // document.getElementById('imdemo').src= data[x]["photo"] ;
    
    const app = document.getElementById('root')
    
    const container = document.createElement('div')
    container.setAttribute('class','container-fluid')
    
    app.appendChild(container)

    data.forEach(room => {
        
        const card= document.createElement('div')
        card.setAttribute('class','card')
        card.setAttribute('style', 'max-width: 900px;')
        card.innerHTML=
        `<div class="row">
            <div class="col-auto"><img
                    src=${room.photo}
                    class="card-img" style="max-width: 300px;"></div>
            <div class="col">
                <div class="card-body">
                    <h1 class="card-title">${room.name}</h1>
                    <p class="card-text">${room.property_type}</p>
                    <p class="card-text">R$ ${room.price}/noite</p>
                    <p class="card-text">Total de R$ ${room.price * diasEstadia}</p>
                </div>
            </div>
        </div>`

        

        container.appendChild(card)
       
    })
    
    
}