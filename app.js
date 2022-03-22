const http = require('http');
const { getdata, getUserById, create, updateUserById, deleteUser } = require('./controllers/UsersController');


const server = http.createServer((req, res) => {
    // getalldata
    if(req.url === '/users' && req.method === 'GET') {
        getdata(req, res);
    }
    // getdata by id
    else if(req.url.match(/\/user\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[2];
        getUserById(req, res, parseInt(id));
    }
    // create data
    else if(req.url === '/create' && req.method === 'POST'){
        create(req, res);
    }
    // update by id
    else if(req.url.match(/\/user\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[2];
        updateUserById(req, res, parseInt(id));
    }
    // delete user id
    else if(req.url.match(/\/delete-user\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[2];
        deleteUser(req, res, parseInt(id));
    }
    else{
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'url not found'}));
    }
});


server.listen(3000, ()=>{
    console.log('server listening on port 3000')
})