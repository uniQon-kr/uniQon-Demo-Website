---
---
async function loadTC() {
    const fullResponse = await fetch("{{ site.baseurl }}/assets/terms/mentor-full.txt");
    const summaryResponse = await fetch("{{ site.baseurl }}/assets/terms/mentor-short.txt");

    if(fullResponse.ok && summaryResponse.ok) {
        const fullText = await fullResponse.text();
        const summaryText = await summaryResponse.text();
        document.getElementById('full').innerHTML = fullText;
        document.getElementById('summary').innerHTML = summaryText;
    } else {
        alert("Fail to Load Terms And Condtion!! Please Reload Site by Pressing F5");
    }
}

loadTC();