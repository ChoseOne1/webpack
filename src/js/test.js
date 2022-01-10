'use strict';


async function db(){
    let res = await fetch('/db')
    let js = await res.text()
    let ob = JSON.parse(js)
    console.log(ob)
}
// db()



async function getCookies(){
    let res = await fetch('/get-cookie')
    console.log(res.text())
}
// getCookies()

async function setCookies(){
    let res = await fetch('/set-cookie')
    console.log(res.text())
}
setCookies()

async function save(){
    let res = await fetch('/save')
    console.log(res)
}

// save()