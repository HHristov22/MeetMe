function submitLoginForm(event) {
    event.preventDefault();
    validate();
}

function validate(result) {

    //defining properties of the register form
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    
    let properties = [username, password];
    let errors = 0;
    properties.forEach((property, index) => {
        let validityState = property.validity;

        //access the section after the property - it is used for error messages
        let errorSection = property.nextElementSibling;
        //check if current property is valid
        if (!validityState.valid) {
            

            //validation checks
            if (validityState.valueMissing) {
                errors++;
                let outputMissing = property.getAttribute("name");
                
                outputMissing = outputMissing[0].toUpperCase() + outputMissing.slice(1);
                errorSection.innerHTML = '\'' + outputMissing + '\' is missing.';
            }

            errorSection.style.display = "block";
        }
        else
        {
            errorSection.innerHTML = "";
            errorSection.style.display = "none";
        }
    })
    
    
    if (errors==0)
    {
        checkUser(username,password);
    }

    ////////////////////////////////////////////////////////////
}


function checkUser(username,password) {
    let toBeLog = false;
    //console.log(username.value);
    let checkusername_check = username.value;
    fetch("./models/check_user.php")
   .then(function(response) {
    //console.log("First");
      return response.text();
   })
   .then(function(result) {
      // Handle the response from the PHP script
      // console.log(result);
      users_db = result.split(",");
      users_db.forEach(function(user) {
        if(user == checkusername_check)
        toBeLog = true;
     });
     checkForSuccess(username,password, toBeLog);
   })
   .catch(function(error) {
      console.error(error);
   });
}

function checkForSuccess(username,password, toBeLog){
    //console.log(toBeLog);
    if(!toBeLog)
    {
        username.nextElementSibling.innerHTML = "This username doesn't exist";
        username.nextElementSibling.style.display = "block";
    }
    else
    {
        //console.log(passwordForCheck);
        password.nextElementSibling.innerHTML = "Password is incorrect.";
        password.nextElementSibling.style.display = "block";
        let array = [username.value, password.value];
        //console.log(array);
        fetch("./models/login.php?variableName=" + array)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            ///////
            if(data)
            {
                password.nextElementSibling.innerHTML = "Successful sign-in.";
                password.nextElementSibling.style.display = "block";
                role = data.substring(0,7);
                names = data.substring(7);
                // from three to Two names
                /*names = data.split(" ");
                names = names[0] + " " +names[2];*/
                //
                localStorage.setItem("userFullname", names);
                localStorage.setItem("role", role);
                localStorage.setItem("login", 1);
                localStorage.setItem("FN",username.value);
                setTimeout(function() {
                    window.open("./home.html", "_self");// code to be executed after 1 seconds
                  }, 1000);
                
            }
        });
    }
}