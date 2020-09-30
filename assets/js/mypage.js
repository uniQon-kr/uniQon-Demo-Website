let jsonResponse;
let emailVerified = false;

async function getMyInfo() {
    const response = await fetch('https://api.uniqon.kr/user/myinfo', {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        jsonResponse = await response.json();
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

            //TODO change bookmark function below to create application list 
            for(i=0; i < jsonResponse.applicationDoc.length; i++){
                const applicationObj = jsonResponse.applicationDoc[i];
                let collegeName = applicationObj.college;
                let collegeImage = "/assets/school-logo/" + applicationObj.college.replace(/ /g,'-') + ".png";

                //TODO sorting
                if(applicationObj.progress === "draft") {
                    document.getElementById("draft").innerHTML += "<div class = 'collegeImageWrapper'></div>" 
                    + "<div><p class = 'bookmarkLink' href = '{{ site.baseurl }}/mentor-form'>" + applicationObj.name + " (" + collegeName + ")</p></div>";
                } else if(applicationObj.progress === "actionRequested") {
                    document.getElementById("actionRequested").innerHTML += "<div class = 'collegeImageWrapper'><img class = 'collegeImage' src =" + collegeImage + "></div>" 
                    + "<div><p class = 'bookmarkLink'>" + applicationObj.name + " (" + collegeName + ")</p></div>";
                } else if(applicationObj.progress === "inProgress") {
                    document.getElementById("inprogress").innerHTML += "<div class = 'collegeImageWrapper'><img class = 'collegeImage' src =" + collegeImage + "></div>" 
                    + "<div><p class = 'bookmarkLink'>" + applicationObj.name + " (" + collegeName + ")</p></div>";
                } else if(applicationObj.progress === "done") {
                    document.getElementById("reviewDone").innerHTML += "<div class = 'collegeImageWrapper'><img class = 'collegeImage' src =" + collegeImage + "></div>" 
                    + "<div><p class = 'bookmarkLink' onclick = 'openDetail(" + i + ")'>" + applicationObj.name + " (" + collegeName + ")</p></div>";
                }
            }
        }
        // Mentee
        if(jsonResponse.type.includes("mentee")) {
            document.getElementById("mentee").style.display = "block";
            document.getElementById("usedApp").innerHTML = jsonResponse.usedApp;
            document.getElementById("remainingApp").innerHTML = jsonResponse.remainingApp;
            document.getElementById("bookmark").style.display = "block";
            //bookmark function
            for(i=0; i < jsonResponse.bookmark.length; i++){
                const bookmarkArr = jsonResponse.bookmark[i].split("_");
                let collegeName = bookmarkArr[1].replace(/-/g,' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
                let collegeImage = "/assets/school-logo/" + bookmarkArr[1].replace(/ /g,'-') + ".png";

                document.getElementById("bookmarks").innerHTML += "<div class = 'collegeImageWrapper'><img class = 'collegeImage' src =" + collegeImage + "></div>" 
                + "<div><p class = 'bookmarkLink' onclick = 'openDetail(" + i + ")'>" + bookmarkArr[0] + " (" + collegeName + ")</p></div>";
            }
        }
        //if verification is needed
        if(jsonResponse.verifiedReq){
            document.getElementById("email").style.display = "inline-block";
            document.getElementById("sendVerification").style.display = "inline-block";
            document.getElementById("verification").style.display = "inline-block";
            document.getElementById("verify").style.display = "inline-block";
        }
    } else if(response.status === 401 || response.status == 403) { // Unauthorized OR Forbidden
        if(await renew()) { // try to renew access token
            getMyInfo();
        };
    } else {
        alert("Server Error!! Please Try Again");
        location.href = "{{ site.baseurl }}/";
    }
}

async function openDetail(i) {
    localStorage.setItem('docID', jsonResponse.bookmark[i]);
    window.location.href = "/application";
}

function emailChanged() {
    document.getElementById("sendVerification").style.display = "inline-block";
}

async function sendVerification() {

    document.getElementById('noUpdate').style.display = "none";
    document.getElementById('invalid').style.display = "none";
    document.getElementById('duplicatedNickname').style.display = "none";
    document.getElementById('success').style.display = "none";

    document.getElementById("sendVerification").disabled = true;
    document.getElementById("verification").style.display = "inline-block";
    document.getElementById("verification").value = "";
    document.getElementById("verify").style.display = "inline-block";
    const email = document.getElementById("email").value;
    
    if(email === "") {
        // if not properly filled in, show error message
        document.getElementById("invalid").style.display = "block";
    } else {
        const userInput = {email: email};
        const response = await fetch('https://api.uniqon.kr/user/email/send-verify-code', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(userInput),
            headers: {
            'Content-Type': 'application/json'
            }
        });
  
      // Check Error Message
      const jsonResponse = await response.json();
      if(response.status === 400) {
        const errorMessage = String(jsonResponse.error);
        if(errorMessage.includes("Invalid Input")) {
          document.getElementById("invalid").style.display = "block";
        } else if(errorMessage.includes("Email Same")){
            document.getElementById("invalid").style.display = "block";
        }
      } else if(response.status === 201) {
        alert("Verification Mail Sent")
      } else if(response.status === 500) {
        alert(String(jsonResponse.error));
      }
    }
    document.getElementById("sendVerification").disabled = false;
}

async function verifyEmail() {
    document.getElementById("verify").disabled = true;
    const verificationCode = document.getElementById("verification").value;
    const email = document.getElementById("email").value;
    if(verification === "" || email === "") {
        // if not properly filled in, show error message
        document.getElementById("invalid").style.display = "block";
    } else {
        const userInput = {email: email, verifyCode: verificationCode};
        const response = await fetch('https://api.uniqon.kr/user/email/verify', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(userInput),
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
      // Check Error Message
      const jsonResponse = await response.json();
      if(response.status === 400 || response.status === 403) {
        const errorMessage = String(jsonResponse.error);
        if(errorMessage.includes("New Email Not Match")) {
            document.getElementById("invalid").style.display = "block";
            document.getElementById("needtoSave").style.display = "none";
            emailVerified = false;
        } else if(errorMessage.includes("Invalid Input")){
            document.getElementById("invalid").style.display = "block";
            document.getElementById("needtoSave").style.display = "none";
            emailVerified = false;
        }else if(errorMessage.includes("Code Expired or Not Matching")){
            document.getElementById("invalid").style.display = "block";
            document.getElementById("needtoSave").style.display = "none";
            emailVerified = false;
        }
      } else if(response.status === 200) {
        if(jsonResponse.message.includes("Verification Finish: Need to Save")){
            document.getElementById("invalid").style.display = "none";
            document.getElementById("sendVerification").style.display = "none";
            document.getElementById("verification").style.display = "none";
            document.getElementById("verify").style.display = "none";
            document.getElementById("needtoSave").style.display = "block";
            emailVerified = true;
        }else if(jsonResponse.message.includes("Verification Finish")) {
            document.getElementById("invalid").style.display = "none";
            document.getElementById("sendVerification").style.display = "none";
            document.getElementById("verification").style.display = "none";
            document.getElementById("verify").style.display = "none";
            document.getElementById("needtoSave").style.display = "none";
            emailVerified = true;
        } 
      }
    }
    document.getElementById("verify").disabled = false;
}

async function updateMyInfo() {
    // TODO: Disable
    if(emailVerified){
        document.getElementById("sendVerification").style.display = "none";
        document.getElementById("verification").style.display = "none";
        document.getElementById("verify").style.display = "none";
        document.getElementById("needtoSave").style.display = "none";
    }

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