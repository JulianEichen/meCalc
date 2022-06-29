// containers for 
const calculator = {
    operator: 'equals',
    input: 0,
    memory: 0,
}

// calc access functions
function getOpr(){
    return calculator.operator;
}
function setOpr(op){
    calculator.operator = op;
}
function getInp(){
    return calculator.input;
}
function setInp(inp){
    calculator.input = inp;
}
function getMem(){
    return calculator.memory;
}
function setMem(mem){
    calculator.memory = mem;
}
function clearCalc(){
    setOpr('equals');
    setInp(0);
    setMem(0);
}

// operator functions
function add(x, y) {
    return x + y;
}
function sub(x, y) {
    return x - y;
}
function mlt(x, y) {
    x * y;
}
function div(x, y) {
    x / y;
}

// calculation
function calc(){
    if (getOpr=='equals')
}






