
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// SIGN UP
document.getElementById("signupForm").onsubmit = function(e) {
    e.preventDefault();

    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value;
    let role = document.getElementById("newRole").value;
    let users = getUsers();

    if (users.some(u => u.username === username)) {
        message.innerText = "Username already exists!";
        return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    message.innerText = "Sign Up successful! Please login.";
    showLogin();
};

// LOGIN
document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let user = getUsers().find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify({
            username: user.username,
            role: user.role
        }));

        location.href = role === "admin" ? "admin.html" : "student.html";
    } else {
        message.innerText = "Invalid login details!";
    }
};
