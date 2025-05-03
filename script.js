const lightConfig = {
  particles: {
    number: { value: 50 },
    color: { value: "#ff70a6" },
    shape: { type: "polygon" },
    opacity: { value: 0.6 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      out_mode: "out"
    }
  }
};

const darkConfig = {
  particles: {
    number: { value: 60 },
    color: { value: "#9999ff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 2 },
    move: {
      enable: true,
      speed: 0.6,
      direction: "top",
      out_mode: "out"
    }
  }
};

function loadParticles(config) {
  if (window.pJSDom && pJSDom.length) {
    pJSDom[0].pJS.fn.vendors.destroypJS();
    pJSDom = [];
  }
  particlesJS("particles-js", config);
}

// Load initial theme
window.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('dark')) {
    loadParticles(darkConfig);
  } else {
    loadParticles(lightConfig);
  }
});

function triggerRippleBurst() {
  const container = document.getElementById("ripple-container");
  for (let i = 0; i < 2; i++) {
    const square = document.createElement("div");
    square.className = "ripple";
    square.style.left = `${window.innerWidth / 2 - 50}px`;
    square.style.top = `${window.innerHeight / 2 - 50}px`;
    square.style.animationDelay = `${i * 100}ms`;
    container.appendChild(square);
    setTimeout(() => square.remove(), 1000);
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains("light");

  document.body.classList.remove(isLight ? "light" : "dark");
  document.body.classList.add(isLight ? "dark" : "light");

  setTimeout(() => {
    loadParticles(isLight ? darkConfig : lightConfig);
  }, 300);

  triggerRippleBurst();
}

function checkPassword() {
    const password = document.getElementById('password').value;
    const passwordMap = {
        '15423': 'admin.html', // Example: Redirect to admin section
    };

    if (password in passwordMap) {
        window.location.href = passwordMap[password];
    } else {
        alert('Incorrect password. Please try again.');
    }
    }

    const SUPABASE_URL = "https://vwkbwukzhgmnknpaeowu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3a2J3dWt6aGdtbmtucGFlb3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODkzMjUsImV4cCI6MjA2MTc2NTMyNX0.ButW5X_m0nN8yfmBK-_Q8-HsYgnEphPLJgerLhPJ120"; // your real key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signup");
  const loginBtn = document.getElementById("login");

  signupBtn.addEventListener("click", async () => {
    const { error: signUpError } = await supabase.auth.signUp({
      email: emailInput.value,
      password: passwordInput.value
    });

    if (signUpError) {
      alert(signUpError.message);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("progress").insert({
        user_id: user.id,
        level: 0
      });
      alert("Sign up successful. Please log in.");
    }
  });

  loginBtn.addEventListener("click", async () => {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: emailInput.value,
      password: passwordInput.value
    });

    if (loginError) {
      alert(loginError.message);
    } else {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error: progressError } = await supabase
        .from("progress")
        .select("level")
        .eq("user_id", user.id)
        .single();

      if (progressError || !data) {
        alert("No progress found. Contact support.");
        return;
      }

      const level = data.level;
      window.location.href = `level-${level}.html`;
    }
  });
});
