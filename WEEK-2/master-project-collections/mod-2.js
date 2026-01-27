import { courses } from "./DataSetup.js";

//Get published courses
const publishedCourses = courses.filter(c => c.published);
console.log(publishedCourses);
//Sort courses by price (high → low)
const sortedByPriceDesc = [...courses].sort((a, b) => b.price - a.price);
console.log(sortedByPriceDesc);
//Extract {title, price}
const courseSummary = courses.map(c => ({ title: c.title, price: c.price }));
console.log(courseSummary);
//Calculate total value of published courses
const totalPublishedValue = publishedCourses.reduce((sum, c) => sum + c.price, 0);
console.log(totalPublishedValue);
//Add a new course immutably
const addCourse = newCourse => [...courses, newCourse];
console.log(addCourse);
