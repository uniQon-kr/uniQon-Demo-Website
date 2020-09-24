async function signInFunc(){
	const username = document.getElementById('username-input').value;
	const password = document.getElementById('password-input').value;

	// on press, check if both inputs (username and password) are entered properly
	if(username === "" || password === "") {
		// if not properly filled in, show error message
		document.getElementById("invalid").style.display = "block";
		document.getElementById("not-match").style.display = "none";
	} else {
		// if properly filled in, send the username and password inputs to the auth API
		const userInput = {
			id : username,
			password : password,
		};
		const response = await fetch('https://api.uniqon.kr/auth/signin', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(userInput),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Check Response Code and prompt error message if needed
		if(response.status === 400) {
			document.getElementById("invalid").style.display = "block";
			document.getElementById("not-match").style.display = "none";
			document.getElementById("loginFail").style.display = "none";
			return;
		} else if(response.status === 401) {
			document.getElementById("invalid").style.display = "none";
			document.getElementById("not-match").style.display = "none";
			document.getElementById("loginFail").style.display = "block";
			return;
		} else if(response.status === 404) {
			document.getElementById("invalid").style.display = "none";
			document.getElementById("not-match").style.display = "block";
			document.getElementById("loginFail").style.display = "none";
			return;
		} else if(response.status === 201) {
			document.getElementById("invalid").style.display = "none";
			document.getElementById("not-match").style.display = "none";
			document.getElementById("loginFail").style.display = "none";

			// Setup uniQonSignedIn
			const jsonResponse = await response.json(); //extract JSON from the http response
			localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);
			// On success sign in, go back to previous page
			history.back();
		}
	}
}
