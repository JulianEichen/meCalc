// containers for 
const calculator = {
    disp: document.querySelector('#display'),
    prev_operator: 'equals',
    max_in_length: 9,
    input: '0',
    memory: '0',
}

// create UI
createUI();
updateDisplay('0');

function createUI(){
    // special buttons
    const ac_button = document.querySelector('#ac_button');
    ac_button.addEventListener('click', resetClac);

    // number buttons
    const num_buttons = document.querySelectorAll('.number_button');
    num_buttons.forEach((btt) =>{
        btt.addEventListener('click', clickNumber);
    });

    // operator buttosn
    const opr_buttons = document.querySelectorAll('.operator_buttons');
    opr_buttons.forEach((btt) =>{
        btt.addEventListener('click', clickOperator);
    })
}

// button functions
function resetClac(){
    calculator.operator = 'equals';
    calculator.input = '0';
    calculator.memory = '0';
    calculator.disp.textContent = '0';
}

function clickNumber(event){
    val  = event.target.value;
    updateDisplay(val);
}

function updateDisplay(input){
    current_cont = calculator.disp.textContent;

    // check max length
    if (current_cont.length>=calculator.max_in_length){
        return;
    }

    var new_cont = current_cont;
    if (input != "."){ 
        if (current_cont == "0"){ // Display shows a single 0
            new_cont = input;
        }else{
            new_cont = current_cont.concat(input);
        }
    }else{ // input is "."
        if (current_cont == "0"){ // Display shows a single 0
            new_cont = "0.";
        }else if(current_cont.includes(".")){ // user wants to add another "."
            new_cont = current_cont;
        }else{
            new_cont = current_cont.concat(input);
        }
    }
    calculator.disp.textContent = new_cont;
}

function clickOperator(event){
    oprtr  = event.target.value;
    runCalc(oprtr);
}

// calculation
function runCalc(oprtr){
    const x = calculator.memory;
    const y = parseFloat(calculator.disp.textContent);
    var z = 0;

    if (calculator.prev_operator=='add'){
        z = x+y;
    }else if (calculator.prev_operator=='substract'){
        z = x-y;
    }else if (calculator.prev_operator=='multiply'){
        z = x*y;
    }else if (calculator.prev_operator=='divide'){
        z = x/y;
    }else if (calculator.prev_operator=='equals'){
        z = y;
    }
    calculator.memory = z;
    calculator.disp.textContent = 0;
    calculator.prev_operator = oprtr;
}






