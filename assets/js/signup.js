---
---
let pageOpened = false;
document.getElementById('terms').checked = false;

function pageVisited() {
  document.getElementById("invalid").style.display = "none";
  document.getElementById("agreeTC").style.display = "none";
  document.getElementById("duplicatedID").style.display = "none";
  document.getElementById("readTC").style.display = "none";
  document.getElementById("already").style.display = "none";
  document.getElementById("duplicatedNickname").style.display = "none";
  pageOpened = true;
}

async function tsCheck(){
  if (!pageOpened){
    document.getElementById("invalid").style.display = "none";
    document.getElementById("agreeTC").style.display = "none";
    document.getElementById("duplicatedID").style.display = "none";
    document.getElementById("readTC").style.display = "block";
    document.getElementById("already").style.display = "none";
    document.getElementById("duplicatedNickname").style.display = "none";
    document.getElementById('terms').checked = false;
  }
}

async function signUpFunc() {

  const tnc = document.getElementById('terms').checked;
  if(tnc === false) {
    document.getElementById("invalid").style.display = "none";
    document.getElementById("agreeTC").style.display = "block";
    document.getElementById("duplicatedID").style.display = "none";
    document.getElementById("readTC").style.display = "none";
    document.getElementById("already").style.display = "none";
    document.getElementById("duplicatedNickname").style.display = "none";
    return;
  }

  let pathname = location.pathname.split( '/' );

	const username = document.getElementById('username').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const nickname = document.getElementById('nickname').value;
  const type = [ pathname[2] ];
  document.getElementById("signupButton").disabled = true;

	if(username === "" || firstName === "" || lastName === "" || password === "" || email === "" || nickname === "") {
		// if not properly filled in, show error message
		document.getElementById("invalid").style.display = "block";
    document.getElementById("agreeTC").style.display = "none";
    document.getElementById("duplicatedID").style.display = "none";
    document.getElementById("readTC").style.display = "none";
    document.getElementById("already").style.display = "none";
    document.getElementById("duplicatedNickname").style.display = "none";
  } else {
    // if properly filled in, send the username and password inputs to the auth API
    const userInput = {
      id : username,
      firstName: firstName,
      lastName: lastName,
      password : password,
      email: email,
      nickname: nickname,
      type: type,
      tnc: tnc
    };
    const response = await fetch('https://api.uniqon.kr/user/signup', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check Error Message
    const jsonResponse = await response.json();
    if(response.status === 400) {
      const errorMessage = String(jsonResponse.error);
      if(errorMessage.includes("Duplicated ID")) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("agreeTC").style.display = "none";
        document.getElementById("duplicatedID").style.display = "block";
        document.getElementById("readTC").style.display = "none";
        document.getElementById("already").style.display = "none";
        document.getElementById("duplicatedNickname").style.display = "none";
        document.getElementById("signupButton").disabled = false;
      } else if(errorMessage.includes("Already")) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("agreeTC").style.display = "none";
        document.getElementById("duplicatedID").style.display = "none";
        document.getElementById("readTC").style.display = "none";
        document.getElementById("already").style.display = "block";
        document.getElementById("duplicatedNickname").style.display = "none";
        document.getElementById("signupButton").disabled = false;
      } else if(errorMessage.includes("Duplicated Nickname")) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("agreeTC").style.display = "none";
        document.getElementById("duplicatedID").style.display = "none";
        document.getElementById("readTC").style.display = "none";
        document.getElementById("already").style.display = "none";
        document.getElementById("duplicatedNickname").style.display = "block";
        document.getElementById("signupButton").disabled = false;
      } else {
        document.getElementById("invalid").style.display = "block";
        document.getElementById("agreeTC").style.display = "none";
        document.getElementById("duplicatedID").style.display = "none";
        document.getElementById("readTC").style.display = "none";
        document.getElementById("already").style.display = "none";
        document.getElementById("duplicatedNickname").style.display = "none";
        document.getElementById("signupButton").disabled = false;
      }
    } else if(response.ok) {
      location.href = "{{ site.baseurl }}/";
    }
  }
}