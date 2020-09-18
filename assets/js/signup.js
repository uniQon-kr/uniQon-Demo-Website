let pageOpened = false;

async function openCheck() {
  let link = document.getElementById('ts');
  link.addEventListener('click', pageVisited());

  function pageVisited(){
    pageOpened = true;
  }
}

async function tsCheck(){
  if (!pageOpened){
    document.getElementById("invalid").style.display = "none";
    document.getElementById("agreeTC").style.display = "none";
    document.getElementById("duplicated").style.display = "none";
    document.getElementById("readTC").style.display = "block";
    document.getElementById('terms').checked = false;
  }
}

async function signUpFunc() {

  const tnc = document.getElementById('terms').checked;
  if(tnc === false) {
    document.getElementById("invalid").style.display = "none";
    document.getElementById("agreeTC").style.display = "block";
    document.getElementById("duplicated").style.display = "none";
    document.getElementById("readTC").style.display = "none";
    return;
  }


	const username = document.getElementById('username').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const nickname = document.getElementById('nickname').value;

	if(username === "" || firstName === "" || lastName === "" || password === "" || email === "" || nickname === "") {
		// if not properly filled in, show error message
		document.getElementById("invalid").style.display = "block";
  }
  else {
    // if properly filled in, send the username and password inputs to the auth API
    const userInput = {
      id : username,
      firstName: firstName,
      lastName: lastName,
      password : password,
      email: email,
      nickname: nickname
    };
    const response = await fetch('https://api.uniqon.kr/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // Check Response Code and prompt error message if needed
    if(response.status === 400) {
      document.getElementById("invalid").style.display = "block";
      return;
    } 
    history.back();
  }
}