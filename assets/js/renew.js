---
---
async function renew() {
    const response = await fetch("https://api.uniqon.kr/auth/renew", {
        credentials: 'include',
        method: 'POST'
    });

    if(response.ok) {
        localStorage.setItem("uniQonSignedIn", true);
        return true;
    } else {
        localStorage.setItem("uniQonSignedIn", false);
        location.href = "{{ site.baseurl }}/";
    }
}