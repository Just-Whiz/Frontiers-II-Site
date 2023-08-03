function clickButton() {
    console.log(`Hello World!`);
    const mytext = document.getElementById("mytext");
    mytext.innerHTML = `It worked!`;
    mytext.className = `myclass`;

    const mytext2 = document.getelementByID
    ("mytext2");
    mytext2.className = `myclass`;

    const bgcolor = document.getElementByID
    ("bgcolor");

    const body = document.body;
    body.style.backgroundColor = bgcolor.value;
}