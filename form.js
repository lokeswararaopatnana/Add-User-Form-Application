let formData = {
    name:"",
    email:"",
    status:"Active",
    gender:"Male"
};

let nameElement = document.getElementById("name");
let nameErrorMessageElement = document.getElementById("nameErrorMessage");
nameElement.addEventListener("change",function(event){
    if(event.target.value === ""){
        nameErrorMessageElement.textContent = "Required*";
    }else{
        nameErrorMessageElement.textContent = "";
    }
    formData.name = event.target.value;
});

let emailElement = document.getElementById("email");
let emailErrorMessageElement = document.getElementById("emailErrorMessage");
emailElement.addEventListener("change",function(event){
    if(event.target.value === ""){
        emailErrorMessageElement.textContent = "Required*";
    }else{
        emailErrorMessageElement.textContent = "";
    }
    formData.email = event.target.value;
});

let workingStatusElement = document.getElementById("status");
workingStatusElement.addEventListener("change",function(event){
    formData.status = event.target.value;
});

let genderMaleElement = document.getElementById("genderMale");
genderMaleElement.addEventListener("change",function(event){
    formData.gender = event.target.value;
});

let genderFemaleElement = document.getElementById("genderFemale");
genderFemaleElement.addEventListener("change",function(event){
    formData.gender = event.target.value;
});

function validateFromData(formData){
    let {name, email} = formData;
    if(name === ""){
        nameErrorMessageElement.textContent = "Required*";
    }
    if(email === ""){
        emailErrorMessageElement.textContent = "Required*";
    }
}

function submitFormData(formData){
    let options = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 88e7a31960972d0a82d430dceb8715d607a74a76829fe84940012982c241f72e"
        },
        body:JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users"
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        if(jsonData.code === 422){
            if(jsonData.data[0].message === "has already been taken"){
                emailErrorMessageElement.textContent = "Email Already Exists!!";
            }
        }
    })
}


let myFormElement = document.getElementById("myForm");
myFormElement.addEventListener("submit", function(event){
    event.preventDefault();
    validateFromData(formData);
    submitFormData(formData);
});