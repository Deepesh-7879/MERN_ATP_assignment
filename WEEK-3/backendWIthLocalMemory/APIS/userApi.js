//Import express module
import exp from 'express'
//Create mini-express(separate route) app
export const userApp = exp.Router()

//Create API(req handlers-route)
//test local in-memory data
let users = [];

//get request handling route(Read user)
userApp.get('/users', (req, res) => {
    //send users data in res
    res.status(200).json({ message: "all users", payload: users })//message.payload
})
//post request handling route(Creat user)
userApp.post('/users', (req, res) => {
    //get user resource from the req
    let newUser = req.body;
    //console.log(newUser);
    //insert newUser to users array
    users.push(newUser);
    //send res
    res.status(201).json({ message: "user created" })

})
//put request handling route(update user)
userApp.put('/users/id', (req, res) => {
    //get modifiesd user from req
    let modifiedUser = req.body;
    //find user with id exists in array
    //if user not found,send res as "user not found"
    let userIndex = users.findIndex((userObj) => userObj.id === modifiedUser.id)
    //send res as "User modified"
    if (userIndex === -1) {
        res.status(404).json({ message: "user not found" });
    }
    //if user found,then modify the user
    let deleteduser = users.splice(userIndex, 1, modifiedUser);
    //send res as "User modified"
    res.status(200).json({ message: "user modified" });
})
//read user by id
userApp.get('/users/:id', (req, res) => {
    //read id from url parameter
    let id = Number(req.params.id)
    //read user by this id
    let user = users.find(userObj => userObj.id == id)
    if (!user) {
        return res.status(200).json({ message: 'user not found' })
    }
    //send res
    res.status(200).json({ message: "user", payload: user })
})
//delete request handling route(delete user)
userApp.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id)
    let user = users.findIndex(userObj => userObj.id == id)
    if (user != -1) {
        let deleteduser = users.splice(user, 1)
        res.json({ message: "user deleted", deleteduser, payload: user })
    } else {
        res.json({ message: "user not found" })
    }

})

