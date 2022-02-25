/* 
TODO:
-
-
-
-
-
-


*/

/* step 1 select all necessary elements  */
const searchField = document.getElementById("search-field")
const breedsWrapper = document.getElementById("breeds-wrapper");

/* step 2 load breeds from api  */
const loadBreeds = () => {
    fetch(`https://api.thedogapi.com/v1/breeds`)
        .then(response => response.json())
        .then(breeds => displayBreeds(breeds))
}


/* step 2 search for breeds items */
searchField.addEventListener('input', (event) => {
    let value = event.target.value.toLowerCase();
    fetch(`https://api.thedogapi.com/v1/breeds`)
        .then(response => response.json())
        .then(breeds => {
            const searchedBreeds = breeds.filter((breed) => breed.name.toLowerCase().includes(value))
            if (searchedBreeds.length === 0) {
                breedsWrapper.innerHTML = `<h1 class="text-center text-danger">Not Found Breeds</h1>`;
            } else {
                displayBreeds(searchedBreeds)
            }
        })
})

/* step 3 display breeds on UI  */
const displayBreeds = (breeds) => {
    breedsWrapper.textContent = '';
    breeds.forEach((breed) => {
        breedsWrapper.innerHTML += `
                                <div class="col-lg-3 cursor-pointer" onclick="loadModalData(${breed.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div class="card p-2">
                                        <img src="${breed.image.url}" style="height:210px;object-fit:cover;" class="rounded-1 img-fluid card-img-top" alt="image for breeds">
                                        <div class="card-body px-0 d-flex align-items-center justify-content-between">
                                            <div>
                                                <h3 class="card-title h6">${breed.name.slice(0, 30)} </h3>
                                                <p class="text-dark m-0">${breed.origin ? breed.origin : 'Not Available'}</p>
                                            </div>
                                            <p class="text-dark m-0 bg-light p-2 font-poppins h6">${breed.breed_group ? breed.breed_group : 'Nill'}</p>
                                        </div>
                                    </div>
                                </div>`;
    });
}

/* step 4 load modal data from  */
const loadModalData = (breedId) => {
    fetch(`https://api.thedogapi.com/v1/breeds`)
        .then(response => response.json())
        .then(breeds => {
            const singleBreed = breeds.find((breed) => breed.id === breedId);
            displayModalData(singleBreed)
        })

}

/* step 5 display modal data in UI  */
const displayModalData = (breed) => {
    const modalWrapper = document.getElementById("modal-content")
    let {
        imperial,
        metric
    } = breed.weight;
    modalWrapper.innerHTML = `
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${breed.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${breed.image.url}"
                                style="width: 100%;height:300px;object-fit: cover;object-position: center top;"
                                alt="image for single">
                            <div class="modal-text my-2">
                                <table class="table">
                                    <tr>
                                        <th>Weight :</th>
                                        <td>Imperial: <strong> ${imperial}</strong>, Metric :<strong> ${metric}</strong></td> 
                                    </tr>
                                    <tr>
                                        <th>Height :</th>
                                        <td>
                                        Imperial: <strong> ${breed.height.imperial}</strong>, Metric :<strong> ${breed.height.metric}</strong>
                                        </td>
                                    </tr>

                                </table>
                                <table class="table">
                                    <tr>
                                        <th>Breed group :</th>
                                        <td>${breed.breed_group ? breed.breed_group : 'Not Available'}</td>
                                        <th>Life span :</th>
                                        <td>${breed.life_span}</td>
                                    </tr>
                                    <tr>
                                        <th>Bread For :</th> 
                                        <td>${breed.bred_for}</td>  
                                        <th>Origin :</th>
                                        <td>${breed.origin ? breed.origin : 'Not Available'}</td>
                                    </tr>
                                </table>
                                <table class="table">
                                    <tr>
                                        <th>Temperament :</th>
                                        <td>${breed.temperament}</td>              
                                    </tr>
                                </table>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>`;
}


/* calling all of global function  */
loadBreeds();