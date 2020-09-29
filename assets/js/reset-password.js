
async function resetPassword() {
  document.getElementById("resetButton").disabled = true;
  const username = document.getElementById("username-input").value;
  const ticketID = document.getElementById("ticketID-input").value;
  const securityCode = document.getElementById("securityCode-input").value;
  const newPassword = document.getElementById("newPassword-input").value;
  const retypePassword = document.getElementById("retypePassword-input").value;
  
  if(username === "" || ticketID === "" || securityCode === "" || newPassword === "" || retypePassword === "") {
      // if not properly filled in, show error message
      document.getElementById("invalid").style.display = "block";
  } else {
    if(newPassword === retypePassword){
      const userInput = {
        username: username,
        ticketID: ticketID,
        securityCode: securityCode,
        newPassword: newPassword
      };
      console.log(userInput);
      const response = await fetch('https://api.uniqon.kr/user/email/reset-password', {
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
        if(errorMessage.includes("Invalid") || errorMessage.includes("Need to")) {
          document.getElementById("invalid").style.display = "block";
          document.getElementById("password-notmatch").style.display = "none";
          document.getElementById("nochange").style.display = "none";
          document.getElementById("resetButton").disabled = false;
        } else if(errorMessage.includes("Nothing")){
            document.getElementById("invalid").style.display = "none";
            document.getElementById("password-notmatch").style.display = "none";
            document.getElementById("nochange").style.display = "block";
            document.getElementById("resetButton").disabled = false;
        } else if(errorMessage.includes("Cannot")){
          document.getElementById("invalid").style.display = "none";
          document.getElementById("password-notmatch").style.display = "none";
          document.getElementById("nochange").style.display = "none";
          alert(String(errorMessage));
          document.getElementById("resetButton").disabled = false;
        }
      } else if(response.status === 201) {
        document.getElementById("invalid").style.display = "none";
        document.getElementById("password-notmatch").style.display = "none";
        document.getElementById("nochange").style.display = "none";
        document.getElementById("success").style.display = "block";
        //TODO if successful exit after time
      } else if(response.status === 403) {
        //forbidden
      }
    } else{
      document.getElementById("password-notmatch").style.display = "block";
      document.getElementById("invalid").style.display = "none";
    }
  }
}