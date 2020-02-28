/*
https://randomuser.me/api/portraits/med/men/17.jpg
https://randomuser.me/api/portraits/med/women/17.jpg
*/

fetch('/data.json').
    then((res) => res.json() ).   // obtain data as json
    then( (data) => {

        let artists = document.getElementById("artists");

        let info = [data.name, data.about, data.url];
        let newArtist = addInfo(info)

        artists.appendChild(newArtist);

        console.log(data);
    }).
    catch((err) => console.log(err));


function toggleForm() {
    let form = document.getElementById("form");

    if (form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}

function searchArtist() {
    var i, searchInput, filter, list, li, thisCard, thisName;
    searchInput = document.getElementById("search");
    filter = searchInput.value.toLowerCase();
    list = document.getElementById("artists");
    li = list.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        thisCard = li[i].getElementsByClassName("nameDiv")[0];
        thisName = thisCard.innerText.toLowerCase();
        if (thisName.indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
    searchUser(searchInput);
}

function searchUser(string){
    fetch("/search").
    then((res)=>{
        return res.json();
    }).then((data)=>{
        data.forEach((obj)=>{
            if (obj.name.toUpperCase().includes(string.toUpperCase())){
            loadArtist(obj.name, obj.description, obj.link);
            }
        });
    })
}

function loadJson(){
    fetch('/load')
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        data.forEach((obj)=>{
            loadArtist(obj.name, obj.description, obj.link);
        })
    }) 
}

function loadArtist(name, about, url) {
    let li = document.createElement("li");
    li.className = "lists";

    let outerDiv = document.createElement("div");
    outerDiv.className = "outerDiv";
    li.appendChild(outerDiv)

    let innerDiv = document.createElement("div");
    innerDiv.className = "innerDiv";
    outerDiv.appendChild(innerDiv);

    let imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";
    innerDiv.appendChild(imgDiv);
    
    let textDiv = document.createElement("div");
    textDiv.className = "textDiv";
    innerDiv.appendChild(textDiv);
    
    let nameDiv = document.createElement("div");
    nameDiv.className = "nameDiv";
    textDiv.appendChild(nameDiv);
    
    let infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";
    textDiv.appendChild(infoDiv);

    let imgElement = document.createElement("img");
    imgElement.src = url;
    imgDiv.appendChild(imgElement);

    let nameElement = document.createElement("b");
    nameElement.innerText = name;
    nameDiv.appendChild(nameElement);

    let infoElement = document.createElement("p");
    infoElement.innerText = about;
    infoDiv.appendChild(infoElement);

    let deleteDiv = document.createElement("div");
    deleteDiv.className = "deleteArist";
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "deleteBtn";

    deleteBtn.onclick = function() {
        deleteBtn.parentNode.parentNode.parentNode.parentNode.removeChild(outerDiv);

    };

    deleteDiv.appendChild(deleteBtn);
    innerDiv.appendChild(deleteDiv);
    
}

function add() {
    toggleForm();

    let artists = document.getElementById("artists");

    let name = document.getElementById('name').value;
    let about = document.getElementById('about').value;
    let url = document.getElementById('url').value;

    let info = [name, about, url];
    
    addJson(info);

    console.log(localStorage)
}

function addJson(obj){
    fetch("/add", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
       })
       .then((response) => console.log(response))
       .catch((err) => console.log(err))
}


function addInfo(info) {
    let li = document.createElement("li");
    li.className = "lists";

    let outerDiv = document.createElement("div");
    outerDiv.className = "outerDiv";
    li.appendChild(outerDiv)

    let innerDiv = document.createElement("div");
    innerDiv.className = "innerDiv";
    outerDiv.appendChild(innerDiv);

    let imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";
    innerDiv.appendChild(imgDiv);
    
    let textDiv = document.createElement("div");
    textDiv.className = "textDiv";
    innerDiv.appendChild(textDiv);
    
    let nameDiv = document.createElement("div");
    nameDiv.className = "nameDiv";
    textDiv.appendChild(nameDiv);
    
    let infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";
    textDiv.appendChild(infoDiv);

    let imgElement = document.createElement("img");
    imgElement.src = info[2];
    imgDiv.appendChild(imgElement);

    let nameElement = document.createElement("b");
    nameElement.innerText = info[0];
    nameDiv.appendChild(nameElement);

    let infoElement = document.createElement("p");
    infoElement.innerText = info[1];
    infoDiv.appendChild(infoElement);

    let deleteDiv = document.createElement("div");
    deleteDiv.className = "deleteArist";
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "deleteBtn";

    deleteBtn.onclick = function() {
        deleteBtn.parentNode.parentNode.parentNode.parentNode.removeChild(outerDiv);
        localStorage.removeItem(nameElement.innerText);

    };

    deleteDiv.appendChild(deleteBtn);
    innerDiv.appendChild(deleteDiv);

    return li;
}



loadJson();