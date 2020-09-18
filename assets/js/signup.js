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
    alert("Please read Terms and Services");
    document.getElementById('terms').checked = false;
  }
}

async function signUpFunc() {
  const tnc = document.getElementById('terms').checked;
  if(tnc === false) {
    alert("Please Agree to Our Terms and Condition!!");
    return;
  }

  const username = document.getElementById('username').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
}