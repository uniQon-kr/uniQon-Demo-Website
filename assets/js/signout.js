---
---
async function signOutFunc() {
  // Log out from server
  await fetch("https://api.uniqon.kr/auth/signout",{
    credentials: 'include',
    method: "DELETE"
  });

  // Unset uniQonSignedIn
  localStorage.setItem('expiredAt', jsonResponse.expiredAt);

  // Redirect to main page
  if (location === "{{ site.baseurl }}/") {
    location.reload();
  } else {
    location.href = "{{ site.baseurl }}/";
  }
}