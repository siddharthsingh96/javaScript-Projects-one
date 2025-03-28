const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copymsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generateBtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordlength=10;
let checkCount=0;

handleslider();

setIndicator("#ccc");

//set the length of password
function handleslider(){
inputSlider.value=passwordlength;
lengthDisplay.innerText=passwordlength;

// const min=inputSlider.min;
// const max=inputSlider.max;
// inputSlider.style.backgroundSize =((passwordlength- min)* 100 / (max - min)) + "% 100%";

const min = inputSlider.min;
const max = inputSlider.max;
inputSlider.style.backgroundSize =
  ((passwordlength - min) * 100) / (max - min) + "% 100%"
  inputSlider.style.backgroundSize = " 100%"; // Test manually
}




// function setIndicator(color){
//     indicator.style.backgroundcolor=color;

//     //shadow
// }
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomNum(min,max){
return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomNum(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRandomNum(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRandomNum(65,91));
}


function generateSymbol(){
const randNum=getRandomNum(0,symbols.length);
 return symbols.charAt(randNum);
}




 async function copyContent(){  
    try{
  await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText="copied";
    }
catch(e){
    copyMsg.innerText="failed";
}
copyMsg.classList.add("active");

setTimeout(() => {
  copyMsg.classList.remove("active");  
},2000);
}

function shufflepassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    // str = array.join("");
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

     //special condition
     if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleslider();
     }

};

 allCheckBox.forEach((checkbox)=>{
checkbox.addEventListener('change',handleCheckBoxChange);
});


inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent(); 
})

generateBtn.addEventListener('click',()=>{
//here we are going to see the first condition if no check box is checked

if(checkCount==0)
return;

if(passwordlength<checkCount){
    passwordlength=checkCount;
    handleslider();
}

//lets find  new passwords

//removing the old one 
password="";

//let's put the stuff mentioned by checkboxes
// if(uppercaseCheck.checked)
//     password+=generateUppercase();
// if(lowercaseCheck.checked)
//     password+=generateLowercase();
// if(numbersCheck.checked)
//     password+=generateRandomNumber();
// if(symbolsCheck.checked)
//     password+=generateSymbol();


let funArr=[];
if(uppercaseCheck.checked)
    funArr.push(generateUppercase);
if(lowercaseCheck.checked)
    funArr.push(generateLowercase);
if(numbersCheck.checked)
    funArr.push(generateRandomNumber);
if(symbolsCheck.checked)
funArr.push(generateSymbol);

//compulsory addition
for(let i=0;i<funArr.length;i++){
    password+=funArr[i]();}
//remaining addition 
for(let i=0;i<passwordlength-funArr.length;i++){
    let randIndex=getRandomNum(0,funArr.length);
    password+=funArr[randIndex]();
}       

password=shufflepassword(Array.from(password));
console.log("shuffling done");
passwordDisplay.value=password;
console.log("UI addition done");



//calculate strngth
calcStrength();
});
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8){
        // setIndicator("#0f0");
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordlength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
};
