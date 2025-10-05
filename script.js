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
['lock-memory', 'lock-music', 'lock-ai'].forEach(addLockLongPress);

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
const mapChallenge = document.getElementById('map-challenge');

const questions = ["Question 1: What is the exact time when you sent her a first message?"];
const answers = [["20:24","20.24"]];
const secretPassword = "LoveYouBilshe4";
let currentQuestion = 0;

function normalize(str){return str.trim().toLowerCase();}
function askQuestion(){
    if(currentQuestion<questions.length){
        chatLog.innerHTML += `<p class="bot">${questions[currentQuestion]}</p>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    } else {
        chatInput.style.display='none';
        chatForm.querySelector('button').style.display='none';
        chatLog.innerHTML += `<p class="final-bot">🎉 All questions answered! 💌 Secret password: <strong>${secretPassword}</strong></p>`;
        passwordContainer.style.display='block';
    }
}
chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const userAnswer = normalize(chatInput.value);
    if(!userAnswer) return;
    chatLog.innerHTML += `<p class="user">${chatInput.value}</p>`;
    if(answers[currentQuestion].map(normalize).includes(userAnswer)){
        chatLog.innerHTML += `<p class="bot">Correct! ✅</p>`;
        currentQuestion++;
    } else chatLog.innerHTML += `<p class="bot">Incorrect. ❌ Try again!</p>`;
    chatInput.value='';
    askQuestion();
});
passwordSubmit.addEventListener('click', ()=>{
    if(passwordInput.value.trim()===secretPassword){
        passwordContainer.style.display='none';
        mapChallenge.style.display='block';
        // Відкрити замок Task 3
        const lockAI = document.getElementById('lock-ai');
        lockAI.classList.replace('close','open');
    } else {
        alert("Incorrect password. Try again!");
        passwordInput.value='';
    }
});
askQuestion();

// ---------------- TASK 4 ----------------
(function(){
    const coords = [
        {lat: 50.47211, lon: 4.19566, label: "Location 1"},
        {lat: 50.47199, lon: 4.19369, label: "Location 2"},
        {lat: 50.47185, lon: 4.19424, label: "Location 3"}
    ];
    const passwords=["rotor21","motor7","orbit9"];
    const mapDiv=document.getElementById('map');
    const gotoButtons=document.querySelectorAll('.goto');
    const inputs=document.querySelectorAll('.pw-input');
    const completeBtn=document.getElementById('task4-complete');

    const map=L.map(mapDiv).setView([coords[0].lat, coords[0].lon],15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
    const markers=coords.map(c=>L.marker([c.lat,c.lon]).addTo(map).bindPopup(c.label));

    gotoButtons.forEach((btn,i)=>{
        btn.addEventListener('click',()=>{
            map.flyTo([coords[i].lat,coords[i].lon],17,{duration:1});
            markers[i].openPopup();
        });
    });

    function checkAll(){
        let allCorrect=true;
        inputs.forEach((inp,i)=>{if(inp.value.trim()!==passwords[i]) allCorrect=false;});
        completeBtn.disabled=!allCorrect;
    }
    inputs.forEach(inp=>inp.addEventListener('input',checkAll));
    completeBtn.addEventListener('click', ()=>{
        alert("🎉 Task 4 complete! You have finished all challenges!");
        mapChallenge.style.display='none';
    });
})();