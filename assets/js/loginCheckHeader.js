async function loginCheckHeader() {
    if (localStorage.getItem("uniQonSignedIn") === null) {
        // call GET https://api.uniqon.kr/auth to check whether user is logged in or not
        const response = await fetch("https://api.uniqon.kr/auth", {
            method: 'GET'
        });
        const jsonResponse = await response.json();

        // Save signedIn value to local Storage
        localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);
    }

    // parse localStorage and display button accordingly
    if (localStorage.getItem("uniQonSignedIn") === true) {
        for (item of document.getElementsByClassName("auth")) {
            item.style.display = "block";
        }
        for (item of document.getElementsByClassName("unauth")) {
            item.style.display = "none";
        }
    } else {
        for (item of document.getElementsByClassName("auth")) {
            item.style.display = "none";
        }
        for (item of document.getElementsByClassName("unauth")) {
            item.style.display = "block";
        }
    }
}

loginCheckHeader();