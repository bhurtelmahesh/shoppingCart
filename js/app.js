//#variables
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector("#cart-content tbody"),
    clearCartButton = document.querySelector('#clear-cart');


//functions


buyCourse = (e) => {
    e.preventDefault();
//if the card that can be baught is clicked, get the whole card
    if(e.target.classList.contains('add-to-cart')){
        //get everything inside the selected card
        const course = e.target.parentElement.parentElement;
        //read the values
        getCourseInfo(course);


        
    }
}
getCourseInfo = (course) => {
    //craete an object with course data
    const  courseInfo = {
        image : course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    //insert into the shopping cart
    addIntoCart(courseInfo);
}


//get the contents from the storage
getCoursesFromLS = () =>{
    let courses;
    
    //check if something exists, then get the value, otherwise create an empty array
    if(localStorage.getItem('courses')===null){
        courses = [];
        
    }else{
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
    
}
saveIntoLS = (course) =>{
    let courses = getCoursesFromLS();
    //add the course into the array
    courses.push(course);
    //since storage only saves strings, convert JSON into strings;
    localStorage.setItem('courses', JSON.stringify(courses));


}
// display the selected items(courseInfo) into the shopping cart
addIntoCart= (course) => {
    //create a tr
    const row = document.createElement('tr');

    //build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=90>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>    
    `;
    //add into the shoppingCart
    shoppingCartContent.appendChild(row);

    //add course into local storage
    saveIntoLS(course);
    //

}

removeCourseFromLS = (id) => {
    //get the local storage data 
    let coursesLS = getCoursesFromLS();

    //loop through the array and find the index to remove
    coursesLS.forEach((courseLS, index) => {
        if(courseLS.id === id){
            coursesLS.splice(index, 1);
        }
    });
    
    //add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
removeCourse = (e) => {

    let course, courseID;
    //remove from the DOM
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseID)
    //remove from the LS
    removeCourseFromLS(courseID );

}

//clearing the whole local storage
clearLocalStorage = () => localStorage.clear();

//clears the shopping cart
clearCart = () => {
   // shoppingCartContent.innerHTML = '';
   //loop until there is a child elememnt in the shopping cart
    while(shoppingCartContent.firstChild){ 
       shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //clear from local storage
    clearLocalStorage();

}

loadFromLS = () => {
    let coursesLS = getCoursesFromLS();

    //loop through the courses and print into the cart
    coursesLS.forEach( (course) => {
        //create a <tr> element
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=90>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>    
        `;
        shoppingCartContent.appendChild(row);
    });
}

//Event listeners

loadEventListeners = () => {
    //when clicked on add to cart
    courses.addEventListener('click', buyCourse);
    //remove course from the cart
    shoppingCartContent.addEventListener('click',removeCourse);
    //clear the cart
    clearCartButton.addEventListener('click', clearCart);
    //document ready
    document.addEventListener('DOMContentLoaded', loadFromLS);

};
loadEventListeners();