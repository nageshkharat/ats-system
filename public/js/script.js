document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("role", document.getElementById("role").value);
  formData.append("jobDescription", document.getElementById("jobDescription").value);
  formData.append("resume", document.getElementById("resume").files[0]);

  try {
    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      const { score, role } = data;
      window.location.href = `/result.html?score=${score}&role=${role}`;  // Redirect to result page
    } else {
      const data = await res.json();
      document.getElementById("message").innerHTML = `<p>${data.message}</p>`;
      document.getElementById("message").style.color = "red";
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    document.getElementById("message").innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    document.getElementById("message").style.color = "red";
  }
});
