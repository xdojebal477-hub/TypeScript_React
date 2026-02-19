
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;


const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Modo Claro";
}


toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️ Modo Claro";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 Modo Oscuro";
    }
});