function handleLoad(){

    var form = document.querySelector('.mainForm');

//Refresh List

function refreshList(){
    fetch('/api/vehicle').then((raw) => {
        return raw.json();
    })
    .then((inf) => {

        var carContainer = document.querySelector('.container__cars');
        carContainer.innerHTML = "";
        inf.forEach((element) => {
            var vehicle = document.createElement('div');
            vehicle.classList.add('car');
            vehicle.innerHTML = '<p class="car__brand">'+element.brand+'</p><p class="car__wheels">'+element.wheels+'</p><img src="/img/edit.svg" alt="" class="car__edit"><img src="/img/delete.svg" alt="" class="car__delete">';
            carContainer.appendChild(vehicle);
            vehicle.style.backgroundColor = element.color;
            console.log('Agregado carrito');

        });

        //Delete vehicle
        var supr = document.querySelectorAll('.car__delete');

        supr.forEach((btn, index) => {
            btn.addEventListener('click', () => {

                var data = new URLSearchParams();
    
                data.append('index', index);
    
                fetch('/api/vehicle', {
                    method: 'DELETE',
                    body: data
                })
                .then(raw =>{
                    return raw.json();
                })
                .then(elmDelete => {
                    refreshList();
                    console.log(elmDelete);
                });
            })

        });

    });
}

refreshList();

//Send info
form.addEventListener('submit', () => {

    event.preventDefault();

    var info = new FormData(form);

    var data = new URLSearchParams(info);

    var promise = fetch('api/vehicle', {
        method: 'POST',
        body: data
    });

    promise.then((raw) => {
        return raw.json();
    })
    .then((inf) => {
        form.reset();
        refreshList();
        console.log(inf);
    })
});




}

window.addEventListener('load', handleLoad);