const firimg=document.querySelector("[pehliImage]");
const container=document.querySelector(".container");
// console.log("hello");
const seconddiv=document.querySelector(".second_div");
const textchange=document.querySelector(".text-change");
const thirddiv=document.querySelector(".third_div");
 const followerdiv=document.querySelector(" .Followerswaaladiv")
 const enteredtext=document.querySelector("[inputparameter]");
 const form=document.querySelector("[form]");
 const four=document.querySelector(".fourth")
 let UserName=enteredtext;
 

 form.addEventListener("submit",(e)=>{
   e.preventDefault();
   UserName=enteredtext.value;
   if(UserName!==""){
      apicalling(UserName);
      thirddiv.classList.add("active");
   }
   else{
      return;
   }
}
);
 firimg.addEventListener("click",changeimg);
function changeimg(){
   if(container.classList.contains("active")){
    container.classList.remove("active");
    seconddiv.classList.remove("active");
    if(UserName.value){
    thirddiv.classList.remove("active");}
    followerdiv.classList.remove("active");
    
   }
   else{
    container.classList.add("active");
    textchange.innerText="Light";
     seconddiv.classList.add("active");
     if(UserName.value){
     thirddiv.classList.add("active");
     }
     followerdiv.classList.add("active");
   }
};


function renderdata(responsedata){
   const img=document.querySelector("[image]");
const head=document.querySelector("[heading]");
const joindate=document.querySelector("[dateofjoining]");
const url=document.querySelector("[ankertag]");
const bio=document.querySelector(".details-text");
const aboutrepos=document.querySelector("[reposdetail]");
const aboutfollowers=document.querySelector("[followerdetail]");
const aboutfollowing=document.querySelector("[followingdetail]");
const loc=document.querySelector("[location]");
const twitter=document.querySelector("[twitter]");
const web=document.querySelector("[website]");
const Company=document.querySelector("[company]");


img.src=responsedata?.avatar_url;
head.innerText=responsedata?.login;
joindate.innerText=responsedata?.created_at;
url.innerText=responsedata?.url;
bio.innerText=responsedata?.bio;
aboutrepos.innerText=responsedata?.public_repos;
aboutfollowers.innerText=responsedata?.followers;
aboutfollowing.innerText=responsedata?.following;
loc.innerText=responsedata?.location;
twitter.innerText=responsedata?.twitter_username;
web.innerText=responsedata?.site_admin;
Company.innerText=responsedata?.company;
if(responsedata?.status=="404"){
   thirddiv.classList.remove("active");
    four.classList.add("active");
}
}

async function apicalling(UserName){
   try{
      const value=await fetch(`https://api.github.com/users/${UserName}`);
   const response=await value.json();
 renderdata(response);
}
catch(err){
   console.log("error occured",err);
}
}