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
        nickname = jsonResponse.nickname;
        email = jsonResponse.email;
        document.getElementById("title").innerHTML = "Hi! " + jsonResponse.firstName + " " + jsonResponse.lastName;
        document.getElementById("nickname").value = nickname;
        document.getElementById("email").value = email;
        // Mentor
        if(jsonResponse.type.includes("mentor")) {
            document.getElementById("mentor").style.display = "block";
            document.getElementById("balance").innerHTML = jsonResponse.remainingBalance;
        }
        // Mentee
        if(jsonResponse.type.includes("mentee")) {
            document.getElementById("mentee").style.display = "block";
            document.getElementById("usedApp").innerHTML = jsonResponse.usedApp;
            document.getElementById("remainingApp").innerHTML = jsonResponse.remainingApp;
            document.getElementById("bookmark").style.display = "block";
            for(i=0; i < jsonResponse.bookmark.length; i++){
                const bookmarks = jsonResponse.bookmark[i].split("_");
                let collegeImage = "/assets/school-logo/" + bookmarks[1].replace(/ /g,'-') + ".png";

                document.getElementById("bookmarks").innerHTML += "<img class = 'collegeImage' src =" + collegeImage + ">" + "<p class = 'content-paragraph'>" + bookmarks[0] + "</p>";
                
            }
        }
    } else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
        await renew(); // try to renew access token
        if(localStorage.getItem("uniQonSignedIn")) {
            getMyInfo();
        }
    } else {
        alert("Server Error!! Please Try Again");
        location.href = "{{ site.baseurl }}/";
    }
}

async function updateMyInfo() {
    // Retrieve Inputs
    const newEmail = document.getElementById("email").value;
    const newNickname = document.getElementById("nickname").value;
    const updateObjects = {};

    // Select update contents
    if(newNickname !== nickname) {
        updateObjects.nickname = newNickname;
    }
    if(newEmail !== email) {
        updateObjects.email = newEmail;
    }

    // Check update target existance before sending request
    if(Object.keys(updateObjects).length === 0) {
        document.getElementById('noUpdate').style.display = "block";
        document.getElementById('invalid').style.display = "none";
        document.getElementById('duplicatedNickname').style.display = "none";
        document.getElementById('success').style.display = "none";
    } else {
        const response = await fetch('https://api.uniqon.kr/user/myinfo', {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(updateObjects),
            headers: {
				'Content-Type': 'application/json'
			}
        });

        if(response.ok) {
            document.getElementById('noUpdate').style.display = "none";
            document.getElementById('invalid').style.display = "none";
            document.getElementById('duplicatedNickname').style.display = "none";
            document.getElementById('success').style.display = "block";
            location.reload();
        } else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
            if(await renew()) { // try to renew access token
                updateMyInfo();
            }
        } else {
            const jsonResponse = await response.json();
            const errorMsg = String(jsonResponse.error);
            if(errorMsg.includes("Duplicated")) {
                document.getElementById('noUpdate').style.display = "none";
                document.getElementById('invalid').style.display = "none";
                document.getElementById('duplicatedNickname').style.display = "block";
                document.getElementById('success').style.display = "none";
            } else {
                document.getElementById('noUpdate').style.display = "none";
                document.getElementById('invalid').style.display = "block";
                document.getElementById('duplicatedNickname').style.display = "none";
                document.getElementById('success').style.display = "none";
            }
        }
    }
}

let email, nickname;
getMyInfo();