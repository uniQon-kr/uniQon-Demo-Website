async function findIDFunc() {
  const email = document.getElementById('email').value;
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  document.getElementById("findUsernameButton").disabled = true;

	if(email === "" || firstName === "" || lastName === "") {
		// if not properly filled in, show error message
		document.getElementById("invalid").style.display = "block";
    document.getElementById("not-match").style.display = "none";
    document.getElementById("duplicated-info").style.display = "none";
  } else {
    // if properly filled in, send the username and password inputs to the auth API
    const userInput = {
      email: email,
      firstName: firstName,
      lastName: lastName
    };
    const response = await fetch('https://api.uniqon.kr/user/find-id', {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check Error Message
    const jsonResponse = await response.json();
    if(response.status === 400 || response.status === 404) {
      const errorMessage = String(jsonResponse.error);
      if(errorMessage.includes("User not")) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("not-match").style.display = "block";
        document.getElementById("duplicated-info").style.display = "none";
        document.getElementById("findUsernameButton").disabled = false;
      } else if(errorMessage.includes("Duplicated Information")) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("not-match").style.display = "none";
        document.getElementById("duplicated-info").style.display = "block";
        document.getElementById("findUsernameButton").disabled = false;
      } else {
        document.getElementById("invalid").style.display = "block";
        document.getElementById("not-match").style.display = "none";
        document.getElementById("duplicated-info").style.display = "none";
        document.getElementById("findUsernameButton").disabled = false;
      }
    } else if(response.ok) {
      alert("New Password has been sent to Your Email!");
      location.href = "{{ site.baseurl }}/signin";
    }
  }
}