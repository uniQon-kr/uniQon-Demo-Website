
async function signOutFunc(){
  const response = await fetch("http://uniqon.kr/signout/",{
    method: "DELETE"
  })
  localStorage.setItem("uniQonSignedIn", jsonResponse.signedIn);
}
