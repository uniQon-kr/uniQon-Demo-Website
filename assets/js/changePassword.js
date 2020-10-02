---
---
async function changePasswordFunc() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("password-checked").value;
    const reEnter = document.getElementById("re-enter").value;
    document.getElementById("changePasswordButton").disabled = true;

    if(oldPassword === "" || newPassword !== reEnter || newPassword === "" || reEnter === "") {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("not-changed").style.display = "none";
        document.getElementById("not-match").style.display = "block";
    } else {
        const response = await fetch('https://api.uniqon.kr/auth/password', {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword, oldPassword: oldPassword })
        });
        const jsonResponse = await response.json();
        if(response.ok) {
            alert("Success");
            history.back();
        } else if(response.status === 400) {
            const errorMessage = String(jsonResponse.error);
            if(errorMessage.includes("New password is identical")) {
                document.getElementById("invalid").style.display = "none";
                document.getElementById("not-match").style.display = "none";
                document.getElementById("not-changed").style.display = "block";
            } else {
                document.getElementById("invalid").style.display = "block";
                document.getElementById("not-match").style.display = "none";
                document.getElementById("not-changed").style.display = "none";
            }
        }else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
            // Used Refresh Token
            localStorage.setItem("expiredAt", undefined);
            location.href = "{{ site.baseurl }}/";
        } else if(response.status === 500) { // Unauthorized OR Forbidden
            // Used Refresh Token
            localStorage.setItem("expriedAt", undefined);
            location.href = "{{ site.baseurl }}/";
        } else {
            document.getElementById("invalid").style.display = "block";
            document.getElementById("not-match").style.display = "none";
            document.getElementById("not-changed").style.display = "none";
        }
    }
    document.getElementById("changePasswordButton").disabled = false;
}