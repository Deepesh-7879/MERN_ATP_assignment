1.Generate package.json
    npm init -y
2.create server.js
3.Install,import "express" 

a.Install mongoose and connect to mongodb server
b.create schema of resourse
c.Create model of that schema
d.perform db operations on the model

create product API
product obj schema:{pid,productName,price}
1.POST /products
2.GET /products
3.GET /products/<pid>
4.PUT /products/<pid>