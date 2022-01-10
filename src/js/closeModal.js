"use strict";

let close = document.querySelector('.module-close');
let modul = document.querySelector('.module');
let buttonWeight = document.querySelector('.weight');
let buttonPrice = document.querySelector('.sum');
let overlay = document.querySelector('.overlay');
let addBasket = document.querySelector('.take-basket')
let moduleName = document.querySelector('.module-text-name')
let img = document.querySelector('.module-img')
let overl = document.querySelector('.overl');
let basket = document.querySelector('.basket-number')

let basketNum = document.querySelector('.basket-number')


//---------- присваивание пользовательлю id, фиксируем в бд

function createUser(){
    fetch("/id")
    .then(response => response.json())
    .then(result => lis())
}

createUser()  


// --------счетчик товара в корзине при прогрузке страницы
function lis(){
    fetch('/sendList')
    .then(response => response.json())
    .then(result => {
        if(result.err == "restart"){
            basketNum .style.display = 'none'
        } else if(Object.entries(result).length > 0){
            basketNum .style.display = 'block'
            basketNum .innerHTML = Object.entries(result).length
        } else {
            basketNum .style.display = 'none'
        }
    })
}

// -------------генератор ключа для выбранного товара(чтоб в бд мог дублироваться один вид продукта)

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


// создание схемы под продукт

function Product(name, price, weight, path) {
    this[makeid()] = {
        product: name,
        weight: weight,
        price: price,
        pat: path,
        get fixPrice(){
            let res = this.price / this.weight
            return res * 1000
        }
    }
}


// добавление товара в корзину

addBasket.addEventListener('click', addProduct)
let orders = {}
function addProduct(){
    let prod = new Product(moduleName.textContent, buttonPrice.value, buttonWeight.value, img.src)

    // отправка выбранного товара в бд
    function sendProd() {
        fetch('/sendProd', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(prod)
        })
        .then(response => response.json())
        .then(result => numberBasket(result))
        function numberBasket(res){
            basket.style.display = 'block'
            basket.innerHTML = Object.entries(res).length
            localStorage.setItem("orders", Object.entries(res).length)
        }
    }
    sendProd()

    
    hideModal()
}

//--- скрытие можального окна 

function hideModal(){
    modul.style.display = "none"
    overlay.classList.remove('active');
}

close.addEventListener('click', hideModal)








