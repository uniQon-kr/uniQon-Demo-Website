async function signInFunc(){
	let username = document.querySelector('[name="username"]').value;
	let password = document.querySelector('[name="password"]').value;
	// on press, check if both inputs (username and password) are entered properly
	if(username === "" || password === ""){
		// if not properly filled in, send error message,
		alert('Please fill in both username and password properly.')
	}else{
		// if properly filled in, send the username and password inputs to the auth API
		const userInput = {
			id : username,
			password : password,
		};
		const response = await fetch('https://api.uniqon.kr/auth/signin', {
			method: 'POST',
			body: JSON.stringify(userInput),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const myJson = await response.json(); //extract JSON from the http response
		// do something with myJson

		console.log(myJson);
	}
}
