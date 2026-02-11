import { cart,courses } from "./DataSetup.js";

//Merge cart with courses
const mergedCart = cart.map(item => {
  const course = courses.find(c => c.id === item.courseId);
  return { ...item, ...course };
});
console.log(mergedCart);
//Calculate total cart amount
const totalCartAmount = mergedCart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);
console.log(totalCartAmount);
//Increase quantity immutably
const increaseQty = cart.map(item =>
    item.courseId == 101 ? { ...item, qty: item.qty + 1 } : item
  );
console.log(increaseQty);
//Remove course from cart immutably
const removeFromCart = cart.filter(item => item.courseId !== 101);
console.log(removeFromCart);
//Check if all cart items are paid (published) courses
const allPaid = cart.every(item =>
  courses.find(c => c.id === item.courseId)?.published === true
);
console.log(allPaid);

