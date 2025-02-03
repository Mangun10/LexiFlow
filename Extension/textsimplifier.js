async function simplifyText(text) {
    const response = await fetch("https://api.textsimplifier.ai", { // Placeholder API
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text})
    });
    const data = await response.json();
    return data.simplifiedText;
}