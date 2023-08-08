const loadPhones = (searchField, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
};
const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 12)
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noFounPhone = document.getElementById('no-found');
    if (phones.length === 0) {
        noFounPhone.classList.remove('d-none')
    }
    else {
        noFounPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="p-4 card-img-top" alt="">
            <div class= "card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.</p>
            <a data-bs-toggle="modal" data-bs-target="#phoneModal" onclick="loadPhoneDetails('${phone.slug}')" class="text-white btns-css">Show Details</a>
            </div>
        </div>
    `;
        phoneContainer.appendChild(phoneDiv)

    })

    toggleLoad(false);
};

const loadPhoneSearch = (dataLimit) => {
    toggleLoad(true);
    const searchField = document.getElementById('searchField').value;
    loadPhones(searchField, dataLimit)
};


document.getElementById('control-btn').addEventListener('click', function () {
    loadPhoneSearch(10);
});
document.getElementById('searchField').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        loadPhoneSearch(10);
    }

});


const toggleLoad = isLoads => {
    const loader = document.getElementById('loader');
    if (isLoads) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
};


document.getElementById('show-all-btn').addEventListener('click', function () {
    loadPhoneSearch();
});



const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
};
const displayPhoneDetails = phoneModal => {
    console.log(phoneModal);
    const phoneName = document.getElementById('phoneModalLabel');
    phoneName.innerText =
        phoneModal.name;
    const phoneBody = document.getElementById('phone-details-body');
    phoneBody.innerHTML = `
    <img class="margin-css" src="${phoneModal.image}">
   <ul>
   <li><span class="fw-medium">Release Date: </span>${phoneModal.releaseDate ? phoneModal.releaseDate : 'Release Date Not Found'}</li>
   <li><spna class="fw-medium">Bluetooth: </spna>${phoneModal.others ? phoneModal.others.Bluetooth : 'No Bluetooth Information'}</li>
   <li><spna class="fw-medium">Storage: </spna>${phoneModal.mainFeatures ? phoneModal.mainFeatures.storage : 'No Storage Information'}</li>
   <li><spna class="fw-medium">Chip Set: </spna>${phoneModal.mainFeatures ? phoneModal.mainFeatures.chipSet : 'No Chip Set Information'}</li>
   <li><spna class="fw-medium">Display Size: </spna>${phoneModal.mainFeatures ? phoneModal.mainFeatures.displaySize : 'No Display Size Information'}</li>
   <li><spna class="fw-medium">USB: </spna>${phoneModal.others ? phoneModal.others.USB : 'No USB Information'}</li>
   </ul>
    `;
};

loadPhones('apple');