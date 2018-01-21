div1 = document.getElementById('div1');

console.log(div1);


function mousePressed(info) {
    console.log("u click da muse" + info);
    console.log(info);
}

div1.addEventListener('mousedown', mousePressed);