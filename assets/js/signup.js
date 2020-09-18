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
}