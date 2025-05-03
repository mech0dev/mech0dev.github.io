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

  // Switch classes
  document.body.classList.toggle("light", !isLight);
  document.body.classList.toggle("dark", isLight);

  // Switch particle config
  loadParticles(isLight ? darkConfig : lightConfig);

  // Trigger ripple burst
  triggerRippleBurst();
}


const SUPABASE_URL = "https://vwkbwukzhgmnknpaeowu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3a2J3dWt6aGdtbmtucGFlb3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODkzMjUsImV4cCI6MjA2MTc2NTMyNX0.ButW5X_m0nN8yfmBK-_Q8-HsYgnEphPLJgerLhPJ120"; // truncated for safety
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // The user will need to confirm their email before logging in
  alert("Sign up successful! Please check your email to confirm and then log in.");
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;
  if (!user) {
    alert("Login failed or user not confirmed.");
    return;
  }

  const { data: progressData, error: progressError } = await supabase
    .from("progress")
    .select("level")
    .eq("user_id", user.id)
    .single();

  if (progressError || !progressData) {
    alert("No progress found. Initializing...");
    await supabase.from("progress").insert({ user_id: user.id, level: 0 });
    window.location.href = "level-0.html";
  } else {
    const level = progressData.level;
    window.location.href = `dev stuff/level-${level}.html`;
  }
}
