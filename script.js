let buffer = '0';
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbols(value);
    }else{
        handleNumbers(value);
    }
    refresh();
}

function handleNumbers(number){
    if(buffer === '0'){
        buffer = number;
    }else{
        buffer += number;
    }
}

function handleMath(value){
    if(buffer === 0){
        //do nothing
        return;
    }

    const intBuffer  = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
    console.log(runningTotal);
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleSymbols(symbol){
    switch(symbol){
        case 'C':
                buffer = '0';
                break;
        case '=':
            if(previousOperator === null){
                //need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer =""+runningTotal;
            runningTotal = 0;
            break;
        case '←':
                if(buffer.length === 1){
                    buffer = '0';
                    refresh();
                }
                else{
                    buffer = buffer.substring(0,buffer.length-1);
                }
                break;
        case '+':
        case '-':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }
}

function init(){
    document.querySelector(".calc-buttons").addEventListener("click",(event)=>{
        buttonClick(event.target.innerText);
    });
}

function refresh(){
    screen.textContent = buffer;
}
init();//calling init function


