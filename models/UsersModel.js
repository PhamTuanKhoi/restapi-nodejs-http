let Users = require('../data/Users.json');
const { writeDataToFile } = require('../utils')

function getalldata() {
    return new Promise((resolve, reject) => {
        resolve(Users)
    })
}

function getId(id){
    return new Promise((resolve, reject) => {
        const user = Users.find((data) => data.id === id);
        resolve(user)
    })
}

function create(user){
    return new Promise((resolve, reject) => {
        const data  = Users.push(user);
        writeDataToFile('./data/Users.json', Users);
        resolve(data);
    })
}

function updateUserById(id, user){
    return new Promise((resolve, reject) => {
        // lay chi so index
        const index =  Users.findIndex(data => data.id === id);
        Users[index] = {id, ...user}
        writeDataToFile('./data/Users.json', Users);
        resolve(Users[index])
    })
}

function deleteid(id){
    return new Promise((resolve, reject) =>{
        Users = Users.filter(data => data.id !== id)   //let de duoc truy cap
        writeDataToFile('./data/Users.json', Users);
        resolve()
    })
}
module.exports = {
    getalldata,
    getId,
    create,
    updateUserById,
    deleteid
}