let email = document.querySelector(".email");
let password = document.querySelector(".password");
let login = document.querySelector(".login");
login?.addEventListener("click", Login);
async function Login() {
    try {
        if (!email.value || !password.value) {
            alert("Please fill in all fields!");
            return;
        }
        let obj = {
            email: email.value.trim(),
            password: password.value.trim()
        };
        let a = await fetch("https://e-commerce-backend-h4zm.vercel.app/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        let b;
        try {
            b = await a.json();
            console.log(b);
        }
        catch (error) {
            alert("try again the server not response");
        }
        if (!a.ok) {
            if (b.message === "User not found") {
                alert("you didn't register please register first");
                setTimeout(() => {
                    window.location.href = ("register.html");
                }, 2000);
            }
            if (b.message === "Invalid credentials") {
                alert("incorrect password or email try again");
            }
            else {
                alert(b.message || "Login failed. Please try again.");
            }
            return;
        }
        alert("login successfully");
        window.location.href = ("index.html");
    }
    catch (error) {
        console.log(error);
    }
}
export {};
//# sourceMappingURL=login.js.map