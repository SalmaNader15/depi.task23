let name = document.querySelector(".name");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let register = document.querySelector(".register");
register?.addEventListener("click", Register);
async function Register() {
    try {
        if (!name.value || !email.value || !password.value) {
            alert("Please fill in all fields!");
            return;
        }
        let obj = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        let a = await fetch("https://e-commerce-backend-h4zm.vercel.app/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        let b = await a.json();
        window.location.href = ("index.html");
        if (!a.ok) {
            alert(b.message || "Something went wrong!");
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
}
export {};
//# sourceMappingURL=register.js.map