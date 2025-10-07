// ---------------- LOCK LONG PRESS ----------------
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
  
  ['lock-memory', 'lock-music', 'lock-ai', 'lock-flower', 'lock-alphabet'].forEach(addLockLongPress);
  
  // ---------------- MEMORY CHALLENGE ----------------
  const memoryInput = document.getElementById('memory-input');
  const memorySubmit = document.getElementById('memory-submit');
  const lockMemory = document.getElementById('lock-memory');
  const musicChallenge = document.getElementById('music-challenge');
  
  memorySubmit.addEventListener('click', () => {
    const val = memoryInput.value.trim();
    const parts = val.split(',');
    if (parts.length === 2 && parts[0].trim().startsWith("50.86") && parts[1].trim().startsWith("4.358")) {
      lockMemory.classList.replace('close','open');
      musicChallenge.style.display = 'block';
    } else alert("Incorrect coordinates. Try again!");
  });
  
  // ---------------- MUSIC CHALLENGE ----------------
  const musicInput = document.getElementById('music-input');
  const musicSubmit = document.getElementById('music-submit');
  const lockMusic = document.getElementById('lock-music');
  const aiChallenge = document.getElementById('ai-challenge');
  
  musicSubmit.addEventListener('click', () => {
    if(musicInput.value.trim() === "12345") {
      lockMusic.classList.replace('close','open');
      aiChallenge.style.display = 'block';
    }
  });
  
  // ---------------- AI CHALLENGE ----------------
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const passwordContainer = document.getElementById('password-container');
  const passwordInput = document.getElementById('password-input');
  const passwordSubmit = document.getElementById('password-submit');
  const lockAI = document.getElementById('lock-ai');
  
  const questions = ["Question 1: What is the exact time when you sent her a first message?"];
  const answers = [["20:24","20.24"]];
  const secretPassword = "LoveYouBilshe4";
  let currentQuestion = 0;
  
  function normalize(str) { return str.trim().toLowerCase(); }
  
  function askQuestion() {
    if(currentQuestion < questions.length){
      chatLog.innerHTML += `<p class="bot">${questions[currentQuestion]}</p>`;
      chatLog.scrollTop = chatLog.scrollHeight;
    } else {
      chatInput.style.display = 'none';
      chatForm.querySelector('button').style.display = 'none';
      chatLog.innerHTML += `<p class="final-bot">💌 Secret password: <strong>${secretPassword}</strong></p>`;
      passwordContainer.style.display = 'block';
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  }
  
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const userAnswer = normalize(chatInput.value);
    if(!userAnswer) return;
  
    chatLog.innerHTML += `<p class="user">${chatInput.value}</p>`;
    
    if(answers[currentQuestion].map(normalize).includes(userAnswer)){
      chatLog.innerHTML += `<p class="bot">Correct! ✅</p>`;
      currentQuestion++;
    } else {
      chatLog.innerHTML += `<p class="bot">Incorrect. ❌ Try again!</p>`;
    }
  
    chatInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
    askQuestion();
  });
  
  passwordSubmit.addEventListener('click', () => {
    if(passwordInput.value.trim() === secretPassword){
      lockAI.classList.replace('close','open');
      alert("✅ Correct! You've unlocked the Flower Challenge!");
      const flowerChallenge = document.getElementById('flower-challenge');
      flowerChallenge.style.display = 'block';
      flowerChallenge.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("❌ Incorrect password. Try again!");
      passwordInput.value='';
    }
  });
  
  askQuestion();
  
  // ---------------- FLOWER CHALLENGE ----------------
  const flowers = document.querySelectorAll('#flower-challenge .flower');
  const flowerPasswordDiv = document.getElementById('flower-password'); 
  const flowerMessageDiv = document.getElementById('flower-message');
  const flowerPasswordInputContainer = document.getElementById('flower-password-container');
  const lockFlower = document.getElementById('lock-flower');
  const flowerSecretPassword = "LOVEYOU";
  
  flowerPasswordDiv.style.display = "block"; 
  flowerPasswordInputContainer.style.display = "block"; 
  
  flowers.forEach(flower => {
    flower.addEventListener('click', () => {
      if(flower.dataset.correct === "true"){
        flower.classList.add('correct');
        flowerMessageDiv.textContent = "🎉 This is the secret flower! Now enter the password to continue.";
      } else {
        flower.classList.add('incorrect');
        flowerMessageDiv.textContent = "Oops! Try another one 😏";
        setTimeout(() => flower.classList.remove('incorrect'), 300);
      }
    });
  });
  
  document.getElementById('flower-password-submit').addEventListener('click', () => {
    const input = document.getElementById('flower-password-input');
    if(input.value.trim().toUpperCase() === flowerSecretPassword){
      flowerPasswordInputContainer.style.display = 'none';
      lockFlower.classList.replace('close','open');
      alert("✅ Correct! You've unlocked the Alphabet Challenge!");
      const alphabetChallenge = document.getElementById('alphabet-challenge');
      alphabetChallenge.style.display = 'block';
      alphabetChallenge.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("❌ Incorrect password. Try again!");
      input.value = '';
    }
  });

  const alphabetContainer = document.getElementById("alphabet-container");
const wordInput = document.getElementById("word-input"); // input для слова
const secretWord = "LOVE";
let currentIndex = 0;

const emojiAlphabet = {
  A:"💖", B:"🌸", C:"🌙", D:"🎀", E:"💌", F:"✨",
  G:"🕊️", H:"🌈", I:"🔥", J:"🎶", K:"💎", L:"🌹",
  M:"🌊", N:"🍓", O:"🌞", P:"🌟", Q:"🪐", R:"🩷",
  S:"🌺", T:"🌻", U:"🌼", V:"🌟", W:"🌹", X:"🌸", Y:"🌻", Z:"🌺"
};

// Створюємо кнопки-емоджі
Object.entries(emojiAlphabet).forEach(([letter, symbol]) => {
  const btn = document.createElement("button");
  btn.className = "symbol-btn";
  btn.textContent = symbol;
  btn.dataset.letter = letter;
  alphabetContainer.appendChild(btn);
});

// Hover: підсвічуємо правильну букву
alphabetContainer.addEventListener("mouseover", e => {
  if (!e.target.classList.contains("symbol-btn")) return;
  if (e.target.dataset.letter === secretWord[currentIndex]) {
    e.target.classList.add("highlight");
  }
});

alphabetContainer.addEventListener("mouseout", e => {
  if (!e.target.classList.contains("symbol-btn")) return;
  e.target.classList.remove("highlight");
});

// Клік по кнопці
alphabetContainer.addEventListener("click", e => {
  if (!e.target.classList.contains("symbol-btn")) return;
  const letter = e.target.dataset.letter;

  if (letter === secretWord[currentIndex]) {
    // Додаємо букву в input
    wordInput.value += letter;

    // Підсвічуємо кнопку як введену
    e.target.classList.add("collected");

    currentIndex++;

    // Якщо слово повністю введене
    if (wordInput.value.length === secretWord.length) {
      document.getElementById("next-task").style.display = "block";
      document.getElementById("lock-alphabet").classList.replace("close","open");
      document.getElementById("date-challenge-6").style.display = "block";
       document.getElementById("mini-calculator").style.display = "block"
      document.getElementById("date-challenge-6").scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Неправильна буква тремтить
    e.target.classList.add("incorrect");
    setTimeout(() => e.target.classList.remove("incorrect"), 300);
  }
});



  // ---------------- DATE CHALLENGE 6 ----------------
  document.getElementById("date-challenge-6").style.display = "none";
document.getElementById("mini-calculator").style.display = "none";
  const alphabetContainer6 = document.getElementById("alphabet-container-6");
  const input6 = document.getElementById("letter-input-6");
  const submitBtn6 = document.getElementById("submit-letter-6");
  const lock6 = document.getElementById("lock-6");
  
  const dates6 = ["14/02/2025","21/03/2025","09/04/2025","06/04/2025"];
  let currentLevel = 0;
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.classList.add('letter-btn');
    btn.id = `alphabet6-${letter}`;
    btn.textContent = letter;
    alphabetContainer6.appendChild(btn);
  });
  
  function dateToLetter(date) {
    let sum = date.replace(/\D/g,'').split('').reduce((a,b)=>a+parseInt(b),0);
    sum = sum % 26 || 26;
    return String.fromCharCode(64 + sum);
  }
  
  submitBtn6.addEventListener('click', () => {
    const userLetter = input6.value.trim().toUpperCase();
    if(!userLetter) return;
  
    const correctLetter = dateToLetter(dates6[currentLevel]);
  
    if(userLetter === correctLetter){
      const btn = document.getElementById(`alphabet6-${correctLetter}`);
      if(btn) btn.classList.add('collected');
  
      currentLevel++;
      input6.value = '';
  
      if(currentLevel === dates6.length){
        lock6.classList.replace('close','open'); // відкриваємо замок
        alert("🎉 Task 6 completed!");
      }
    } else input6.value = '';
  });
  
  
  const calcInput = document.getElementById('mini-calc-input');
let currentValue = "";

function updateDisplay() {
  calcInput.value = currentValue || "0";
}

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