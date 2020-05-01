var form = document.querySelector("#user-form");
var firstUser = false;
var names = document.querySelector(".names");
var formColumn = document.querySelector("#form-col");
var detailsView = document.querySelector("#details-view");
var formDiv = document.querySelector("#form-div");
var userTable = document.querySelector("#user-details");

var usernameValue = document.querySelector("#username");
var email = document.querySelector("#email");
var dob = document.querySelector("#dob");
var countrySelect = document.querySelector("#country");
var stateSelect = document.querySelector("#state");
var citySelect = document.querySelector("#city");
var genders = document.querySelectorAll("[name='gender']");
var colorsCBs = document.querySelectorAll('input[type = "checkbox"]')
var aboutUser = document.querySelector("[name = 'user-desc']");
var existingUsers = [];

form.addEventListener("submit", function(e){ 
        e.preventDefault();
        
        var usernameValue = username.value;
        var emailValue = email.value;
        if(!existingUsers.includes(emailValue)){
            existingUsers.push(emailValue)
        }else{
            alert("User Already exists");
            return;
        }
        var age = calcAge();
        var country = countrySelect[countrySelect.selectedIndex].text;
        var state = stateSelect[stateSelect.selectedIndex].value;
        var city = citySelect[citySelect.selectedIndex].value;
        // var gender = document.querySelector('input[name = "gender"]:checked').value;
        var gender;
        for(var i = 0; i< genders.length; i++){
            if(genders[i].checked){
                gender = genders[i].value
            }
        }
        console.log("gender is " + gender )
        console.log("age is " + age);
        var location = getLocation(country, state, city);
        var colors ="";
        let l = colorsCBs.length;
        console.log(colorsCBs);
        for(let i = 0; i < l; i++){
            if(colorsCBs[i].checked){
                if(colors == ""){
                    colors = colors + colorsCBs[i].value
                }else{
                    colors = colors + ", "  + colorsCBs[i].value
                }
            }
        }
        var userDesc = aboutUser.value
        console.log("colors: " + colors);
        console.log(userDesc);
        console.log(location);
        // names.innerHTML = names.innerHTML +  "<p>" + usernameValue + "</p>";
        // console.log(form);
        // console.log(form.elements);
        // console.log(form[0]);
        var tableRow = document.createElement('tr');
        tableRow.addEventListener('mouseover', function(){
            this.firstChild.childNodes[3].classList.add('open-inline-block');
        })
        tableRow.addEventListener('mouseleave', function(){
            this.firstChild.childNodes[3].classList.remove('open-inline-block');
        })
        var nameCol = document.createElement('td');
        
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = "X"
        deleteBtn.addEventListener('click', function(){
            if(confirm("Are you sure to delete user " + usernameValue + "?")){
                let i = this.parentNode.parentNode.rowIndex;
                userTable.deleteRow(i);
            }else{
                return;
            }
            
        })
        deleteBtn.className = "delete";
        nameCol.innerHTML = usernameValue + "<br><br>";
        nameCol.appendChild(deleteBtn);
        // nameCol.textContent = usernameValue;
        tableRow.appendChild(nameCol);

        var emailCol = document.createElement('td');
        emailCol.textContent = emailValue;
        tableRow.appendChild(emailCol);

        var ageCol = document.createElement('td');
        ageCol.textContent = age;
        tableRow.appendChild(ageCol);

        var locationCol = document.createElement('td');
        locationCol.innerHTML = location;
        tableRow.appendChild(locationCol);

        var genderCol = document.createElement('td');
        genderCol.textContent = gender;
        tableRow.appendChild(genderCol);

        var colorCol = document.createElement('td');
        colorCol.textContent = colors;
        tableRow.appendChild(colorCol)

        var aboutUserCol = document.createElement('td');
        
        aboutUserCol.textContent = userDesc;
        tableRow.appendChild(aboutUserCol);


        userTable.appendChild(tableRow);
        
        


        if(!firstUser){
            detailsView.className = "col-md-8"            
            formColumn.className = "col-md-4"
            formDiv.className = "width-100";
            formColumn.classList.add('form-col');
            // formDiv.classList.add('form-fixed');
            detailsView.classList.add('m-left');
        }
        form.reset();   
        // return false;
})



function calcAge(){
    [year,month,date] = dob.value.split('-');
    today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    currentAge = currentYear - year;
    currentDate = today.getDate();
    if(currentYear < year){
        alert("Enter valid Date");
        dob.value=""
    }
    else if(currentYear == year){
        if(currentMonth < month){
            alert("Enter valid Date");
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
                alert("Enter valid Date");
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
    return currentAge;
}



function getLocation(country, state, city){
    let location = ""
    console.log("in getLocation " , country, state, city)
    if(city != null && city != undefined && city != ""){
        location = location + city + ",<br>";
    }
    if(state != null && state != undefined && state != ""){ 
        location = location + state + ",<br>"
    }
    location = location + country + "."
    return location;
}