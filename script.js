let hp = 20;
let maxHp = 20;
let money = 0;
let level = 1;
let clickPower = 1;
let clickCount = 0;           // track how many times button has been pressed

const myButton = document.getElementById("dabutton");

// 2. SET UP SOUND (The Audio Object)
// Using the new reliable link we found
let boingSound = new Audio("pop.mp3");

// 3. THE "BRAIN" (Main Function)
function showSurprise() {
    let damageDealt = clickPower;
    if (Math.random() < 0.2) {
        // 20% chance for a critical hit
        damageDealt *= 2;
        myButton.innerHTML = "CRITICAL HIT!";
        myButton.style.backgroundColor = "#ffff00";
    } else {
        myButton.innerHTML = "Click me!";
        myButton.style.backgroundColor = "#5e8cff";
    }
    hp -= damageDealt;
    if (hp <= 0) {
        let reward = level * 10; // Reward scales with level
        money += reward;
        level += 1;
        maxHp = Math.floor(maxHp * 1.2); // Increase max HP for next level
        hp = maxHp; // restore HP for new boss
        alert("You defeated the boss! You earned $" + reward + " and advanced to level " + level + "!");
    }

    document.getElementById("money").innerText = money;
    document.getElementById("hp").innerText = hp;
    document.getElementById("level").innerText = level;
    myButton.style.transform = "scale(0.9)"; // Reset any transforms
    setTimeout(() => {
        myButton.style.transform = "scale(1)";
    }, 50);
    boingSound.play().then(() => {
        boingSound.pause();
        boingSound.currentTime = 0;
    }).catch(e => console.log("Waiting for user interaction..."));

    clickCount += 1;

    // Handle the stages of anger
    if (clickCount === 1) {
        alert("Stop clicking me!");
        myButton.style.backgroundColor = "#ffd45a";
        myButton.style.transform = "scale(1.2)";
        myButton.innerHTML = "Don't click me again!";

    } else if (clickCount === 2) {
        alert("I said stop clicking me!");
        myButton.style.backgroundColor = "#FFA95A";
        myButton.style.transform = "scale(1.5)";
        myButton.innerHTML = "If you dare click again, I'll be mad!";

    } else if (clickCount === 3) {
        document.body.classList.add("shake");
        myButton.onmouseover = teleport; // START THE TROLLING
        alert("I warned you! I'm taking your stuffies! TRY AND CATCH ME!");
        myButton.style.backgroundColor = "#FF8B5A";
        myButton.innerHTML = "CAN'T CATCH ME!";
        myButton.style.transform = "scale(1.8)";

    } else if (clickCount === 4) {
        document.body.style.backgroundColor = "#3a0d0d";
        alert("WAAAAHHHHH! YOU HAVE NO SELF CONTROL!");
        myButton.style.backgroundColor = "#FF5A5A";
        myButton.innerHTML = "I HATE YOU!";
        myButton.style.transform = "scale(2)";

    } else if (clickCount === 5) {
        alert("GRRR... I'm LEAVING!");
        myButton.style.display = "none";
        createResetBtn();
    }
}

// 4. THE TELEPORT TROLL
function teleport() {
    console.log("Teleporting... and playing sound");
    
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);

    myButton.style.position = "absolute";
    myButton.style.left = x + "px";
    myButton.style.top = y + "px";

    // Play the boing!
    boingSound.currentTime = 0;
    boingSound.play().catch(err => console.log("Sound blocked by browser"));
}

// 5. THE RESET BUTTON (Spawns at the end)
function createResetBtn() {
    let resetBtn = document.createElement("button");
    resetBtn.innerHTML = "Come back so I can troll you again!!!";
    
    // Styling
    resetBtn.style.padding = "20px";
    resetBtn.style.backgroundColor = "#de83ff";
    resetBtn.style.color = "#ac31c5";
    resetBtn.style.borderRadius = "12px";
    resetBtn.style.cursor = "pointer";
    resetBtn.style.marginTop = "20px";

   resetBtn.onclick = function() {
    // 1. RESET THE ANGER (The Story)
    clickCount = 0; 
    
    // 2. BRING THE BUTTON BACK
    myButton.style.display = "inline-block";
    myButton.style.position = "static";
    myButton.style.backgroundColor = "#5e8cff";
    myButton.innerHTML = "Click me!";
    myButton.onmouseover = null; // Stop it from teleporting immediately
    
    // 3. FIX THE ENVIRONMENT
    document.body.style.backgroundColor = "#d3ffcd";
    document.body.classList.remove("shake");

    // 4. DO NOT RESET money, level, or clickPower!
    // We leave those variables alone so you keep your progress.

    resetBtn.remove();
};

    document.body.appendChild(resetBtn);
}

// 6. INITIALIZE
if (myButton) {
    myButton.onclick = showSurprise;
}