let docID,mentorID,collegeName,expectedGrad,listRem,index;
index = 0;

async function list( ) {
  const response = await fetch('https://api.uniqon.kr//application/list', {
      credentials: 'include',
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
  });
  if(response.ok) {
    const jsonResponse = await response.json();
    listRem = jsonResponse.length;
  }
  const jsonObj = jsonResponse[index];
  
  index++;
}
