async function loadMentors() {
  const response = await fetch('https://api.uniqon.kr//application/list', {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    const jsonResponse = await response.json();
    docID = jsonResponse.docID;
    mentorID = jsonResponse.mentorID;
    collegeName = jsonResponse.collegeName;
    expectedGrad = jsonResponse.expectedGrad;

    document.getElementById("mentorID").innerHTML = mentorID;
    document.getElementById("mentor-major").innerHTML = mentorID;
    document.getElementById("expectedGrad").innerHTML = mentorID;
      
    collegeImage = collegeName + ".png"
    document.getElementById("college-image").innerHTML = "{{ site.baseurl }}/assets/school-logo/" + collegeImage;
  } else{
    alert("Server Error!! Please Try Again");
    location.href = "{{ site.baseurl }}/";
  }
}

let docID,mentorID,collegeName,expectedGrad;
loadMentors();