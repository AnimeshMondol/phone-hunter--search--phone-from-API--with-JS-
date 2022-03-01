document.getElementById('error-message').style.display = 'none';
document.getElementById('no-result-message').style.display = 'none';

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
        data.forEach(phones => {
            // console.log(phones.slug);
            let div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div onclick="loadPhoneDetails('${phones.slug}')" class="card h-100 rounded-3 card-background">
              <img src="${phones.image}" class="card-img-top p-4 card-img-bg" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-danger">Phone Brand:<span class="text-dark"> ${phones.phone_name}</span></h4>
                    <p class="card-text text-success">Model Name: <span class="text-dark"> ${phones.brand}</span></p>
                </div>
                    <div class="d-flex justify-content-center p-3">
                        <button onclick="loadPhoneDetails(${phones.slug})" type="button" class="btn btn-primary btn-sm">Show More Details</button>
                    </div>
        </div>
        `;
            searchResult.appendChild(div);


        });
        toggleSpinner('none');
    }
}

const loadPhoneDetails = phoneId => {
    console.log(phoneId)
}