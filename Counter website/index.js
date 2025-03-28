const countvalue = document.querySelector('#counter');
// const Increment =()=>
function Increment(){
let value=parseInt(countvalue.innerText);
value=value+1;
countvalue.innerText=value;

};
const Decrement= () => {
    let value=parseInt(countvalue.innerText);
    value=value-1;
    countvalue.innerText=value;
};