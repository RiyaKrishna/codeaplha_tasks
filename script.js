const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const quoteBox = document.getElementById("quote");
const rewardBtn = document.getElementById("rewardBtn");
const calendar = document.getElementById("calendar");

let currentLang = "en";
let currentQuoteIndex = 0;

const quotes = {
  en: [
    "Stay disciplined and confident 💪",
    "One task at a time brings success 🚀",
    "Believe in your journey ✨",
    "Small steps, big dreams 🌱",
    "Push yourself, because no one else will 🌟"
  ],
  hi: [
    "अनुशासन और आत्मविश्वास बनाए रखें 💪",
    "एक-एक कार्य सफलता की ओर ले जाता है 🚀",
    "अपने सफर पर विश्वास रखें ✨",
    "छोटे कदम, बड़े सपने 🌱",
    "खुद को आगे बढ़ाओ, कोई और नहीं करेगा 🌟"
  ]
};

const emojiMap = {
  study: "📚",
  code: "💻",
  shopping: "🛒",
  clean: "🧹",
  food: "🍔",
  exercise: "🏋️",
  sleep: "😴",
  book: "📖",
  call: "📞",
  project: "📂",
  task: "📝",
  read: "📘",
  phone: "📱"
};

function getEmoji(task) {
  task = task.toLowerCase();
  for (let key in emojiMap) {
    if (task.includes(key)) return emojiMap[key];
  }
  return "✅";
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = `${getEmoji(taskText)} ${taskText}`;
  li.appendChild(span);

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.onclick = () => {
    li.remove();
    checkAllCompleted();
  };

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", taskText);
    if (newTask) {
      span.innerText = `${getEmoji(newTask)} ${newTask}`;
      checkAllCompleted();
    }
  };

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✔️";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    checkAllCompleted();
  };

  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  taskList.appendChild(li);
  taskInput.value = "";

  checkAllCompleted();
}

function speakTask() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.onresult = function (event) {
    taskInput.value = event.results[0][0].transcript;
    addTask();
  };
  recognition.start();
}

function checkAllCompleted() {
  const tasks = taskList.querySelectorAll("li");
  const allDone = [...tasks].length > 0 && [...tasks].every(li => li.classList.contains("completed"));
  rewardBtn.style.display = allDone ? "block" : "none";
}

function toggleQuotes() {
  currentLang = currentLang === "en" ? "hi" : "en";
  currentQuoteIndex = 0;
  quoteBox.innerText = quotes[currentLang][currentQuoteIndex];
}

function changeQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes[currentLang].length;
  quoteBox.innerText = quotes[currentLang][currentQuoteIndex];
}

function switchTheme() {
  const themes = ["theme-red", "theme-purple", "theme-green", "theme-sunset", "dark"];
  const current = document.body.className;
  let nextIndex = themes.indexOf(current);
  nextIndex = (nextIndex + 1) % themes.length;
  document.body.className = themes[nextIndex];
}

// ⏳ Auto-load first quote
window.onload = () => {
  quoteBox.innerText = quotes[currentLang][currentQuoteIndex];
};
