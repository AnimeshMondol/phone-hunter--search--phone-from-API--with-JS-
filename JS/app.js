const toggleSpinner = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
}

const searchPhone = () => {
    let searchField = document.getElementById('search-phone');
    let searchTextByUSer = searchField.value;
    let searchText = searchTextByUSer.toLowerCase();
    // display spinner 
    toggleSpinner('block');
    // clear input field 
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))

}

const displayPhones = data => {
    let searchResult = document.getElementById('search-result');
    data.forEach(phones => {
        console.log(phones.phone_name);
        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 rounded-3">
              <img src="${phones.image}" class="card-img-top p-5 bg-info" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-danger">Phone Brand:<span class="text-dark"> ${phones.phone_name}</span></h4>
                    <p class="card-text text-success">Model Name: <span class="text-dark"> ${phones.brand}</span></p>
                </div>
                    <div class="d-flex justify-content-center p-3">
                        <button type="button" class="btn btn-primary btn-sm">Show More Details</button>
                    </div>
        </div>
        `;
        searchResult.appendChild(div);

    });
    toggleSpinner('none');
} 