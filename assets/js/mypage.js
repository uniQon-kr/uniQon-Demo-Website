---
---
async function getMyInfo() {
    const response = await fetch('https://api.uniqon.kr/user/myinfo', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        const jsonResponse = await response.json();
        // Common
        document.getElementById("title").innerHTML = "Hi! " + jsonResponse.firstName + " " + jsonResponse.lastName;
        document.getElementById("nickname").value = jsonResponse.nickname;
        document.getElementById("email").value = jsonResponse.email;
        // Mentor
        if(jsonResponse.type.includes("mentor")) {
            document.getElementById("mentor").style.display = "block";
        }
        // Mentee
        if(jsonResponse.type.includes("mentee")) {
            document.getElementById("mentee").style.display = "block";
        }
    } else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
        localStorage.setItem("uniQonSignedIn", false);
        location.href = "{{ site.baseurl }}/";
    } else {
        alert("Server Error!! Please Try Again");
        location.href = "{{ site.baseurl }}/";
    }
}

getMyInfo();