
async function signOutFunc(){
  const response = await fetch("https://api.uniqon.kr/auth/signout",{
    method: "DELETE"
  })
  const jsonResponse = await response.json();
  
  localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);

  if (localStorage.getItem("uniQonSignedIn") === true){
    window.location.replace("{{ site.baseurl }}assets\js\signout.js");
  }
  console.log(jsonResponse);
}