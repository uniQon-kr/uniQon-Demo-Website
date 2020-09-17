if (localStorage.getItem("uniQonSignedIn") === null) {
    // call GET https://api.uniqon.kr/auth to check whether user is logged in or not
    const response = await fetch("https://api.uniqon.kr/auth", {
        method: "GET"
    });
    const jsonResponse = await response.json();

    // Save signedIn value to local Storage
    localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);
}

// parse localStorage and display button accordingly
if (localStorage.getItem("uniQonSignedIn") === true) {
    document.getElementsByClassName("unauth").style.display = none;
    document.getElementsByClassName("auth").style.display = block;
} else {
    document.getElementsByClassName("unauth").style.display = none;
    document.getElementsByClassName("auth").style.display = block;
}