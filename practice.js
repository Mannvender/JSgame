/*let name = prompt("enter yo name");
alert("hahaha" + name);

document.write("hello :" + name);*/


// no error because of function Hoisting in JS
fun();

function fun() {
    console.log("funnnnnn!!")
};

// fun();

// fun2() when called before will give error in console

let fun2 = function () {
    console.log("i'm having fun too");
};


let apple = 10;

var func = function () {
    apple = 50;
    console.log("func called");
};

// var - function scope, const , let - block scope
// const, let - are newly added for strict definition

a = ["foo", "bar", 5, 46.7];
console.log(a);

a.forEach((value, index) => {
    console.log(index + " - " + value); 
});