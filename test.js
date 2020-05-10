console.log("js carregado")
let diasEstadia = 0
const rowsPerPage = 5
const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container-fluid')

app.appendChild(container)

let dt = new Date();
today = dt.toISOString().split('T')[0]
dt.setDate(dt.getDate() - 1);
let yt = dt.toISOString().split('T')[0]
dt.setDate(dt.getDate() + 2)
let tm = dt.toISOString().split('T')[0]

document.getElementById("checkin").setAttribute('min', today);
document.getElementById("checkin").value = ""
document.getElementById("checkout").setAttribute('min', tm);
document.getElementById("checkout").value = ""




//readData()

function search() {
    console.log(document.getElementById("local").value)
}

function checkinMenor(){
    
    let cin=new Date(document.getElementById("checkin").value)
    let cout= new Date(document.getElementById("checkout").value)
    
    if (cin<cout){
        
        document.getElementById("button").disabled = false;
        document.getElementById("checkin").style.borderColor ="#ced4da"
        document.getElementById("checkout").style.borderColor ="#ced4da"
        
    } else{
        
        document.getElementById("button").disabled = true;
        document.getElementById("checkin").style.borderColor = "rgba(255, 26, 26)"
        document.getElementById("checkout").style.borderColor = "rgba(255, 26, 26)"
    }
    
}



function dias() {

    let cin = new Date(document.getElementById("checkin").value)
    let cout = new Date(document.getElementById("checkout").value)
    diasEstadia = (cout - cin) / (1000 * 60 * 60 * 24)
    return (diasEstadia)
}

async function readData() {
    container.innerHTML = ""
    const loading = document.createElement('div')
    loading.setAttribute('class', 'text-center')
    loading.innerHTML = '<div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>'
    container.appendChild(loading)


    const read = await fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
    const data = await read.json();

    //container.removeChild(loading)


    dias()

    showData(data, rowsPerPage, 1)
}


function showData(data, rowsPerPage, page) {

    container.innerHTML = ""

    let qtdHospedes = document.getElementById("qtdHospedes").value
    let start = rowsPerPage * (page - 1)
    let end = start + rowsPerPage

    if (end >= data.length) {
        end = data.length
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
                    class="card-img " ></div>
            <div class="col">
                <div class="card-body">
                    <h1 class="card-title">${room.name}</h1>
                    <p class="card-text">${room.property_type}</p>
                    <p class="card-text"><b>R$ ${room.price}</b>/noite</p>
                    <p class="card-text">Total de R$ ${room.price * diasEstadia} por ${diasEstadia} dias para ${qtdHospedes} pessoas</p>
                </div>
            </div>
        </div>`



        container.appendChild(card)

    }
    const pags = document.createElement('div')
    pags.innerHTML = ""
    container.appendChild(pags)
    pagination(data, page, pags,start,end)
}

function pagination(data, page, wrapper, start, end) {

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
  </nav> 
    <div class="text-center" style="max-width: 900px;" id="pgrodape"> ${start+1} - ${end} de ${data.length} quartos
    </div> `

    document.getElementById("previousId").addEventListener("click", function () {
        showData(data, rowsPerPage, (page - 1))
    })


    document.getElementById("nextId").addEventListener("click", function () {
        showData(data, rowsPerPage, (page + 1))
    })


    for (let i = 1; i <= numberOfPages; i++) {


        document.getElementById(`page${i}`).addEventListener("click", function () {
            showData(data, rowsPerPage, i)
        })
    }
}

