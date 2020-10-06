
let passwordValidity;
let usernameValidity;

function usernameChecker(){
  usernameValidity = true;

  // username Length Check
  if (
    document.getElementById("username-checked").value.length > 25 || 
  document.getElementById("username-checked").value.length < 6
  ) {
    document.getElementById("username-charCount").style.color = "red";
    usernameValidity =  false;
  } else {
    document.getElementById("username-charCount").style.color = "green";
  }

  passwordChecker();
  if (usernameValidity){
    return true;
  } else{
    return false;
  }
}

function passwordChecker(){
  const password = document.getElementById("password-checked").value;
  const lowerCasePassword = password.toLowerCase();
  let lowerCaseUsername = "";
  if(document.getElementById("username-checked").value !== ""){
    lowerCaseUsername = document.getElementById("username-checked").value.toLowerCase();
  }
  passwordValidity = true;
  const numberRegExp = /[0-9]/;
  const smallLetterRegExp = /[a-z]/;
  const largeLetterRegExp = /[A-Z]/;
  const symbolRegExp = /[!@#%^&*\-=+?/<>]/;

  // Password Length Check
  if (password.length < 10) {
    document.getElementById("password-charCount").style.color = "red";
    passwordValidity =  false;
  }else {
    document.getElementById("password-charCount").style.color = "green";
  }

  // Check Whether Password Contains All Required Characters
  if (
    !numberRegExp.test(password) ||
    !smallLetterRegExp.test(password) ||
    !largeLetterRegExp.test(password) ||
    !symbolRegExp.test(password)
  ) {
    document.getElementById("password-charType").style.color = "red";
    passwordValidity =  false;
  } else {
    document.getElementById("password-charType").style.color = "green";
  }

  for (let i = 0; i < lowerCasePassword.length - 2; i += 1) {
    // Password Cannot Contains 3 consecutive/same letters in a row
    if (lowerCasePassword.charCodeAt(i) - lowerCasePassword.charCodeAt(i + 1) === 1) {
      if (lowerCasePassword.charCodeAt(i + 1) - lowerCasePassword.charCodeAt(i + 2) === 1) {
        document.getElementById("password-charConsec").style.color = "red";
        passwordValidity =  false;
      }
    } else if (lowerCasePassword.charCodeAt(i) - lowerCasePassword.charCodeAt(i + 1) === -1) {
      if (lowerCasePassword.charCodeAt(i + 1) - lowerCasePassword.charCodeAt(i + 2) === -1) {
        document.getElementById("password-charConsec").style.color = "red";
        passwordValidity =  false;
      }
    } else if (lowerCasePassword.charCodeAt(i) === lowerCasePassword.charCodeAt(i + 1)) {
      if (lowerCasePassword.charCodeAt(i + 1) === lowerCasePassword.charCodeAt(i + 2)) {
        passwordValidity =  false;
        document.getElementById("password-charConsec").style.color = "red";
      }
    } else {
      document.getElementById("password-charConsec").style.color = "green";
    }

    for (let idIndex = 0; idIndex < lowerCaseUsername.length - 2; idIndex += 1) {
      let testString = lowerCaseUsername.substring(idIndex, idIndex + 3);
      // Password Cannot Contains 3 consecutive letters appears in id
      if (lowerCasePassword.includes(testString)) {
        document.getElementById("password-charFromUsername").style.color = "red";
        passwordValidity =  false;
      } else {
        document.getElementById("password-charFromUsername").style.color = "green";
      }
      // Password Cannot Contains 3 consecutive letters in reversed order appears in id
      testString = testString.split('').reverse().join('');
      if (lowerCasePassword.includes(testString)) {
        document.getElementById("password-charFromUsername").style.color = "red";
        passwordValidity =  false;
      } else {
        document.getElementById("password-charFromUsername").style.color = "green";
      }
    }
  }
  if (passwordValidity){
    return true;
  } else{
    return false;
  }
}
