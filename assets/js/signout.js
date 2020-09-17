
async function signOutFunc(){
  const response = await fetch("http://api.uniqon.kr/signout",{
    method: "DELETE"
  })
  localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);

  if (localStorage.getItem("uniQonSignedIn") === true){
    window.location.replace("{{ site.baseurl }}assets\js\signout.js");
  }
}
