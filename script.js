// ---------------- LOCK LONG PRESS ---
function addLockLongPress(lockId) {
    let mouseIsDown = false;
    const lock = document.getElementById(lockId);
  
    lock.addEventListener('mousedown', () => {
      mouseIsDown = true;
      setTimeout(() => {
        if(mouseIsDown){
          if(lock.classList.contains('open')){
            lock.classList.remove('open');
            lock.classList.add('close');
          } else {
            lock.classList.remove('close');
            lock.classList.add('open');
          }
        }
      }, 1000);
    });
  
    lock.addEventListener('mouseup', () => mouseIsDown = false);
    lock.addEventListener('mouseleave', () => mouseIsDown = false);
  }
  
  // Apply to all locks
  ['lock-memory','lock-music','lock-ai'].forEach(addLockLongPress);
  
  // ---------------- MEMORY ----------------
  // ---------------- MEMORY ----------------
const memoryInput = document.getElementById('memory-input');
const memorySubmit = document.getElementById('memory-submit');
const lockMemory = document.getElementById('lock-memory');
const musicChallenge = document.getElementById('music-challenge');

// правильні перші 4 цифри
const memoryLat = "50.86";
const memoryLng = "4.358";

memorySubmit.addEventListener('click', () => {
  const val = memoryInput.value.trim();
  // розділяємо координати за комою
  const parts = val.split(',');
  if(parts.length === 2){
    const lat = parts[0].trim();
    const lng = parts[1].trim();
    // перевіряємо чи перші 4 цифри збігаються
    if(lat.startsWith(memoryLat) && lng.startsWith(memoryLng)){
      lockMemory.classList.remove('close');
      lockMemory.classList.add('open');
      musicChallenge.style.display = 'block'; // показуємо наступне завдання
      return;
    }
  }
  alert("Incorrect coordinates. Try again!");
});
  
  // ---------------- MUSIC ----------------
  const musicInput = document.getElementById('music-input');
  const musicSubmit = document.getElementById('music-submit');
  const lockMusic = document.getElementById('lock-music');
  const musicAnswer = "12345";
  const aiChallenge = document.getElementById('ai-challenge');
  
  musicSubmit.addEventListener('click', () => {
    if(musicInput.value.trim() === musicAnswer){
      lockMusic.classList.remove('close');
      lockMusic.classList.add('open');
      aiChallenge.style.display = 'block';
    }
  });
  
  // ---------------- AI CHALLENGE ----------------
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const lockAI = document.getElementById('lock-ai');
  const nextTask = document.getElementById('next-task');
  
  const questions = [
    "Question 1: What is the exact time when you sent her a first message?",
  ];
  
  const answers = [
    ["20:24","20.24"],
  ];
  
  const secretPassword = "LoveYouBilshe4";
  let currentQuestion = 0;
  
  function normalize(str){ return str.trim().toLowerCase(); }
  
  // Створюємо блок для відображення пароля
  const secretPasswordContainer = document.createElement('div');
  secretPasswordContainer.id = 'secret-password-container';
  secretPasswordContainer.style.cssText = `
    display: none;
    margin-top: 15px;
    text-align: center;
  `;
  
  const passwordHint = document.createElement('p');
  passwordHint.textContent = "💌 Your secret password:";
  passwordHint.style.fontWeight = 'bold';
  
  const passwordDisplay = document.createElement('p');
  passwordDisplay.textContent = secretPassword;
  passwordDisplay.style.cssText = `
    font-size: 18px;
    color: white;
    background: linear-gradient(90deg, pink, #ff69b4);
    padding: 8px;
    border-radius: 6px;
    display: inline-block;
    margin: 5px 0;
  `;
  
  const passwordInput = document.createElement('input');
  passwordInput.type = 'text';
  passwordInput.placeholder = "Enter the secret password";
  passwordInput.style.padding = "5px 8px";
  passwordInput.style.margin = "5px";
  passwordInput.style.borderRadius = "4px";
  passwordInput.style.border = "1px solid #ccc";
  
  const passwordSubmit = document.createElement('button');
  passwordSubmit.textContent = "Unlock Next Task";
  passwordSubmit.style.cssText = `
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    background: #333;
    color: #fff;
    cursor: pointer;
    margin-left: 5px;
  `;
  
  secretPasswordContainer.appendChild(passwordHint);
  secretPasswordContainer.appendChild(passwordDisplay);
  secretPasswordContainer.appendChild(passwordInput);
  secretPasswordContainer.appendChild(passwordSubmit);
  
  chatForm.parentElement.appendChild(secretPasswordContainer);
  
  // ---------------- FUNCTIONS ----------------
  function askQuestion(){
    if(currentQuestion < questions.length){
      chatLog.innerHTML += `<p><strong>Bot:</strong> ${questions[currentQuestion]}</p>`;
      chatLog.scrollTop = chatLog.scrollHeight;
    } else {
      // після останнього питання ховаємо інпут
      chatInput.style.display = 'none';
      chatForm.querySelector('button').style.display = 'none';
  
      // показуємо пароль
      secretPasswordContainer.style.display = 'block';
  
      chatLog.innerHTML += `<p><strong>Bot:</strong> 🎉 All questions answered! Use the password below to unlock the next task.</p>`;
      chatLog.scrollTop = chatLog.scrollHeight;
  
      lockAI.classList.remove('close');
      lockAI.classList.add('open');
    }
  }
  
  // Обробка введення відповіді
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const userAnswer = normalize(chatInput.value);
    if(!userAnswer) return;
  
    chatLog.innerHTML += `<p><strong>You:</strong> ${chatInput.value}</p>`;
    const correctAnswers = answers[currentQuestion].map(normalize);
    if(correctAnswers.includes(userAnswer)){
      chatLog.innerHTML += `<p><strong>Bot:</strong> Correct! ✅</p>`;
      currentQuestion++;
    } else {
      chatLog.innerHTML += `<p><strong>Bot:</strong> Incorrect. ❌ Try again!</p>`;
    }
    chatInput.value = '';
    askQuestion();
  });
  
  // Обробка пароля
  passwordSubmit.addEventListener('click', () => {
    if(passwordInput.value.trim() === secretPassword){
      alert("Password correct! Next task unlocked! 🎉");
      nextTask.style.display = "block";
      secretPasswordContainer.style.display = 'none';
    } else {
      alert("Incorrect password. Try again!");
      passwordInput.value = '';
    }
  });
  
  // Старт
  askQuestion();