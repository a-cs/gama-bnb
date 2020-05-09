console.log("js carregado")
var diasEstadia = 3
const rowsPerPage = 5
const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container-fluid')

app.appendChild(container)

console.log(document.getElementById("picker").value)

readData()

async function readData() {
    container.innerHTML=""
    const loading=document.createElement('div')
    loading.setAttribute('class','text-center')
    loading.innerHTML= '<div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>'
    container.appendChild(loading)
    

    const read = await fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    const data = await read.json();

    //container.removeChild(loading)
     
   showData(data, rowsPerPage, 1)
}


function showData(data, rowsPerPage, page) {
    
    container.innerHTML=""

    let start = rowsPerPage * (page - 1)
    let end = start + rowsPerPage
    
    if (end>=data.length){
        end=data.length   
    }   
     
    for (i = start; i < end; i++) {
        
        let room = data[i]

        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('style', 'max-width: 900px;')
        card.innerHTML =
            `<div class="row">
            <div class="col-auto"><img
                    src=${room.photo.replace(/=(.*)/g, "=medium")}
                    class="card-img" ></div>
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

    }
    const pags = document.createElement('div')
    pags.innerHTML = ""
    container.appendChild(pags)
    pagination(data, page, pags)
}

function pagination(data, page, wrapper) {

    wrapper.innerHTML = ""


    let numberOfPages = Math.ceil(data.length / rowsPerPage)

    let myObj = ""
    for (i = 1; i <= numberOfPages; i++) {
        if (i == page) {
            myObj += `<li class="page-item active"><a class="page-link" href="#" id="page${i}">${i}</a></li>`
        } else {
            myObj += `<li class="page-item"><a class="page-link" href="#" id="page${i}">${i}</a></li>`
        }
    }
    let previousItem = ""
    if (page == 1) {
        previousItem = " disabled"
    } else {
        previousItem = ""
    }
    let nextItem = ""
    if (page == numberOfPages) {
        nextItem = " disabled"
    } else {
        nextItem = ""
    }

    wrapper.innerHTML =
        `<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center" style="max-width: 900px;">
      <li class="page-item${previousItem}">
        <a class="page-link" href="#" aria-label="Previous" id="previousId">
          <span aria-hidden="true">&LT;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      ${myObj}
      <li class="page-item${nextItem}">
        <a class="page-link" href="#" aria-label="Next" id="nextId">
          <span aria-hidden="true">&GT;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav> `

    document.getElementById("previousId").addEventListener("click", function () {
    showData(data, rowsPerPage, (page-1))
    })

    
    document.getElementById("nextId").addEventListener("click", function () {
        showData(data, rowsPerPage, (page+1))
    })
    

    for (let i = 1; i <= numberOfPages; i++) {


        document.getElementById(`page${i}`).addEventListener("click", function () {
            showData(data, rowsPerPage, i)
        })
    }
}

