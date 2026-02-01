### steps to create backend
    1.Generate package.json
        npm init -y
    2.create HTTP server
        a.install and import "express" module
            npm install express
        b.Import express module
        c.make the port listening
        d.use req handlers to handle the requests from the server
    3.To start server automatically
        npm install -g nodemon & run the file with (nodemon filename.js)

        let updateuser=req.body;
            let index=users.find((user1) => {
                if(user1.id==updateuser.id){
                    Object.assign(user1,updateuser);
                    res.status(201).json({message:"user modified"})
                }else{
                    res.status(201).json({message:"user not modified"})
                }
            })  

-------------
data-
database-
database server
database management system

create data base-
    >use db-name
create collection
    db.createCollection(collecton-name)
Create documents
    insertOne(document)
    insertMany(document)
update document
    updateOne(document)
    updateMany(document)
delete document
    deleteOne(document)
    deletemany(document)
Read document
    readOne(document)
    readmany(document)
--------------------------------
                     Query operators
{field:{operator:value}}  
$eq,$neq,$gt,$gte,$it,$ite,                  
