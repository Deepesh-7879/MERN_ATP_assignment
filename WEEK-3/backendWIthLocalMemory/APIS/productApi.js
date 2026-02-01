import exp from 'express'
export const productApp = exp.Router()
//product array
let products = [];

//read product data
productApp.get('/products', (req, res) => {
    //send users data in res
    res.status(200).json({ message: "all products", payload: products })//message.payload
})

//push into array
productApp.post('/products', (req, res) => {
    //get user resource from the req
    let newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: "product created" })
})

//edit the array
productApp.put('/products/:productId', (req, res) => {
    let modifiedProduct = req.body;
    let productIdFromUrl = Number(req.params.productId);
    let productIndex = products.findIndex((productObj) => productObj.productId === productIdFromUrl)
    if (productIndex === -1) {
        res.status(404).json({ message: "product not found" });
    }
    let updatedProduct = products.splice(productIndex, 1, modifiedProduct);
    res.status(200).json({ message: "product modified" });
})

//get object using brand id
productApp.get('/products/:productId', (req, res) => {
    //read id from url parameter
    let id = Number(req.params.productId)
    //read user by this id
    let product = products.find(productObj => productObj.productId === id)
    if (!product) {
        return res.status(404).json({ message: 'product not found' })
    }
    //send res
    res.status(200).json({ message: "product", payload: product })
})

// get the object using brand name
productApp.get("/products-name/:name", (req, res) => {
    let name1 = req.params.name;
    let product1 = products.find(prod => prod.name === name1);
    if (!product1) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found", payload: product1 });
})
// delete the object from the array
productApp.delete('/products/:productId', (req, res) => {
    let id = Number(req.params.productId)
    let product = products.findIndex(userObj => userObj.productId == id)
    if (product != -1) {
        let deletedproduct = products.splice(product, 1)
        res.json({ message: "product deleted", deletedproduct, payload: product })
    } else {
        res.json({ message: "product not found" })
    }

})