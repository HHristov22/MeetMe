function submitRegistrationForm(event) {
  event.preventDefault();
  validate();
}

function validate(result) {
  //create boolean array for all properties in the register form
  let areAllSuccessful = [false, false, false, false];

  //defining properties of the register form
  let username = document.getElementById("username");
  let fullname = document.getElementById("fullname");
  let role_s = document.getElementById("set_role_student");
  let role_t = document.getElementById("set_role_teacher");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirm-password");
  let role_user;

  //                      0         1        2           3             4       5
  //let properties = [username, fullname, password, confirmPassword, role_s, role_t];
  let properties = [
    username,
    fullname,
    password,
    role_s,
    role_t,
    confirmPassword,
  ];
  let checkusers = 0;

  properties.forEach((property, index) => {
    let validityState = property.validity;

    //access the section after the property - it is used for error messages
    let errorSection = property.nextElementSibling;

    //check if current property is valid
    if (!validityState.valid) {
      //console.log(property.getAttribute("id") + ": " + property.value);

      //the value at property's index is set to false in the areAllSuccessful
      areAllSuccessful[index] = false;

      //validation checks
      if (validityState.valueMissing) {
        if (property == confirmPassword) {
          errorSection.innerHTML = "Please confirm your password.";
        } else {
          let outputMissing = property.getAttribute("name");
          if (property == role_s || property == role_t) outputMissing = "role";
          outputMissing =
            outputMissing[0].toUpperCase() + outputMissing.slice(1);
          errorSection.innerHTML = "'" + outputMissing + "' is missing.";
        }
        checkusers++;
      } else if (validityState.patternMismatch) {
        let outputMissing = property.getAttribute("name");
        outputMissing = outputMissing[0].toUpperCase() + outputMissing.slice(1);
        errorSection.innerHTML =
          "Please enter valid data: " + outputMissing + ".";
        checkusers++;
      }

      errorSection.style.display = "block";
    } else {
      // value of role
      let x = property.value;
      if (property == role_s || property == role_t) {
        x = property.checked ? 1 : 0;
        let roletoDB =
          (property == role_s && x) || (property == role_t && !x)
            ? "student"
            : "teacher";
        role_user = roletoDB;
        //console.log("To DB role: " + roletobDB);
      }
      /*else
                console.log("DONE:" + property.getAttribute("id") + " -> " + x);*/

      //if the property is valid its index is set to true in areAllSuccessful
      areAllSuccessful[index] = true;
      errorSection.innerHTML = "";
      errorSection.style.display = "none";
    }
    // console.log(property.getAttribute("id") + ": " +areAllSuccessful[index]);
  });
  //check if password and confirm-password does not match
  if (
    password.value != confirmPassword.value &&
    password.value != "" &&
    confirmPassword.value != ""
  ) {
    areAllSuccessful[2] = false;
    areAllSuccessful[3] = false;
    confirmPassword.nextElementSibling.innerHTML =
      "The 'Confirm password' does not match with password.";
    confirmPassword.nextElementSibling.style.display = "block";
    checkusers++;
  }

  //check if password and confirm-password are same
  //for myself
  /*if(password.value == confirmPassword.value && password.value != '' && confirmPassword.value != '')
    {
        console.log("DONE:" + password.value + " " + confirmPassword.value);
    }*/

  if (checkusers == 0) {
    checkForExistingUser(properties, username, role_user);
  }

  ////////////////////////////////////////////////////////////
}

function checkForExistingUser(properties, checkusername, role_user) {
  // console.log("Proverka dali usera e NOW! ");
  let toBeReg = true;
  let checkusername_check = checkusername.value;
  //console.log("Start: "+ checkusername_check + "|");

  fetch("./models/check_user.php")
    .then(function (response) {
      //console.log("First");
      return response.text();
    })
    .then(function (result) {
      // Handle the response from the PHP script
      //console.log(result);
      users_db = result.split(",");
      users_db.forEach(function (user) {
        //console.log(user+"|"+checkusername_check+(user == checkusername_check)+"\n");
        if (user == checkusername_check) toBeReg = false;
      });
      checkForSuccess(properties, toBeReg, role_user);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function checkForSuccess(properties, toRegister, role_user) {
  if (!toRegister) {
    properties[0].nextElementSibling.innerHTML =
      "This username already exists.";
    properties[0].nextElementSibling.style.display = "block";
  } else {
    let userData = [];
    // registrate user
    properties.forEach((property, index) => {
      userData.push(property.value);
    });
    userData.pop();
    userData.pop();
    userData.pop();
    userData.push(role_user);
    [userData[2], userData[3]] = [userData[3], userData[2]];

    fetch("./models/register_user.php?variableName=" + userData)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data) {
          properties[5].nextElementSibling.innerHTML = "Successful sign-up.";
          properties[5].nextElementSibling.style.display = "block";
          setTimeout(function () {
            window.open("./login.html", "_self"); // code to be executed after 3 seconds
          }, 1500);
        }
      });
  }
}
