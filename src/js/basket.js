"use strict";






let basketNum = document.querySelector('.basket-number')
let name = document.querySelector('.basket-name')
let price = document.querySelector('.price')
let weight = document.querySelector('.weight')
let basketImg = document.querySelector('.basket-img')
let block = document.querySelector('.basket-order')
let blo = document.querySelector('.basket-box-order')
let none = document.querySelector('.basket-box')

// none.style.display = 'none'

function basketNunF(){
    if(localStorage.length == '1'){
        basketNum.style.display = 'none';
    } else {
        localStorage.setItem('basket', localStorage.length)
        basketNum.innerText = localStorage.length - 1
        basketNum.style.display = 'inline-block';
        let observer = new MutationObserver(MutationRecord => {

        })
    
        observer.observe(basketNum, {
            characterData: true
        })
    }
    
}    

window.addEventListener('storage', basketNunF())


function addDiv() {
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        if(key != "basket"){
            let raw = (key, localStorage.getItem(key))
            let g = JSON.parse(raw)
            console.log(localStorage.getItem(key))
    
    
            function fillingCard(){
                name.innerText = g['продукт']
                price.value = g['цена']
                weight.value = g['вес']
                basketImg.style.backgroundImage = `url(${g['path']})`
            }
            fillingCard()
    
            let e = block.cloneNode(true)
            
            blo.append(e)
     
        } 
    }
    block.remove()
}

// addDiv()

async function le(){
    let res = await fetch('/ret')
    let com = await res.json()
    console.log(com)
}



le()












