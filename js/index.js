document.getElementById("sign-in").addEventListener("click", () => {
    // window.location.href = "./home.html";
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    if (username === "admin" && password === "admin123") {
        window.location.href = "./home.html";
    } else {
        alert("Wrong credentials! Please enter the default credentials!");
    }
});