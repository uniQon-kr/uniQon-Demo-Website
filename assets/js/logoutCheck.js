---
---
async function logoutCheck() {
    if (localStorage.getItem("uniQonSignedIn") === null) {
        // call GET https://api.uniqon.kr/auth to check whether user is logged in or not
        const response = await fetch("https://api.uniqon.kr/auth", {
            credentials: 'include',
            method: 'GET'
        });
        const jsonResponse = await response.json();

        // Save signedIn value to local Storage
        localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);
    }

    // redirect to main page if logged in
    console.log(localStorage.getItem("uniQonSignedIn"));
    if (localStorage.getItem("uniQonSignedIn") === "true") {
        location.href = "{{ site.baseurl }}/";
    }
}

logoutCheck();