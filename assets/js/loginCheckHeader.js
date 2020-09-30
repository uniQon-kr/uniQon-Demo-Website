async function loginCheckHeader() {
    if (localStorage.getItem("expiredAt") === null) {
        // call GET https://api.uniqon.kr/auth to check whether user is logged in or not
        const response = await fetch("https://api.uniqon.kr/auth", {
            credentials: 'include',
            method: 'GET'
        });
        const jsonResponse = await response.json();
        localStorage.setItem('expiredAt', jsonResponse.expiredAt);
        if(response.status === 500){
            alert('Auth API Server Malfunctioning');
        }
    }

    // parse localStorage and display button accordingly
    if (localStorage.getItem("expiredAt") > Date.now()) {
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