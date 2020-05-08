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

        const cardBody= document.createElement('div')
        cardBody.setAttribute('class','card-body')



        const roomImg= document.createElement('img')
        roomImg.src=room.photo
        roomImg.setAttribute('class','card-img')
        roomImg.setAttribute('style', 'max-width: 300px;')
        
        
        const h1=document.createElement('h1')
        h1.textContent=room.name
        h1.setAttribute('class','card-title')
                
        const p1= document.createElement('p')
        p1.setAttribute('class','card-text')
        p1.textContent=room.property_type
        
        const p2= document.createElement('p')
        p2.textContent=`R$ ${room.price}/noite`
        p2.setAttribute('class','card-text')
        
        const p3= document.createElement('p')
        p3.textContent=`Total de R$ ${room.price * diasEstadia}`
        p3.setAttribute('class','card-text')

        const row=document.createElement('div')
        row.setAttribute('class', 'row')

        const colAuto=document.createElement('div')
        colAuto.setAttribute('class', 'col-auto')

        const col=document.createElement('div')
        col.setAttribute('class', 'col')

        container.appendChild(card)
        card.appendChild(row)
        row.appendChild(colAuto)
        colAuto.appendChild(roomImg)

        row.appendChild(col)
        col.appendChild(cardBody)

        cardBody.appendChild(h1)
        cardBody.appendChild(p1)
        cardBody.appendChild(p2)
        cardBody.appendChild(p3)
    });
    
    
}