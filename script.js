let numberButtons = document.querySelectorAll('.number');
let acButton = document.querySelector('.AC');
let backspaceButton = document.querySelector('.backspace');
let operatorButtons = document.querySelectorAll('.operator');
let equalsButton = document.querySelector('.equals');
let decimalButton = document.querySelector('.decimal');
let percentButton = document.querySelector('.percent');
let display = document.querySelector('.display');


let resetSwitch = true;
let equalsPressed = false;
let operatorPressed = false;
let numberPressed = false;
let decimalUsed = false;


let firstNumber = '';
let secondNumber = '';
let operator = '';
let mathString = '';



function operate(expr) {

    var chars = expr.split("");
    var n = [], op = [], decimal = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {

        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else if (chars[c] === '.' && oplast == true){
            decimal[0] = chars[c];
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    // Calculate the expression
    expr = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                expr = expr + num;
                break;
            case "-":
                expr = expr - num;
                break;
            case "*":
                expr = expr * num;
                break;
            case "/":
                expr = expr / num;
                break;
        }
    }

    return expr;
}



numberButtons.forEach((button) => {

    button.addEventListener('click', (e) => {
        let number = e.target.textContent;
        numberPressed = true;


        if (display.textContent.length >= 15 && operatorPressed == false) {
            return;
        } else if (display.textContent == '' && number == '0') {
            return;
        } else if (operatorPressed == true && decimalUsed == false) {
            display.textContent = '';
            display.textContent += number;
            mathString += number;
            operatorPressed = false;
        } else if (equalsPressed == true) {
            mathString = '';
            display.textContent = '';
            operator = '';
            decimalUsed = false;
            operatorPressed = false;
            mathString += number;
            display.textContent += number;
            equalsPressed = false;
        } else {
            mathString += number;
            display.textContent += number;
        }
    });
});


decimalButton.addEventListener('click', (e) => {

    if (decimalUsed === true) {
        return;
    } else if (operatorPressed == true) {
        display.textContent = '';
        display.textContent += '0.';
        mathString += '0.';
        decimalUsed = true;
    } else {
        mathString += '.';
        display.textContent += '.';
        decimalUsed = true;
    }
});




acButton.addEventListener('click', (e) => {
        
    mathString = '';
    display.textContent = '';
    operator = '';
    decimalUsed = false;
    operatorPressed = false;
    });


backspaceButton.addEventListener('click', (e) => {
    
    let lastCharOfMathString = mathString.charAt(mathString.length - 1)
    
    if (lastCharOfMathString === '.') {
        mathString = mathString.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
        decimalUsed = false;
    } else {
        mathString = mathString.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
    }
});




operatorButtons.forEach((button) => {

    button.addEventListener('click', (e) => {

        operatorPressed = true;
        decimalUsed = false;
        mathString += e.target.textContent;

        if (display.textContent == '') {
            return; 

        } else if (operatorPressed == true 
            && operator.length == 1 
            && mathString.charAt(mathString.length - 2) == '+'
            || mathString.charAt(mathString.length - 2) == '-'
            || mathString.charAt(mathString.length - 2) == '/'
            || mathString.charAt(mathString.length - 2) == '*') {
    //stops user from entering two operators in an expression
                mathString = mathString.slice(0, -2);
                mathString += e.target.textContent;
            return;
        } else if (operatorPressed == true && operator.length == 1) {
            let total = '';

    //acts as equals button if user presses operator after full expression
            mathString = mathString.slice(0, -1);
            total = operate(mathString);
            display.textContent = total;
            mathString = total;
            operator = e.target.textContent;
            mathString += e.target.textContent;
        } else {
            operator += e.target.textContent;
        }
    });

})


let percent = function(mathString) {
    return parseFloat(mathString) / 100;
}

percentButton.addEventListener('click', (e) => {
    let total = '';

    if (display.textContent == '') {
        return; 
    } else if (operatorPressed == true) {
        return;
    } else {
        total = percent(mathString);
        mathString = total;
        display.textContent = total;
    }
});



equalsButton.addEventListener('click', (e) => {
    let total = '';
    let secondNumber = display.textContent;

    total = operate(mathString);
    equalsPressed = true;

    if (display.textContent == '') {
        return; 
    } else if (operator == '/' && secondNumber == 0) {

        display.textContent = 'BOOM!';
        IEWIN = true;

        function img_create(src, alt) {
            var img = IEWIN ? new Image() : document.createElement('img');
            img.src = src;
            if ( alt != null ) img.alt = alt;
            img.style.width = '9rem';
            return img;
        }

        display.appendChild(img_create('https://media.giphy.com/media/3oKIPwoeGErMmaI43S/giphy-downsized.gif', alt='EXPLOSION'));

    } else {
    display.textContent = total;
    firstNumber = total;
    secondNumber = '';
    mathString = '';
    operator = '';
    mathString += firstNumber;
    }
});