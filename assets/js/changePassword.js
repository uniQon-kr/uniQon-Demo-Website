---
---
async function changePasswordFunc() {
    const newPassword = document.getElementById("new-password").value;
    const reEnter = document.getElementById("re-enter").value;
    document.getElementById("changePasswordButton").disabled = true;

    if(newPassword !== reEnter || newPassword === "" || reEnter === "") {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("not-match").style.display = "block";
    } else {
        const response = await fetch('https://api.uniqon.kr/auth/password', {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword })
        });
        if(response.ok) {
            alert("Success");
            history.back();
        } else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
            // Used Refresh Token
            localStorage.setItem("uniQonSignedIn", false);
            location.href = "{{ site.baseurl }}/";
        } else if(response.status === 500) { // Unauthorized OR Forbidden
            // Used Refresh Token
            localStorage.setItem("uniQonSignedIn", false);
            location.href = "{{ site.baseurl }}/";
        } else {
            document.getElementById("invalid").style.display = "block";
            document.getElementById("not-match").style.display = "none";
        }
    }
    document.getElementById("changePasswordButton").disabled = false;
}