document.getElementById('error-message').style.display = 'none';
document.getElementById('no-result-message').style.display = 'none';
document.getElementById('no-detail-message').style.display = 'none';
document.getElementById('show-all-button').style.display = 'none';

const toggleSpinner = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
}

const searchPhone = () => {
    let searchField = document.getElementById('search-phone');
    let searchTextByUSer = searchField.value;
    let searchText = searchTextByUSer.toLowerCase();
    // display spinner 
    toggleSpinner('block');
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('phone-detail').innerHTML = '';
    // clear input field 
    searchField.value = '';

    document.getElementById('no-result-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('no-result-message').style.display = 'block';
        toggleSpinner('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }


}

const displayPhones = data => {
    let searchResult = document.getElementById('search-result');

    if (data.length == 0) {
        document.getElementById('no-result-message').style.display = 'block';
        toggleSpinner('none');
    }
    else {
        data.slice(0, 20).forEach(phones => {
            // console.log(phones);

            let div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 rounded-3 card-background">
              <img src="${phones.image}" class="card-img-top p-4 card-img-bg" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-danger">Phone Name:<span class="text-dark"> ${phones.phone_name}</span></h4>
                    <p class="card-text text-success">Brand Name: <span class="text-dark"> ${phones.brand}</span></p>
                </div>
                    <div class="d-flex justify-content-center p-3">
                        <button onclick="loadPhoneDetails('${phones.slug}')" type="button" class="btn btn-primary btn-sm">Show More Details</button>
                    </div>
        </div>
        `;
            searchResult.appendChild(div);
        });
        document.getElementById('show-all-button').style.display = 'block';
        toggleSpinner('none');
    }
}

const loadPhoneDetails = phoneId => {
    document.getElementById('phone-detail').innerHTML = '';
    // console.log(phoneId);

    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    //  console.log(phone);
    const phoneDetails = document.getElementById('phone-detail');

    const div = document.createElement('div');
    div.classList.add('card', 'rounded-3');
    div.innerHTML = `
        <img src="${phone.image}" class="img-fluid p-5 card-image" alt="...">
            <div class="card-body p-4">
                <h2 class="card-title text-Success">Phone Name: <span class="text-primary">${phone.brand} ${phone.name}</span></h2>
                <h4 class="card-text text-success">Release Date: <span class="text-dark">${phone.releaseDate}</span></h4>
                <h3 class="card-text text-danger">MAIN FEATURES:</h3>
                <h6 class="card-text text-primary">ChipSet: <span class="text-dark">${phone.mainFeatures.chipSet}</span></h6>
                <h6 class="card-text text-primary">Display Size: <span class="text-dark">${phone.mainFeatures.displaySize}</span></h6>
                <h6 class="card-text text-primary">Memory Size: <span class="text-dark">${phone.mainFeatures.memory}</span></h6>
                <h6 class="card-text text-primary">Storage Size: <span class="text-dark">${phone.mainFeatures.storage}</span></h6>
                <h3 class="card-text text-danger">OTHERS:</h3>
                <h6 class="card-text text-primary">Bluetooth: <span class="text-dark">${phone.others.Bluetooth}</span></h6>
                <h6 class="card-text text-primary">GPS: <span class="text-dark">${phone.others.GPS}</span></h6>
                <h6 class="card-text text-primary">NFC: <span class="text-dark">${phone.others.NFC}</span></h6>
                <h6 class="card-text text-primary">Radio: <span class="text-dark">${phone.others.Radio}</span></h6>
                <h6 class="card-text text-primary">USB: <span class="text-dark">${phone.others.USB}</span></h6>
                <h6 class="card-text text-primary">WLAN: <span class="text-dark">${phone.others.WLAN}</span></h6>
                <h3 class="card-text text-danger">SENSORS:</h3>
                <h6 class="card-text text-primary">Sensors: <span class="text-dark">${phone.mainFeatures.sensors}</span></h6>
            </div>
    `;

    phoneDetails.appendChild(div);
}