const UsersModel = require('../models/UsersModel');
const {getPostData} = require('../utils');

// getalldata
async function getdata(req, res){
    try {
        const users = await UsersModel.getalldata()

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch (error) {
        console.error(error);
    }
}
// get user by id 
async function getUserById(req, res, id) {
    try {
        const user = await UsersModel.getId(id);
        if(!user){
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('user not found'));
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
    } catch (error) {
        console.error(error);
    }
}

// create user
async function create(req, res){
    try {
        const users = await UsersModel.getalldata();
        let id = users.length + 1;
        const body = await getPostData(req);
        const {name, phone, email} = JSON.parse(body);

        // regex validate phone and email
        const regexPhone = /^65[0-9]{8}$/;
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if(regexEmail.test(email) !== true && email !== undefined) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('Invalid email'));
            return
        };
        if(regexPhone.test(phone) !== true && phone !== undefined) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('Invalid phone'));
            return
        };
        // edit user
        const user = {
            id: id,
            name: name,
            phone: phone,
            email: email
        }

        const userNew = await UsersModel.create(user);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('create successfully'));
    } catch (error) {
        console.log(error);
    }
}
/// update user by id
async function updateUserById(req, res, id){
    const data = await UsersModel.getId(id);

    if(!data){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('user not found'));
    }else{
        const body = await getPostData(req);
        const {name, email, phone} = JSON.parse(body);

        // regex validate phone and email
        const regexPhone = /^65[0-9]{8}$/;
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if(regexEmail.test(email) !== true && email !== undefined) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('Invalid email'));
            return
        };
        if(regexPhone.test(phone) !== true && phone !== undefined) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('Invalid phone'));
            return
        };

        // edit user
        const user = {
            name: name || data.name,
            email: email || data.email,
            phone: phone || data.phone
        }

        const updateUser = await UsersModel.updateUserById(id, user)

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(updateUser));
    }
}

// delete user id
async function deleteUser(req, res, id) {
    try {
        const userid = await UsersModel.getId(id);
        if(!userid) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify('user not found'));
        }
        else {
            const user = await UsersModel.deleteid(id);
            const users = await UsersModel.getalldata()
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(users));
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getdata,
    getUserById,
    create,
    updateUserById,
    deleteUser
}