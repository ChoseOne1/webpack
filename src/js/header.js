"use strict";
let call = document.querySelector('.call');
let inputCall = document.querySelector('.nav-call')
let buttonSub = document.querySelector('.nav-call-sub')
let buttonContact = document.querySelector('.contact')
let busketNum = document.querySelector('.basket-number')

// -----------------------обратный звонок----------------------


call.addEventListener('click', () => {
    if(inputCall.style.display == ""){
        inputCall.style.display = "inline-block";
        buttonSub.style.display = "inline-block";
    } else {
        inputCall.style.display = "";
        buttonSub.style.display = "";
        
    }
    
})

buttonSub.addEventListener('click', () => {
    inputCall.style.display = "";
    buttonSub.style.display = "";
})

buttonContact.addEventListener('click', () => {
    window.scrollTo({
        top: 9000,
        behavior: "smooth"
    });
})