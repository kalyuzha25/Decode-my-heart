// ---------------- LOCK LONG PRESS ----------------
function addLockLongPress(lockId) {
    let mouseIsDown = false;
    const lock = document.getElementById(lockId);
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
    if(parts.length===2 && parts[0].trim().startsWith("50.86") && parts[1].trim().startsWith("4.358")) {
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
    if(musicInput.value.trim()==="12345") {
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

function normalize(str) {
    return str.trim().toLowerCase();
}

function askQuestion() {
    if(currentQuestion < questions.length){
        chatLog.innerHTML += `<p class="bot">${questions[currentQuestion]}</p>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    } else {
        // Всі питання відповіли: ховаємо імпут і кнопку відправки
        chatInput.style.display = 'none';
        chatForm.querySelector('button').style.display = 'none';
        
        // Виводимо фінальний пароль і показуємо блок для введення
        chatLog.innerHTML += `<p class="final-bot">💌 Secret password: <strong>${secretPassword}</strong></p>`;
        chatLog.scrollTop = chatLog.scrollHeight;
        passwordContainer.style.display = 'block';
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
        document.getElementById('flower-challenge').style.display = 'block';
        document.getElementById('flower-challenge').scrollIntoView({ behavior: "smooth" });
    } else {
        alert("❌ Incorrect password. Try again!");
        passwordInput.value='';
    }
});

askQuestion();

// ---------------- FLOWER CHALLENGE JS ----------------
const flowers = document.querySelectorAll('#flower-challenge .flower');
const flowerPasswordDiv = document.getElementById('flower-password'); 
const flowerMessageDiv = document.getElementById('flower-message');
const flowerPasswordInputContainer = document.getElementById('flower-password-container');
const lockFlower = document.getElementById('lock-flower');
const flowerSecretPassword = "LOVEYOU";

// Робимо поле для пароля завжди видимим
flowerPasswordDiv.style.display = "block"; 
flowerPasswordInputContainer.style.display = "block"; 

// Обробник кліку на квіти
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

// Обробник введення пароля
document.getElementById('flower-password-submit').addEventListener('click', () => {
    const input = document.getElementById('flower-password-input');
    if(input.value.trim().toUpperCase() === flowerSecretPassword){
        flowerPasswordInputContainer.style.display = 'none';

        // Відкриваємо замок тільки після правильного пароля
        lockFlower.classList.replace('close','open');

        alert("✅ Correct! You've unlocked the Alphabet Challenge!");
        document.getElementById('alphabet-challenge').style.display = 'block';
        document.getElementById('alphabet-challenge').scrollIntoView({ behavior: "smooth" });
    } else {
        alert("❌ Incorrect password. Try again!");
        input.value = '';
    }
});
// ---------------- ALPHABET CHALLENGE ----------------
const alphabetContainer = document.getElementById("alphabet-container");
const userInputDiv = document.getElementById("user-input");
const nextTask = document.getElementById("next-task");
const nextBtn = document.getElementById("next-btn");
const lockAlphabet = document.getElementById("lock-alphabet");

const secretMessage = "L";
let currentIndex = 0;
let userInput = "";

const alphabet = {
  A:"💖", B:"🌸", C:"🌙", D:"🎀", E:"💌", F:"✨",
  G:"🕊️", H:"🌈", I:"🔥", J:"🎶", K:"💎", L:"🌹",
  M:"🌊", N:"🍓", O:"🌞", P:"🌟", Q:"🪐", R:"🩷",
  S:"🎁", T:"🍒", U:"☁️", V:"🎇", W:"💫", X:"🦋",
  Y:"🌻", Z:"🌺"
};

// Створюємо кнопки
Object.entries(alphabet).forEach(([letter, symbol]) => {
  const btn = document.createElement("button");
  btn.className = "symbol-btn";
  btn.textContent = symbol;
  btn.dataset.letter = letter;
  alphabetContainer.appendChild(btn);
});

// Підсвітка правильної кнопки при hover
alphabetContainer.addEventListener("mouseover", e => {
  if (!e.target.classList.contains("symbol-btn")) return;
  const letter = e.target.dataset.letter;
  if (letter === secretMessage[currentIndex]) {
    e.target.classList.add("highlight");
  } else {
    e.target.classList.remove("highlight");
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

  if (letter === secretMessage[currentIndex]) {
    userInput += letter;
    userInputDiv.textContent = userInput;
    e.target.classList.add("correct");
    currentIndex++;

    if (currentIndex === secretMessage.length) {
      // Відкриваємо замок
      lockAlphabet.classList.replace("close","open");

      // Показати кнопку "Next"
      nextTask.style.display = "block";
    }
  } else {
    e.target.classList.add("incorrect");
    setTimeout(() => e.target.classList.remove("incorrect"), 300);
  }
});

nextBtn.addEventListener("click", () => {
  alert("🎉 Next challenge unlocked!");
});