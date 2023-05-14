
function displayData(data, id){
    const tbody = document.getElementById(id)

    tbody.innerHTML = ""
    
    for(let i = 0; i < data.length; i++){
        let element = data[i]
        const tr = document.createElement("tr")

        const td1 = document.createElement("td")
        td1.innerText = element.id 
        td1.id="id"
        td1.class="id"

        const td2 = document.createElement("td")
        td2.id="name"
        td2.class="name"

        const img = document.createElement("img")
        img.src = element.img_src
        td2.appendChild(img)

        const p = document.createElement("p")
        p.innerText = element.first_name + " " + element.last_name
        td2.appendChild(p)

        const td3 = document.createElement("td")
        td3.innerText = element.gender
        td3.id="gender"
        td3.class="gender"

        const td4 = document.createElement("td")
        td4.innerText = element.class
        td4.id="class"
        td3.class="class"

        const td5 = document.createElement("td")
        td5.innerText = element.marks
        td5.id="marks"
        td3.class="marks"

        const td6 = document.createElement("td")
        td6.id="passing"
        td3.class="passing"
        if(element.passing === true)
            td6.innerText = "Passing"
        else 
            td6.innerText = "Failed"

        const td7 = document.createElement("td")
        td7.innerText = element.email
        td7.id="email"
        td7.class="email"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)

        tbody.append(tr)

    }
}

async function loadData(){
    let response = await fetch('./MOCK_DATA.json')
    let data = await response.json()

    displayData(data, "addData")
    return data
}

function sortByAscending(data){

    data.sort((a, b) => {
        let fa = a.first_name.toLowerCase()
            fb = b.first_name.toLowerCase()
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    
    displayData(data, "addData")
}

function sortByDescending(data){
    data.sort((a, b) => {
        let fa = a.first_name.toLowerCase()
            fb = b.first_name.toLowerCase()
    
        if (fa > fb) {
            return -1;
        }
        if (fa < fb) {
            return 1;
        }
        return 0;
    });
    
    displayData(data, "addData")
}

function sortByMarks(data){
    data.sort((a, b) => {
        return a.marks - b.marks;
    });
    
    displayData(data, "addData")
}

function sortByPassing(data){
    data = data.filter((ele) => {
        return ele.passing === true
    })
    
    displayData(data, "addData")
}

function sortByClass(data){
    data.sort((a, b) => {
        return a.class - b.class;
    });

    displayData(data, "addData")
}


function sortByGender(data){
    let femaleData = []
    let maleData = []

    data.forEach((ele) => {
        if(ele.gender == "Female"){
            femaleData.push(ele)
        }
        else if(ele.gender == "Male"){
            maleData.push(ele)
        }
    })

    displayData(femaleData, "addData-female")

    displayData(maleData, "addData-male")
}


function sortArray(event, data){

    const table_all = document.getElementById("all")
    const table_female = document.getElementById("female")
    const table_male = document.getElementById("male")

    table_all.style.display = 'table'
    table_female.style.display = 'none'
    table_male.style.display = 'none'

    let id = event.target.id
    let sort_by = id.slice(5, id.length)

    if(sort_by === "asc"){
        sortByAscending(data)
    }
    else if(sort_by === "dsc"){
        sortByDescending(data)
    }
    else if(sort_by === "marks"){
        sortByMarks(data)
    }
    else if(sort_by === "pass"){
        sortByPassing(data)
    }
    else if(sort_by === "class"){
        sortByClass(data)
    }
    else if(sort_by === "gender"){
        table_all.style.display = 'none'
        table_female.style.display = 'table'
        table_male.style.display = 'table'

        sortByGender(data)
    }
}

function searchData(data){
    const table_all = document.getElementById("all")
    const table_female = document.getElementById("female")
    const table_male = document.getElementById("male")

    table_all.style.display = 'table'
    table_female.style.display = 'none'
    table_male.style.display = 'none'

    const input = document.getElementById("input-searchdata")
    let str = input.value.toLowerCase()
    let searchedData = []
    data.forEach((ele) => {
        let name = ele.first_name.toLowerCase() + " " + ele.last_name.toLowerCase()
        let email = ele.email
        if(name.includes(str) || email.includes(str)){
            searchedData.push(ele)
        }
    })
   
    displayData(searchedData, "addData")
}

async function studentProfile(){
    let result = await loadData()

    const search = document.getElementById("search")
    const buttons = document.getElementsByClassName("sort")
    
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", (e) => {
            sortArray(e, result)
        })
    }

    search.addEventListener("click", () => {
        searchData(result)
    })
}
studentProfile()