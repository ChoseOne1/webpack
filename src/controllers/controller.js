const {findItem, addOrUpdateCharacter, addProduct, queryItem, deleteItem}  = require('../dynamo/dynamo')



exports.addUser = async function(req, res){
    try {
        const characters = await addOrUpdateCharacter(req.session.id)
        res.send(characters)
    } catch(err){
        res.status(200).json({err: 'its normal'})
    }
}

exports.items = async function(req, res){
    try{
        const items = await queryItem(req.session.id)
        res.send(items.Items[0].products)
        // console.log(items.Items[0].products)
    } catch(err){
        res.status(200).json({err: "restart"})
    }
}

exports.addProd = async function(req, res){
    try{
        const data = await req.body
        const prod = await addProduct(req.session.id, data)
        const items = await queryItem(req.session.id)
        console.log(items.Items[0].products)
        
        res.send(items.Items[0].products)

    } catch(err){
        console.log(err)
        res.status(50).json('error')
    }
}

exports.findId = async function(req, res){
    try{
        const data = await req.session.id
        const find = await findItem(data)
        
    } catch(err){
        console.log(err)
        res.status(500).json({err: 'error'})
    }
}

exports.delOrder = async function(req, res){
    try{
        const request = req.body.products
        console.log(request)
        const item = await deleteItem(req.session.id, request)
        // const fi = await req
        
        res.send('ds')
    } catch(err){
        console.log(err)
        res.status(500).json({err: "error"})
    }
}

