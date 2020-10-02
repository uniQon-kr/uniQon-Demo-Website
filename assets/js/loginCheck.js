---
---
async function loginCheck() {
    if (localStorage.getItem("resetPW") == "true" || localStorage.getItem("resetPW") == true) {
        if(!location.href.includes("changePassword")){
            location.href = "{{ site.baseurl }}/changePassword";
            return;
        }
    }

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

    // redirect to main page if not logged in or token expired
    if (localStorage.getItem("expiredAt") === undefined) {
        location.href = "{{ site.baseurl }}/";
    } else if (localStorage.getItem("expiredAt") <= Date.now()){
        location.href = "{{ site.baseurl }}/";
    }
}

loginCheck();