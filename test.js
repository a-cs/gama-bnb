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
    container.setAttribute('class','container')
    
    app.appendChild(container)

    data.forEach(room => {
        
        const card= document.createElement('div')
        card.setAttribute('class','card')

        const textoCard= document.createElement('div')
        textoCard.setAttribute('class','textoCard')

        const roomImg= document.createElement('img')
        roomImg.src=room.photo
        const h1=document.createElement('p')
        h1.textContent=room.name
        console.log(room.name)
        const p1= document.createElement('p')
        p1.textContent=room.property_type
        const p2= document.createElement('p')
        p2.textContent=`R$ ${room.price}/noite`
        const p3= document.createElement('p')
        p3.textContent=`Total de R$ ${room.price * diasEstadia}`

        container.appendChild(card)
        card.appendChild(roomImg)
        card.appendChild(textoCard)

        textoCard.appendChild(h1)
        textoCard.appendChild(p1)
        textoCard.appendChild(p2)
        textoCard.appendChild(p3)
    });
    
    
}