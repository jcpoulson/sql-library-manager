const inputs = document.querySelectorAll('input');

const errorFields = document.querySelectorAll('.error');
for (let i = 0; i < errorFields.length; i++) {
    errorFields[i].style.display = "none";
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', () => {
        if (inputs[i].value == "") {
            for (let j = 0; j < errorFields.length; j++) {
                errorFields[j].style.display = "";
            }
        } else if (inputs[i].value != "") {
            for (let j = 0; j < errorFields.length; j++) {
                errorFields[j].style.display = "none";
            }
        } 
    })
}