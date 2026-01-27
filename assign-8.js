//Hands on -1
const user = {
    id: 101,
    name: "Ravi",
    preferences: {
    theme: "dark",
    language: "en"
    }
};

let user1={...user}
user1.name='ajay'
user1.preferences.theme='light'
console.log(user);
console.log(user1);

//Hands on-2
const order = {
    orderId: "ORD1001",
    customer: {
    name: "Anita",
    address: {
    city: "Hyderabad",
    pincode: 500085
            }
        },
    items: [
        { product: "Laptop", price: 70000 }
        ]
};
let order1=structuredClone(order)
order1.customer.address.city='bengaluru'
order1.items[0].price=40000
console.log(order);
console.log(order1);