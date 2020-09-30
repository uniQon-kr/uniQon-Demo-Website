---
---
async function renew() {
    const response = await fetch("https://api.uniqon.kr/auth/renew", {
        credentials: 'include',
        method: 'POST'
    });
    const jsonRepsonse = await response.json();

    if(response.ok) {
        localStorage.setItem("expiredAt", jsonResponse.expiredAt);
        return true;
    } else {
        localStorage.setItem("expiredAt", undefined);
        location.href = "{{ site.baseurl }}/";
    }
}