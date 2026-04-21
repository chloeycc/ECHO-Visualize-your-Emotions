let state = "home";

let emotions = [];

let happyDots = [];
let sadDots = [];
let jealousDots = [];
let angryDots = [];
let anxiousDots = [];

let AnimalOne; // happy sad angry
let AnimalTwo; // angry jealous anxious

let generateButton;

let showAnimal = false;


let revealAlpha = 0;
let revealScale = 0.2;

let input;
let button;
let intensitySlider;

let blobs = [];

function preload() {
  AnimalOne = loadImage("Happy_Sad_Angry_Animal.png");
  AnimalTwo = loadImage("Angry_Green_Anxious_Animal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  textFont("Georgia");

  input = createInput();
  input.position(20, 20);

  button = createButton("Add Emotion");
  button.position(20, 50);
  button.mousePressed(addEmotion);

  generateButton = createButton("GENERATE");
  generateButton.position(width - 175, height - 70);
  generateButton.mousePressed(() => {
    showAnimal = true;
    revealAlpha = 0;
    revealScale = 0.2;
  });

  styleButton(generateButton);
  
  intensitySlider = createSlider(1, 5, 3);
  intensitySlider.position(20, 80);

  input.hide();
  button.hide();
  intensitySlider.hide();
  
  resetButton = createButton("RESET");
resetButton.position(width - 140, height - 120);
resetButton.mousePressed(resetApp);
resetButton.hide();
  
  styleButton(resetButton);


  for (let i = 0; i < 12; i++) {
    blobs.push({
      x: random(width),
      y: random(height),
      size: random(150, 300),
      dx: random(-0.3, 0.3),
      dy: random(-0.3, 0.3),
      color: color(random(255), random(255), random(255), 60),
    });
  }
}

function draw() {
  if (state === "home") {
    drawHome();
  } else {
    drawApp();
  }
}

function drawHome() {
  background(20, 20, 40);

  generateButton.hide();

  for (let b of blobs) {
    fill(b.color);
    circle(b.x, b.y, b.size);

    b.x += b.dx;
    b.y += b.dy;

    if (b.x < 0 || b.x > width) b.dx *= -1;
    if (b.y < 0 || b.y > height) b.dy *= -1;
  }

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text("ECHO: Visualize your Emotions", width / 2, height / 3);

  textSize(18);
  text("Type emotions like:", width / 2, height / 2 - 40);

  textSize(22);
  fill(255, 200, 0);
  text("happy", width / 2 - 200, height / 2);

  fill(100, 150, 255);
  text("sad", width / 2 - 100, height / 2);

  fill(255, 80, 80);
  text("angry", width / 2, height / 2);

  fill(120, 255, 120);
  text("jealous", width / 2 + 100, height / 2);

  fill(255, 150, 50);
  text("anxious", width / 2 + 220, height / 2);

  drawStartButton();

  fill(255);
  textSize(14);
  text(
    "Generate a character with emotion combinations Happy, Sad, & Angry OR Jealous, Angry, & Anxious",
    width / 2,
    height / 2 + 200
  );
}

function drawStartButton() {
  let btnX = width / 2;
  let btnY = height / 2 + 100;
  let btnW = 220;
  let btnH = 70;

  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2
  ) {
    fill(150, 230, 255);
  } else {
    fill(100, 200, 255);
  }

  rectMode(CENTER);
  rect(btnX, btnY, btnW, btnH, 20);

  fill(0);
  textSize(22);
  text("START", btnX, btnY + 7);
}

function mousePressed() {
  if (state === "home") {
    let btnX = width / 2;
    let btnY = height / 2 + 100;
    let btnW = 220;
    let btnH = 70;

    if (
      mouseX > btnX - btnW / 2 &&
      mouseX < btnX + btnW / 2 &&
      mouseY > btnY - btnH / 2 &&
      mouseY < btnY + btnH / 2
    ) {
      state = "app";

      input.show();
      button.show();
      intensitySlider.show();
      generateButton.show();
    }
  }
}

function drawApp() {
  background(20, 20, 40);
  
  if (showAnimal) {
  resetButton.show();
} else {
  resetButton.hide();
}


  if (showAnimal) {
    revealAlpha += 4;
    revealScale += 0.02;

    revealAlpha = constrain(revealAlpha, 0, 255);
    revealScale = constrain(revealScale, 0.2, 0.5);
  }

  // COMBO 1: happy + sad + angry
  if (showAnimal && emotions.some(e => e.type === "happy") &&
    emotions.some(e => e.type === "sad") &&
    emotions.some(e => e.type === "angry")){

    let imgW = AnimalOne.width * revealScale;
let imgH = AnimalOne.height * revealScale;


    tint(255, revealAlpha);

    image(AnimalOne, width / 2 - imgW / 2, height / 2 - imgH / 2, imgW, imgH);

    input.hide();
button.hide();
intensitySlider.hide();
generateButton.hide();
    return;
  }

  // COMBO 2: angry + jealous + anxious
  if (showAnimal && emotions.some(e => e.type === "jealous") &&
    emotions.some(e => e.type === "anxious") &&
    emotions.some(e => e.type === "angry"))
 {
    let imgW = AnimalTwo.width * revealScale;
let imgH = AnimalTwo.height * revealScale;

    tint(255, revealAlpha);

    image(AnimalTwo, width / 2 - imgW / 2, height / 2 - imgH / 2, imgW, imgH);

    input.hide();
button.hide();
intensitySlider.hide();
generateButton.hide();
    return;
 
  }

  fill(255);
  textSize(14);
  textFont("Georgia");
  text(
    "Rate Emotion (1–5): " + intensitySlider.value(),
    intensitySlider.x + 70,
    intensitySlider.y + 40
  );

  // EMOTIONS
  if (!showAnimal) {
for (let e of emotions) {
  let intensity = e.intensity;
  let speedAmount = 0.5 + intensity * 0.5;
  let sizeAmount = 0.5 + intensity * 0.3;

  // HAPPY
  if (e.type === "happy") {
    for (let dot of happyDots) {
      let twinkle = sin(frameCount * dot.twinkleSpeed + dot.twinkleOffset);
      let size = dot.size * sizeAmount + twinkle * 2;

      for (let i = 0; i < 3; i++) {
        let angle = random(TWO_PI);
        let radius = random(size * 0.5, size * 1.5);

        let sx = dot.x + cos(angle) * radius;
        let sy = dot.y + sin(angle) * radius;

        fill(255, 255, 200, 120);
        circle(sx, sy, random(2, 5));
      }
    }
  }

  // SAD
  if (e.type === "sad") {
    for (let sad of sadDots) {
      fill(sad.color);
      circle(sad.x, sad.y, sad.size * sizeAmount);

      sad.x += sad.xSpeed * speedAmount * 0.5;
      sad.y += sad.ySpeed * speedAmount * 0.5;

      if (sad.x < 0 || sad.x > width) sad.xSpeed *= -1;
      if (sad.y < 0 || sad.y > height) sad.ySpeed *= -1;

      sad.size += sad.sizeInc;
      if (sad.size >= 100 || sad.size <= 20) {
        sad.sizeInc *= -1;
      }
    }
  }

  // ANGRY
  if (e.type === "angry") {
    for (let angry of angryDots) {
      fill(angry.color);
      circle(angry.x, angry.y, angry.size * sizeAmount * 1.3);

      fill(angry.color);
      circle(angry.x, angry.y, angry.size * sizeAmount);

      angry.x += angry.xSpeed * speedAmount * 1.5;
      angry.y += angry.ySpeed * speedAmount * 1.5;

      if (angry.x < 0 || angry.x > width) angry.xSpeed *= -1;
      if (angry.y < 0 || angry.y > height) angry.ySpeed *= -1;

      angry.size += angry.sizeInc * (intensity / 3);

      if (angry.size >= 150 || angry.size <= 50) {
        angry.sizeInc *= -1;
      }
    }
  }

  // JEALOUS
  if (e.type === "jealous") {
    for (let jealous of jealousDots) {
      fill(jealous.color);
      let s = jealous.size * sizeAmount;

      quad(
        jealous.x,
        jealous.y - s / 2,
        jealous.x + s / 2,
        jealous.y,
        jealous.x,
        jealous.y + s / 2,
        jealous.x - s / 2,
        jealous.y
      );

      let inner = s * 0.5;

      fill(120, 220, 100, 150);
      quad(
        jealous.x,
        jealous.y - inner / 2,
        jealous.x + inner / 2,
        jealous.y,
        jealous.x,
        jealous.y + inner / 2,
        jealous.x - inner / 2,
        jealous.y
      );

      jealous.x += jealous.xSpeed * speedAmount;
      jealous.y += jealous.ySpeed * speedAmount;

      if (jealous.x < 0 || jealous.x > width) jealous.xSpeed *= -1;
      if (jealous.y < 0 || jealous.y > height) jealous.ySpeed *= -1;
    }
  }

  // ANXIOUS
  if (e.type === "anxious") {
    for (let anxious of anxiousDots) {
      fill(anxious.color);
      circle(anxious.x, anxious.y, anxious.size * sizeAmount);

      anxious.x += anxious.xSpeed * speedAmount;
      anxious.y += anxious.ySpeed * speedAmount;

      anxious.x += random(-intensity, intensity);
      anxious.y += random(-intensity, intensity);

      if (anxious.x < 0 || anxious.x > width) anxious.xSpeed *= -1;
      if (anxious.y < 0 || anxious.y > height) anxious.ySpeed *= -1;
    }
  }
}
}
}
function keyPressed() {
  if (keyCode == ENTER) addEmotion();
}

function addEmotion() {
  let e = input.value().toLowerCase().trim();
  let intensity = intensitySlider.value();

  if (emotions.length >= 3) emotions.shift();
  emotions.push({ type: e, intensity: intensity });

  if (e === "happy") {
    happyDots = [];
    for (let i = 0; i < (13 * intensity) / 3; i++) {
      happyDots.push({
        x: random(width),
        y: random(height),
        size: random(10, 25),
        xSpeed: random(-0.3, 0.3),
        ySpeed: random(-0.3, 0.3),
        color: randomYellow(),
        twinkleSpeed: random(0.02, 0.05),
        twinkleOffset: random(1000),
      });
    }
  }

  if (e === "sad") {
    sadDots = [];
    for (let i = 0; i < (10 * intensity) / 3; i++) {
      sadDots.push({
        x: random(width),
        y: random(height),
        size: random(15, 100),
        sizeInc: 0.25,
        xSpeed: random(-0.5, 0.5),
        ySpeed: random(-0.5, 0.5),
        color: randomSad(),
      });
    }
  }

  if (e === "angry") {
    angryDots = [];
    for (let i = 0; i < (5 * intensity) / 3; i++) {
      angryDots.push({
        x: random(width),
        y: random(height),
        size: random(50, 150),
        sizeInc: 0.7,
        xSpeed: random(-0.5, 0.5),
        ySpeed: random(-0.5, 0.5),
        color: randomAngry(),
      });
    }
  }

  if (e === "jealous") {
    jealousDots = [];
    for (let i = 0; i < (5 * intensity) / 3; i++) {
      jealousDots.push({
        x: random(width),
        y: random(height),
        size: random(25, 75),
        sizeInc: 0.7,
        xSpeed: random(-0.5, 0.5),
        ySpeed: random(-0.5, 0.5),
        color: randomJealous(),
      });
    }
  }

  if (e === "anxious") {
    anxiousDots = [];
    for (let i = 0; i < (10 * intensity) / 3; i++) {
      anxiousDots.push({
        x: random(width),
        y: random(height),
        size: random(10, 15),
        sizeInc: 1.0,
        xSpeed: random(-0.5, 0.5),
        ySpeed: random(-0.5, 0.5),
        color: randomAnxious(),
      });
    }
  }

  input.value("");
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateButton.position(width - 140, height - 60);
}

function resetApp() {
  emotions = [];
  happyDots = [];
  sadDots = [];
  jealousDots = [];
  angryDots = [];
  anxiousDots = [];

  showAnimal = false;
  revealAlpha = 0;
  revealScale = 0.2;

  state = "home";

  input.hide();
  button.hide();
  intensitySlider.hide();
  generateButton.hide();
  resetButton.hide();
}


// COLORS
function randomYellow() {
  return color(255, random(200, 255), 0, 120);
}
function randomSad() {
  return color(random(0, 50), random(0, 70), random(180, 255), 100);
}
function randomAngry() {
  return color(random(180, 255), random(0, 60), random(0, 40), 50);
}
function randomJealous() {
  return color(random(80, 150), random(150, 220), random(0, 60), 100);
}
function randomAnxious() {
  return color(random(230, 255), random(100, 150), random(0, 20), 120);
}

function styleButton(btn) {
  btn.style("background-color", "#8ecae6");
  btn.style("border", "none");
  btn.style("border-radius", "20px");
  btn.style("padding", "12px 24px");
  btn.style("font-size", "18px");
  btn.style("font-family", "Georgia");
  btn.style("color", "black");
}


