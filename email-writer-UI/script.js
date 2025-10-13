const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toggleModeBtn = document.getElementById("toggleMode");

generateBtn.addEventListener("click", async () => {
  const emailContent = document.getElementById("emailContent").value.trim();
  const tone = document.getElementById("tone").value;

  if (!emailContent || !tone) {
    alert("Please enter email content and select a tone.");
    return;
  }

  document.getElementById("replyText").innerText = "Generating reply...";
  try {
    const response = await fetch("http://localhost:8080/api/email/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailContent: emailContent,
        tone: tone
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate reply");
    }

    const reply = await response.text();
    document.getElementById("replyText").innerText = reply;
  } catch (error) {
    document.getElementById("replyText").innerText = "Error: " + error.message;
  }
});

copyBtn.addEventListener("click", () => {
  const text = document.getElementById("replyText").innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert("Reply copied to clipboard!"))
    .catch(() => alert("Failed to copy text"));
});

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    toggleModeBtn.innerText = "☀️ Light Mode";
  } else {
    toggleModeBtn.innerText = "🌙 Dark Mode";
  }
});
