
async function signOutFunc() {
  // Log out from server
  await fetch("https://api.uniqon.kr/auth/signout",{
    method: "DELETE"
  });

  // Unset uniQonSignedIn
  localStorage.setItem("uniQonSignedIn", false);

  // Redirect to main page
  if (location === "https://uniqon.kr") {
    location.reload();
  } else {
    location.href = "https://uniqon.kr";
  }
}