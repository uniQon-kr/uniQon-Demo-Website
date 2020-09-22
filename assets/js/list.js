async function list() {
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
  }
}

let docID,mentorID,collegeName,expectedGrad;