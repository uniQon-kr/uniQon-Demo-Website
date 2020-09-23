
async function loadMentor() {
  sessionStorage.setItem('docID');
  const response = await fetch('https://api.uniqon.kr//application/'+ localStorage.getItem('docID'), {
      credentials: 'include',
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    const jsonResponse = await response.json();
    
    const name = jsonResponse.name;
    const admittedMajor = jsonResponse.admittedMajor;
    const grad = jsonResponse.grad;
    const college = jsonResponse.college;
    const background = jsonResponse.background;
    const academics = jsonResponse.academics;
    const act = jsonResponse.academics.act;
    const sat1 = jsonResponse.academics.sat1;
    const sat2Count = jsonResponse.academics.sat2Count;
    const apCount = jsonResponse.academics.apCount;
    const honorsCount = jsonResponse.honorsCount;
    const activitiesCount = jsonResponse.activitiesCount;
    const essay = jsonResponse.essay;

    collegeImage = collegeName + ".png"
    document.getElementById("college-image").src = "{{ site.baseurl }}/assets/school-logo/" + college.name + ".png";
  
    document.getElementById("mentor-name").innerHTML = localStorage.getItem('mentorName');
    document.getElementById("grad").innerHTML = college.grad;
    document.getElementById("mentor-major").innerHTML = college.admittedMajor;

    document.getElementById("college-detail").innerHTML = "<li>"+college.name+"</li>"+"<li>"+college.admittedMajor+"</li>"+"<li>"+college.grad+"</li>";
    document.getElementById("background-detail").innerHTML = "<li>"+background.citizenship+"<li>"+background.gender+"</li>"+background.ethnicity+"</li>"+"<li>"+background.hooks+"</li>";
    document.getElementById("academics-detail").innerHTML = "<li>"+academics+"</li>"+"<li>"+sat1+"</li>"+"<li>"+sat2Count+"</li>"+"</li>"+"<li>"+act+"</li>" + "<li>"+apCount+"</li>";
      
    document.getElementById("honors-detail").innerHTML += "<li>"+honorsCount+"</li>";
    document.getElementById("activities-detail").innerHTML += "<li>"+activitiesCount+"</li>";

    } else{
    alert("Server Error!! Please Try Again");
    location.href = "{{ site.baseurl }}/";
  }
}

loadMentor();