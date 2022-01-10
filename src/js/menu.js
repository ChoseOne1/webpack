"use strict";

import obj from './card.js';

let out = [];
let menuCard = document.querySelector('.menu-card');
let button = document.querySelectorAll('.menu-item-content');
let card = [];
let weight = document.querySelector(".weight");
let price = document.querySelector('.sum');
let fixPrice = '';

function def(){
    let action = event.target.dataset.action;
    
    
      if(action) {
            if(event.target.parentNode.className == "menu-item-list vegetables") {
                return obj.vegetables[action];
            } else if(event.target.parentNode.className == "menu-item-list fruits") {
                return obj.fruits[action];
            } else if(event.target.parentNode.className == "menu-item-list berry") {
                return obj.berry[action];  
            } else {
                return obj.nuts[action];  
            }
      }
}

function addProduct() {
    
    

    for(let key in def()) {
        out.push("<img class='card-img' src='" + def()[key].img + "'>" +
        "<div class='card-name'>" + def()[key].name + "</div>" + '<br>' +
        "<div class='card-from'>" + def()[key].from + "</div>" + '<br>' +
        "<div class='card-price'>" + def()[key].price + '<p class="text-price">' 
        + "руб./кг" + '</p>' + '<img class="basket-img" src="./image/basket-card.svg" >' 
        + '<img class="basket-plus" src="./image/basket-plus.svg">' + "</div>" + "<br>");
    } 

    function addBord(){   
        
        if(!document.querySelector('.card')){
            for(let i = 0; i < Object.keys(def()).length; i++){
                let cardDiv = document.createElement('div');
                cardDiv.className = "card";
                menuCard.appendChild(cardDiv)
                
            }
        } else {
            
            return
        }  
    }
    
    addBord()
}


// -------------------создаем див карточку


function rem(){
    if(document.querySelectorAll('.card')){
        document.querySelectorAll('.card').forEach(element => {
            out = []
                element.parentNode.removeChild(element)
            })
        };
}


function loadScr(out) {
    
        
    return new Promise (function(resolve, reject){
            let cards = document.querySelectorAll('.card');
    
            card = cards;
    
        for(let i = 0; i < card.length; i++){
            card[i].innerHTML = out[i]
            
            
            
            
        }
        card.onload = () => resolve(card)
        })
         
}

let overl = document.querySelector('.overlay');
 // вызов модального окна
 function addModule(){
    if(card){
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener('click', function(){
                
                function reg(){
                    return new Promise(function(resolve, reject){
                        overl.classList.add("active")

                        let name = document.querySelector(".module-text-name")
                        let modul = document.querySelector('.module');
                        let img = document.querySelector('.module-img');
                        
                        if(event.currentTarget){
                            weight.value = 1000;
                            img.src = event.currentTarget.childNodes[0].src;
                            name.innerHTML = event.currentTarget.childNodes[1].innerText;
                            fixPrice = event.currentTarget.childNodes[5].childNodes[0].wholeText;
                            price.value = event.currentTarget.childNodes[5].childNodes[0].wholeText;
                        }

                        img.onload = () => resolve(img)
                        img.onerror = () => reject(new Error("error ${img}"))
                        modul.style.display = 'block';
                    })
                }

                let promise = reg()
               
            })            
        }
    }                    
}
function addCards(){
    rem()
    
    addProduct()
    
    let promise = loadScr(out)

    promise.then(addModule())

}

for(let i = 0; i < button.length; i++){
    
    button[i].addEventListener('click', addCards);
    
    
}


price.oninput = function (){
    let j = fixPrice / 1000;
    weight.value = Math.round(price.value / j);
}

weight.oninput = function (){
    let b = fixPrice / 1000;
    price.value = Math.round(b * weight.value);
}