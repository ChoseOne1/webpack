"use strict";



let close = document.querySelector('.basket-close')
let basketBlock = document.querySelector('.basket-loc')
let overl = document.querySelector('.overl');
let basket = document.querySelector('.basket')
let modul = document.querySelector('.module');
let overlay = document.querySelector('.overlay');
let order = document.querySelector('.basket-order')
let parentOrder = document.querySelector('.basket-box-order')
let orders = document.querySelectorAll('.basket-order')
let weights = document.querySelectorAll('.weight')
let prices = document.querySelectorAll('.price')
let del = document.querySelectorAll('.basket-delete')
let basketNum = document.querySelector('.basket-number')

 


// --------функция скрытие окна корзины, прявиязка к крестику

function hideModal(){
    basketBlock.style.display = "none"
    overl.classList.remove('active');
    remuve()
}

close.addEventListener('click', hideModal)

// --------скрытие окна корзины по клиику на поле вне зоны окна

function remuve(){
    for(let i = 0; i < orders.length; i++){
        orders[i].remove()
    }
}

window.onclick = function(event) {
    if (event.target == overl) {
        overl.classList.remove('active');
        basketBlock.style.display = "none";
        remuve()
    } else if(event.target == overlay){
        overlay.classList.remove('active');
        modul.style.display = "none";
        
    }
}

// создание модального окна выбранного товара по клику на корзину

basket.addEventListener('click', addOrdersBasket)



function addOrdersBasket(){
    basketBlock.style.display = "block"
    overl.classList.add('active');


    // запрос на сервер-бд с выводом добавленного товара

    function list(){
        fetch('/sendList')
        .then(response => response.json())
        .then(result => addList(result))
    }
    list()

    function addList(res){
//   функция создание клонов существющего дива, и внесения в него данных с результата ответа сервера
        function formList(property, key) {
            let prime = order.cloneNode(true)
            parentOrder.appendChild(prime)
 
            prime.childNodes[1].style.backgroundImage = `url(${property.pat})`
            prime.childNodes[3].childNodes[1].childNodes[1].innerText = property.product;
            prime.childNodes[3].childNodes[1].childNodes[3].childNodes[1].value = property.price
            prime.childNodes[3].childNodes[1].childNodes[3].childNodes[4].value = property.weight
            prime.childNodes[3].childNodes[1].childNodes[3].childNodes[7].innerText = property.fixPrice
            prime.childNodes[3].childNodes[1].childNodes[5].innerText = key
        }
        

        // функция определения количества создаваемых клонов

        function sort() {
            if(Object.entries(res).length == 0){
                console.log('none')
            } else {
                order.style.display = 'flex'
                order.remove()
                for(let key in res){
                    formList(res[key], key)

                }
                
                // обновление переменных с учетом созданых клонов
                orders = document.querySelectorAll('.basket-order')
                weights = document.querySelectorAll('.weight')
                prices = document.querySelectorAll('.price')
                del = document.querySelectorAll('.basket-delete')
                
                
            }
        }
        sort()
        
        // функции калькуляторы для инпута расчет веса цены
        let fixPrice = '';
        for(let i = 0; i < weights.length; i++){
            weights[i].oninput = function (){
                fixPrice = this.nextElementSibling.nextElementSibling.innerText 
                let b = fixPrice / 1000;
                this.previousElementSibling.previousElementSibling.value = Math.round(b * this.value);
            }
        }
        
        for(let i = 0; i < prices.length; i++){

            prices[i].oninput = function (){
                console.log(this.nextElementSibling.nextElementSibling)
                fixPrice = this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText 
                let j = fixPrice / 1000;
                this.nextElementSibling.nextElementSibling.value = Math.round(this.value / j);
            }
        }
        
        // удаление товара с передачей на сервер

        for(let i = 0; i < del.length; i++){
            del[i].addEventListener('click', deleteOrder)
        }
        function deleteOrder(){
            // this.parentNode.parentNode.parentNode.remove()
            let val = this.previousElementSibling.innerText
            console.log(val)
            function sendDelOrder(){
                fetch('/delOrder', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({"products": val})
                })
                .then(response => console.log(response))
            }
            sendDelOrder()
        }
    }
}
   

