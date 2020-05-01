var countries = require('./countries');
var dob = document.querySelector("#dob");
var age = document.querySelector("#age");
var username = document.querySelector("#username");
var countriesSelect  = document.querySelector("#country");
var stateSelect = document.querySelector("#state");
var citySelect = document.querySelector("#city");
var resetForm = document.querySelector("#form-reset");
var form = document.querySelector("#user-form");

resetForm.addEventListener('click', function(){
    form.reset();
})

var country;

window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
    loadCountries();
});


function loadCountries(){
    console.log(countries);
    // countriesSelect.innerHTML = countriesSelect.innerHTML + "<option>BMW</option>"

    countries.forEach(c => {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(c.name));
        opt.value = c.shortName;
        countriesSelect.appendChild(opt);
    });
}

countriesSelect.addEventListener('input', function(){
    citySelect.classList.remove("open");
    citySelect.required = false;
    let name = countriesSelect[countriesSelect.selectedIndex].text;
    stateSelect.innerHTML = '<option value="">Select State</option>';
    console.log(name);
    if(name == 'Select Country'){
        stateSelect.classList.remove("open");
        stateSelect.required = false;
    }
    else{
        country = countries.find(c => c.name == name)
        console.log(Object.keys(country.states))
        if(Object.keys(country.states).length > 0){
            console.log('states')
            stateSelect.classList.add("open");
            stateSelect.required = true;
            Object.keys(country.states).forEach(state => {
                let opt = document.createElement('option');
                opt.appendChild(document.createTextNode(state));
                opt.value = state;
                stateSelect.appendChild(opt);
            })
        }else{
            stateSelect.classList.remove("open");
            stateSelect.required = false;
        }
    }
    
})

stateSelect.addEventListener('input', function(){
    let stateName = stateSelect[stateSelect.selectedIndex].text
    citySelect.innerHTML = '<option value="">Select City</option>';
    console.log(stateName);
    console.log(country.states[stateName]);
    if(stateName != "Select State" && country.states[stateName] != undefined && country.states[stateName] instanceof Array && 
                            country.states[stateName].length > 0 ){
        citySelect.classList.add("open");
        citySelect.required = true;
        country.states[stateName].forEach(city => {
            let opt = document.createElement('option');
            opt.appendChild(document.createTextNode(city.name));
            opt.value = city.name;
            citySelect.appendChild(opt);
        })
    }else{
        citySelect.innerHTML = '<option value="">No Cities Available</option>';
        citySelect.classList.remove("open");
        citySelect.required = false;
    }
})

dob.addEventListener('input', function(){
    console.log('dob');
    console.log(dob.value);
    [year,month,date] = dob.value.split('-');
    today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    currentAge = currentYear - year;
    currentDate = today.getDate();
    if(currentYear < year || year < 1900){
        alert("enter valid date for age");
        dob.value=""
    }
    else if(currentYear == year){
        if(currentMonth < month){
            alert("enter valid date");
            dob.value=""
        }
        else if(currentMonth > month){
            currentAge = currentMonth - month
            str = " months old"
            if(currentAge == 1){
                str = " month old"
            }
            currentAge = currentAge + str
        }
        else if(currentMonth == month){
            if(date > currentDate){
                alert("enter valid date");
                dob.value=""
            }
            currentAge = currentDate - date;
            str = " days old"
            if(currentAge == 1){
                str = " day old"
            }
            currentAge = currentAge + str
        }
        
    }
    else if(currentYear > year){
        if(month > currentMonth){
            currentAge--;
        }
        else if(month == currentMonth){
            if(date > currentDate){
                currentAge--;
            }
        }
        if(currentAge == 0){
            currentAge = (12 - month) + currentMonth
            str = " months old"
            if(currentAge == 1){
                str = " month old"
            }
            currentAge = currentAge + str
        }else{
            str = " years old"
            if(currentAge == 1){
                str = " year old"
            }

            currentAge = currentAge + str
        }

    }
    console.log(currentAge);
    
    age.value = currentAge
})