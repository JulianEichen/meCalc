// containers for 
const calculator = {
    disp: document.querySelector('#display'),
    locked_operator: 'equals',
    prev_click: 'none',
    max_in_length: 9,
    input: '0',
    memory: '0',
}

// create UI
createUI();
updateDisplay('0');

function createUI() {
    // special buttons
    const ac_button = document.querySelector('#ac_button');
    ac_button.addEventListener('click', resetClac);

    const sgn_button = document.querySelector('#sgn_button');
    sgn_button.addEventListener('click', clickSgn);

    const prc_button = document.querySelector('#prc_button');
    prc_button.addEventListener('click', clickPrc);

    // number buttons
    const num_buttons = document.querySelectorAll('.number_button');
    num_buttons.forEach((btt) => {
        btt.addEventListener('click', clickNumber);
    });

    // operator buttosn
    const opr_buttons = document.querySelectorAll('.operator_button');
    opr_buttons.forEach((btt) => {
        btt.addEventListener('click', clickOperator);
    })
}

// button functions
function resetClac() {
    calculator.locked_operator = 'equals';
    calculator.prev_click = 'none';
    calculator.input = '0';
    calculator.memory = '0';
    show('0');
}

function clickSgn() {
    var txtCont = calculator.disp.textContent;
    var x = parseFloat(txtCont);
    if (txtCont.length >= calculator.max_in_length & x > 0) {
        return;
    } else {
        x *= -1;
        show(x);
    }
}

function clickPrc() {
    console.log('prc a')
    var txtCont = calculator.disp.textContent;
    var x = parseFloat(txtCont);

    // case 1 (txt.length >= max_in_length): 123456789 -> 1234567.89 => txt.length = 10
    var case_1 = (txtCont.length >= calculator.max_in_length);

    // case 2a (x<1000 &txt.length >= max_in_length-1): 765.4321 -> 7.654321 => txt.length = 8
    // case 2b (x<100 &txt.length >= max_in_length-1): 76.54321 -> 0.7654321 => txt.length = 9
    // case 2b (x<1 & txt.length >= max_in_length-1): 0.654321 -> 0.00654321 => txt.length = 10
    var case_2b = (x<1 & txtCont.length >= calculator.max_in_length-1);

    // case 3a (x<0 & txt.length >= max_in_length-1): -7654321 -> -76543.21 => txt.length = 9
    // case 3b (x<0 & txt.length >= max_in_length-1): -65.4321 -> -0.654321 => txt.length = 9
    // case 3c (x<0 & |x|<100 & txt.length >= max_in_length-1): -65.4321 -> -0.654321 => txt.length = 9
    // case 3c (x<0 & |x|<10 & txt.length >= max_in_length-1): -6.4321 -> -00.654321 => txt.length = 10
    var case_3c = (x<0 & Math.abs(x)<10 & txtCont.length >= calculator.max_in_length-1);

    // case 4 (x<0 & txt.length >= max_in_length-2): -654321 -> -6543.21 => txt.length = 8
    // case 4b (x<0 & |x|<100 & txt.length >= max_in_length-2): -54.321 -> -0.54321 => txt.length = 8
    // case 4c (x<0 & |x|<10 & txt.length >= max_in_length-2): -6.4321 -> -0.0654321 => txt.length = 9

    if (case_1 || case_2b || case_3c){ 
        return;                                             
    }else {
        x *= 0.01;
        show(x);
    }

}

function clickNumber(event) {
    val = event.target.value;
    if (calculator.prev_click == 'operator') {
        calculator.memory = calculator.disp.textContent;
        show('0');
    }
    updateDisplay(val);
    calculator.prev_click = 'number';
}

function updateDisplay(input) {
    current_cont = calculator.disp.textContent;

    // check max length
    if (current_cont.length >= calculator.max_in_length) {
        return;
    }

    var new_cont = current_cont;
    if (input != ".") {
        if (current_cont == "0") { // Display shows a single 0
            new_cont = input;
        } else {
            new_cont = current_cont.concat(input);
        }
    } else { // input is "."
        if (current_cont == "0") { // Display shows a single 0
            new_cont = "0.";
        } else if (current_cont.includes(".")) { // user wants to add another "."
            new_cont = current_cont;
        } else {
            new_cont = current_cont.concat(input);
        }
    }
    show(new_cont);
}

function show(content){
    var text = content.toString();
    if (text.length > calculator.max_in_length || text == 'NaN'){
        return;
    }
    calculator.disp.textContent = text;
}

function clickOperator(event) {
    oprtr = event.target.value;

    var result = runCalc(calculator.locked_operator).toString();
    calculator.memory = result;
    show(result); // display result
    calculator.locked_operator = oprtr;
    calculator.prev_click = 'operator';

}

// calculation
function runCalc(oprtr) {
    const x = parseFloat(calculator.memory);
    const y = parseFloat(calculator.disp.textContent);
    var z = 0;

    if (calculator.locked_operator == 'add') {
        z = x + y;
    } else if (calculator.locked_operator == 'substract') {
        z = x - y;
    } else if (calculator.locked_operator == 'multiply') {
        z = x * y;
    } else if (calculator.locked_operator == 'divide') {
        z = x / y;
    } else if (calculator.locked_operator == 'equals') {
        z = y;
    }
    return z;
}






