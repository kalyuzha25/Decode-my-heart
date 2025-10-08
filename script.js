// ------------------- LocalStorage -------------------
function saveProgress(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadProgress(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

// ------------------- LOCK LONG PRESS -------------------
function addLockLongPress(lockId) {
  const lock = document.getElementById(lockId);
  let mouseIsDown = false;

  lock.addEventListener('mousedown', () => {
    mouseIsDown = true;
    setTimeout(() => {
      if (mouseIsDown) {
        lock.classList.toggle('open');
        lock.classList.toggle('close');
      }
    }, 1000);
  });

  lock.addEventListener('mouseup', () => mouseIsDown = false);
  lock.addEventListener('mouseleave', () => mouseIsDown = false);
}

['lock-memory','lock-music','lock-ai','lock-flower','lock-alphabet'].forEach(addLockLongPress);

// ------------------- MEMORY CHALLENGE -------------------
const memoryInput = document.getElementById('memory-input');
const memorySubmit = document.getElementById('memory-submit');
const lockMemory = document.getElementById('lock-memory');
const musicChallenge = document.getElementById('music-challenge');

const memoryState = loadProgress("memoryChallenge") || { unlocked: false, value: '' };
if(memoryState.unlocked){
  lockMemory.classList.replace('close','open');
  musicChallenge.style.display = 'block';
  memoryInput.value = memoryState.value;
}

memorySubmit.addEventListener('click', () => {
  const val = memoryInput.value.trim();
  const parts = val.split(',');
  if(parts.length === 2 && parts[0].trim().startsWith("50.86") && parts[1].trim().startsWith("4.358")){
    lockMemory.classList.replace('close','open');
    musicChallenge.style.display = 'block';
    saveProgress("memoryChallenge",{ unlocked:true, value:val });
  } else {
    alert("Incorrect coordinates. Try again!");
    saveProgress("memoryChallenge",{ unlocked:false, value:val });
  }
});

// ------------------- MUSIC CHALLENGE -------------------
const musicInput = document.getElementById('music-input');
const musicSubmit = document.getElementById('music-submit');
const lockMusic = document.getElementById('lock-music');
const aiChallenge = document.getElementById('ai-challenge');

const musicState = loadProgress("musicChallenge") || { unlocked:false, value:'' };
if(musicState.unlocked){
  lockMusic.classList.replace('close','open');
  aiChallenge.style.display = 'block';
  musicInput.value = musicState.value;
}

musicSubmit.addEventListener('click', () => {
  const val = musicInput.value.trim();
  if(val === "6114"){
    lockMusic.classList.replace('close','open');
    aiChallenge.style.display = 'block';
    saveProgress("musicChallenge",{ unlocked:true, value:val });
  } else {
    saveProgress("musicChallenge",{ unlocked:false, value:val });
  }
});

// ------------------- AI CHALLENGE -------------------
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const passwordContainer = document.getElementById('password-container');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const lockAI = document.getElementById('lock-ai');

const questions = [
  "Question 1: What is the exact time when you sent her a first message?",
  "Question 2: Who did say 'I love you' first?",
  "Question 3: What's your full name (4's version)",
  "Question 4: What's her favorite word?",
  "Question 5: How can you make her smile?"
];

const answers = [
  ["20:24","20.24"],
  ["me","bryan"],
 ["bryan sanchez paul pazmino"],
 ["hroshi"],
  ["look at me"]
];
const secretPassword = "LoveYouBilshe4";

let aiState = loadProgress("aiChallenge") || { currentQuestion:0, unlocked:false };
let currentQuestion = aiState.currentQuestion;

function normalize(str){ return str.trim().toLowerCase(); }

function askQuestion(){
  if(currentQuestion < questions.length){
    chatLog.innerHTML += `<p class="bot">${questions[currentQuestion]}</p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } else {
    // Показуємо поле для вводу пароля тільки після всіх питань
    chatInput.style.display = 'none';
    chatForm.querySelector('button').style.display = 'none';
    chatLog.innerHTML += `<p class="final-bot">💌 Secret password is LoveYouBilshe4 </p>`;
    passwordContainer.style.display = 'block';
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

// Відновлення стану
if(aiState.unlocked){
  lockAI.classList.replace('close','open');
  passwordContainer.style.display = 'block';
}

chatForm.addEventListener('submit', e=>{
  e.preventDefault();
  const userAnswer = normalize(chatInput.value);
  if(!userAnswer) return;

  chatLog.innerHTML += `<p class="user">${chatInput.value}</p>`;

  if(answers[currentQuestion].map(normalize).includes(userAnswer)){
    chatLog.innerHTML += `<p class="bot">Correct! ✅</p>`;
    currentQuestion++;
    saveProgress("aiChallenge",{ currentQuestion, unlocked:aiState.unlocked });
  } else {
    chatLog.innerHTML += `<p class="bot">Incorrect. ❌ Try again!</p>`;
  }

  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
  askQuestion();
});

// Відкриття замка тільки після правильного введення пароля
passwordSubmit.addEventListener('click', () => {
  if(passwordInput.value.trim() === secretPassword){
    lockAI.classList.replace('close','open');
    aiState.unlocked = true;
    saveProgress("aiChallenge",{ currentQuestion, unlocked:true });

    const flowerChallenge = document.getElementById('flower-challenge');
    flowerChallenge.style.display = 'block';
    flowerChallenge.scrollIntoView({ behavior:"smooth" });
  } else {
    alert("❌ Incorrect password. Try again!");
    passwordInput.value = '';
  }
});

// Відновлення логів після перезавантаження
for(let i=0;i<currentQuestion;i++){
  chatLog.innerHTML += `<p class="bot">${questions[i]}</p>`;
}
askQuestion();
// ---------------- FLOWER CHALLENGE ----------------
const flowers = document.querySelectorAll('#flower-challenge .flower');
const flowerPasswordDiv = document.getElementById('flower-password'); 
const flowerMessageDiv = document.getElementById('flower-message');
const flowerPasswordInputContainer = document.getElementById('flower-password-container');
const lockFlower = document.getElementById('lock-flower');
const flowerSecretPassword = "LOVEYOU";

// Спочатку ховаємо все
flowerPasswordDiv.style.display = "none"; 
flowerPasswordInputContainer.style.display = "none"; 
lockFlower.classList.add('close');

flowers.forEach(flower => {
  flower.addEventListener('click', () => {
    if(flower.dataset.correct === "true"){
      flower.classList.add('correct');
      flowerMessageDiv.textContent = "";

      // Показуємо пароль і поле для вводу після натискання правильної квітки
      flowerPasswordDiv.textContent = `🎉 The password is: ${flowerSecretPassword}`;
      flowerPasswordDiv.style.display = "block";
      flowerPasswordInputContainer.style.display = "block";

    } else {
      flower.classList.add('incorrect');
      flowerMessageDiv.textContent = "Oops! Try another one 😏";
      setTimeout(() => flower.classList.remove('incorrect'), 300);
    }
  });
});

// Введення пароля
document.getElementById('flower-password-submit').addEventListener('click', () => {
  const input = document.getElementById('flower-password-input');
  if(input.value.trim().toUpperCase() === flowerSecretPassword){
    flowerPasswordInputContainer.style.display = 'none';
    lockFlower.classList.replace('close','open');
    const alphabetChallenge = document.getElementById('alphabet-challenge');
    alphabetChallenge.style.display = 'block';
    alphabetChallenge.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("❌ Incorrect password. Try again!");
    input.value = '';
  }
});
// ------------------- ALPHABET CHALLENGE -------------------
const alphabetContainer = document.getElementById("alphabet-container");
const wordInput = document.getElementById("word-input");
// const secretWord = "MY BEAUTIFUL POHANY-I WILL ALWAYS LOVE YOU!";
 const secretWord = "MY BEAUTIFUL POHANY";
//const secretWord = "MY";
let currentIndex = 0;

const emojiAlphabet = {
  A: "💖",  B: "🌸",  C: "🌙",  D: "🎀",  E: "💌",
  F: "✨",  G: "🕊️",  H: "🌈",  I: "🔥",  J: "🎶",
  K: "💎",  L: "🌹",  M: "🌊",  N: "🍓",  O: "🌞",
  P: "🌟",  Q: "🪐",  R: "🩷",  S: "🌺",  T: "🌻",
  U: "🌼",  V: "💫",  W: "🌷",  X: "🌿",  Y: "🍀",  Z: "🍁",
  "-": "🍬", "!": "🪄", " ": "😛"
};

// Створюємо кнопки для всіх символів алфавіту
alphabetContainer.innerHTML = "";
Object.entries(emojiAlphabet).forEach(([letter, symbol]) => {
  const btn = document.createElement("button");
  btn.className = "symbol-btn";
  btn.textContent = symbol;
  btn.dataset.letter = letter.toUpperCase(); // всі букви у верхньому регістрі
  alphabetContainer.appendChild(btn);
});

// Підсвічування наступної букви
function highlightNext() {
  if(currentIndex >= secretWord.length) return;

  const nextLetter = secretWord[currentIndex].toUpperCase();

  // прибираємо стару підсвітку
  document.querySelectorAll('.symbol-btn.highlight').forEach(btn => btn.classList.remove('highlight'));

  // підсвічуємо всі кнопки з потрібним символом
  Array.from(alphabetContainer.children)
    .filter(btn => btn.dataset.letter === nextLetter)
    .forEach(btn => btn.classList.add('highlight'));
}

// Підсвічуємо першу букву
highlightNext();

alphabetContainer.addEventListener("click", e => {
  if(!e.target.classList.contains("symbol-btn")) return;

  const letter = e.target.dataset.letter;
  const currentLetter = secretWord[currentIndex].toUpperCase();

  if(letter === currentLetter){
    wordInput.value += secretWord[currentIndex]; // беремо оригінальний символ
    currentIndex++;
    highlightNext();

    if(currentIndex === secretWord.length){
      document.getElementById("next-task").style.display = "block";
      document.getElementById("lock-alphabet").classList.replace("close","open");
      document.getElementById("date-challenge-6").style.display = "block";
      document.getElementById("mini-calculator").style.display = "block";
      document.getElementById("date-challenge-6").scrollIntoView({ behavior:"smooth" });
    }
  } else {
    e.target.classList.add("incorrect");
    setTimeout(()=>e.target.classList.remove("incorrect"),300);
  }
});

// ------------------- DATE CHALLENGE 6 -------------------
document.getElementById("date-challenge-6").style.display = "none";
document.getElementById("mini-calculator").style.display = "none";

const alphabetContainer6 = document.getElementById("alphabet-container-6");
const input6 = document.getElementById("letter-input-6");
const submitBtn6 = document.getElementById("submit-letter-6");
const lock6 = document.getElementById("lock-6");
const dates6 = ["14/02/2025","21/03/2025","06/04/2025","09/04/2025","01/05/2025","09/10/2025"];
let currentLevel = 0;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
alphabet.forEach(letter=>{
  const btn = document.createElement('button');
  btn.classList.add('letter-btn');
  btn.id = `alphabet6-${letter}`;
  btn.textContent = letter;
  alphabetContainer6.appendChild(btn);
});

function dateToLetter(date){
  let sum = date.replace(/\D/g,'').split('').reduce((a,b)=>a+parseInt(b),0);
  sum = sum % 26 || 26;
  return String.fromCharCode(64 + sum);
}

submitBtn6.addEventListener('click', () => {
  const userLetter = input6.value.trim().toUpperCase();
  if (!userLetter) return;

  const correctLetter = dateToLetter(dates6[currentLevel]);

  if (userLetter === correctLetter) {
    const btn = document.getElementById(`alphabet6-${correctLetter}`);
    if (btn) btn.classList.add('collected');

    currentLevel++;
    input6.value = '';

    if (currentLevel === dates6.length) {
      lock6.classList.replace('close', 'open');
      document.getElementById('mini-calculator').style.display = 'none';

      // Показати конверт плавно
      const envelope = document.getElementById('envelope');
      envelope.classList.add('visible');

      // Додаємо клік для відкриття flap
      envelope.addEventListener('click', openEnvelope);
    }
  } else {
    input6.value = '';
  }
});

/// 🌸 4 кнопки-підказки всередині блоку challenge 6
const challenge6 = document.getElementById("date-challenge-6");

const hints6 = [
  { label: "💞 Hint 1", text: "When did you text me for the first time?" },
  { label: "🎁 Hint 2", text: "When was our first meeting?" },
  { label: "💌 Hint 3", text: "When did you tell that you love me?" },
  { label: "🌸 Hint 4", text: "When did you ask to be your gf ?✨" },
  { label: "🌈 Hint 5", text: "My first visit to Germany?" },
  { label: "🩷 Hint 6", text: "Whta's today's date?" }
];

// створюємо компактний блок для підказок
const hintsBox6 = document.createElement("div");
hintsBox6.className = "hints-box-6";

const hintText6 = document.createElement("div");
hintText6.className = "hint-text-6";
hintsBox6.appendChild(hintText6);

const hintBtns6 = document.createElement("div");
hintBtns6.className = "hint-btns-6";
hintsBox6.appendChild(hintBtns6);

hints6.forEach((hint, index) => {
  const btn = document.createElement("button");
  btn.className = "hint6-btn";
  btn.textContent = hint.label;
  btn.addEventListener("click", () => {
    hintText6.textContent = hint.text;
    hintText6.classList.add("show");
    btn.disabled = true;
    btn.classList.add("used");
  });
  hintBtns6.appendChild(btn);
});

challenge6.appendChild(hintsBox6);

// Натискання цифр
document.querySelectorAll('.num-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentValue += btn.textContent;
    updateDisplay();
  });
});

// Натискання операцій
document.querySelectorAll('.op-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if(currentValue === "") return;
    currentValue += btn.textContent;
    updateDisplay();
  });
});

// Натискання =
document.querySelector('.equals-btn').addEventListener('click', () => {
  try {
    currentValue = eval(currentValue).toString();
    updateDisplay();
  } catch {
    currentValue = "";
    updateDisplay();
  }
});

// Натискання C
document.querySelector('.clear-btn').addEventListener('click', () => {
  currentValue = "";
  updateDisplay();
});


// ------------------- RESET PROGRESS -------------------
const resetBtn = document.createElement('button');
resetBtn.textContent = "Reset Progress";
resetBtn.style.position = "fixed";
resetBtn.style.top = "20px";
resetBtn.style.right = "20px";
resetBtn.style.padding = "8px 12px";
resetBtn.style.backgroundColor = "#ff4d4d";
resetBtn.style.color = "#fff";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "5px";
resetBtn.style.cursor = "pointer";
resetBtn.style.zIndex = "1000";
resetBtn.style.fontSize = "14px";

document.body.appendChild(resetBtn);

resetBtn.addEventListener('click', () => {
  if(confirm("⚠️ Are you sure you want to reset all progress?")) {
    // Очищаємо всі ключі прогресу
    localStorage.removeItem("memoryChallenge");
    localStorage.removeItem("musicChallenge");
    localStorage.removeItem("aiChallenge");
    localStorage.removeItem("flowerChallenge");
    // Можеш додати інші ключі, якщо є
    location.reload(); // Перезавантажуємо сторінку
  }
});




const envelope = document.getElementById('envelope');

envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
});