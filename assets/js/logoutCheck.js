---
---
async function logoutCheck() {
    if (localStorage.getItem("expiredAt") === null) {
        // call GET https://api.uniqon.kr/auth to check whether user is logged in or not
        const response = await fetch("https://api.uniqon.kr/auth", {
            credentials: 'include',
            method: 'GET'
        });
        const jsonResponse = await response.json();

        // compare expired at with current time
        localStorage.setItem('expiredAt', jsonResponse.expiredAt);
        if(response.status === 500){
            alert('Auth API Server Malfunctioning');
        }
    }

    // redirect to main page if logged in
    if (localStorage.getItem("expiredAt") > Date.now()) {
        location.href = "{{ site.baseurl }}/";
    }
}

logoutCheck();