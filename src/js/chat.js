"use strict";

// import res = require("express/lib/response");

// const { get } = require("express/lib/response");

let button = document.querySelector('.hide');
let chat = document.querySelector('.chat');


    


function openChat(){
    if(button.textContent == "скрыть чат"){
        chat.style.bottom = '-550px'
        button.textContent = "раскрыть чат"
    } else if(button.textContent == "раскрыть чат"){
        chat.style.bottom = '0px'
        button.textContent = "скрыть чат"
    }
    
}

button.addEventListener('click', openChat);




let us = {
    name: 'John',
    surname: 'Smith'
  };

async function f(){
    let res = await fetch('')
    if(res.ok){
        console.log('s')
    }
}

// async function f(){
//     let parse = []
//     const data = {
//         name: this.name,
//         status: "created"
//     }
//     let res = await fetch('/api/server', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify(data)
//             })
//             parse = await res.json();
//             console.log(parse);

//     if(res.ok){
//         console.log('s')
//     }
// }
// f()