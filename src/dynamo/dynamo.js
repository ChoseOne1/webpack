const AWS = require('aws-sdk');

require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'data';



const findItem = async (char) => {
    const params = {   
        TableName: TABLE_NAME,
        Key : {"products": char}

    }
    const characters = await dynamoClient.get(params).promise();
    return characters
}



const queryItem = async (ide) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: `id = :id`,
        ExpressionAttributeValues: {":id": `${ide}`}
    }

    return await dynamoClient.query(params).promise()
}



const addOrUpdateCharacter = async (character) => {
    
    const params = {
        TableName: TABLE_NAME,
        Item: {id: character, products: {}, contacts: {}},
        ConditionExpression: "attribute_not_exists(products)"
    }
    
    return await dynamoClient.put(params).promise()
}



const addProduct = async (char, prod) => {
    const cha = Object.keys(prod)
    const params = {
        TableName: TABLE_NAME,
        Key: {id: char}, products: {},
        UpdateExpression:  `set products.${cha[0]} = :pr`,
        ExpressionAttributeValues: {   
            ":pr": {
                "product": `${prod[cha].product}`,
                "weight": `${prod[cha].weight}`,
                "price": `${prod[cha].price}`,
                "pat": `${prod[cha].pat}`,
                "fixPrice": `${prod[cha].fixPrice}`
            }
        },
        ReturnValues:"UPDATED_NEW"

    }
    return await dynamoClient.update(params, function(err, data){
        if(err){
            console.error(JSON.stringify(err, null, 2))
        }
    }).promise()

}

const deleteItem = async (char, key) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "id": char,
            "products": key
        }

    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    findItem,
    addOrUpdateCharacter,
    addProduct,
    queryItem,
    deleteItem

}
