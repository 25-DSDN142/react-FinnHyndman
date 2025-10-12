// Face Parts
let faceBase, leftEye, rightEye, topLip, bottomLip;
let neck, shoulder, body, hips, legs, leftLeg, rightLeg, shoe, hair;
let arm, armRight;
let eyeWhiteLeft, eyeWhiteRight;

// Props / Extra Assets
let donut, laser;

// Global Face Tracking Variables
let faceCenterX, faceCenterY;
let leftEyeCenterX, rightEyeCenterX, rightEyebrowCenterY;

// Interaction Timers and States
let screenshotTimer = null;
let mouthTimer = null;
let mouthOpenTimer = null;
let laserActive = false;
let laserEnabled = false;

// Laser + Donut Behaviour
let laserX = 0;
let laserY = 0;
let donutX = 0;
let donutParticles = [];
let lastDonutTime = 0;


function prepareInteraction() {
  faceBase = loadImage('images/Face.png');
  leftEye = loadImage('images/EyeLeft.png');
  rightEye = loadImage('images/EyeRight.png');
  topLip = loadImage('images/MouthTop.png');
  bottomLip = loadImage('images/MouthBottom.png');

  neck = loadImage('images/neck.png');
  shoulder = loadImage('images/shoulders.png');
  arm = loadImage('images/Armcopy.png');
  armRight = loadImage('images/armRight.png');
  body = loadImage('images/body.png');
  hips = loadImage('images/hip.png');
  legs = loadImage('images/legs.png');
  leftLeg = loadImage('images/leftLeg.png');
  rightLeg = loadImage('images/rightLeg.png');
  shoe = loadImage('images/shoe.png');

  eyeWhiteRight = loadImage('images/eyeWhiteRight.png');
  eyeWhiteLeft = loadImage('images/eyeWhiteLeft.png');
  hair = loadImage('images/hair.png');

  donut = loadImage('images/donut.png');
  laser = loadImage('images/laser.png');

  startTime = millis(); // Set up seconds counter
}

function drawInteraction(faces, hands) {
  noStroke()
  fill(250)
  rect(0, 0, 1290, 960)

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }

    //Start drawing hands here

    //arms function
    if (hand.handedness === "Left") {
      let indexFingerTipY = hand.index_finger_tip.y;
      let angle = map(indexFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI - Map Height of Index Finger to angle of arm.

      push();
      translate(faceCenterX - 45, faceCenterY + 35); // anchor for left arm
      rotate(angle);
      image(arm, 0, 0, 300, 50);
      pop();
    }

    if (hand.handedness === "Right") {
      let indexFingerTipY = hand.index_finger_tip.y;
      let angle = map(indexFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI - Map Height of Index Finger to angle of arm.
      push();
      translate(faceCenterX + 55, faceCenterY + 40); // anchor for right arm
      scale(-1, 1);
      rotate(angle);
      image(armRight, 0, 0, 300, 50);
      pop();
    }

    //legs
    if (hand.handedness === "Right") {
      let pinkyFingerTipY = hand.pinky_finger_tip.y;
      let angle = map(pinkyFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI - Map Height of Index Finger to angle of arm.
      push();
      translate(faceCenterX + 20, faceCenterY + 260); // anchor for right leg
      scale(-1, 1);
      rotate(angle);
      image(leftLeg, 0, 0, 450, 335);
      pop();
    }

    if (hand.handedness === "Left") {
      let pinkyFingerTipY = hand.pinky_finger_tip.y;
      let angle = map(pinkyFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI - Map Height of Index Finger to angle of arm.
      push();
      translate(faceCenterX - 20, faceCenterY + 260); // anchor for left leg
      rotate(angle);
      image(leftLeg, 0, 0, 450, 335);
      pop();
    }

    //Stop drawing hands  
  }

  //------------------------------------------------------------
  //facePart

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    //define variables
    faceCenterX = face.faceOval.centerX;
    faceCenterY = face.faceOval.centerY;
    leftEyeCenterX = face.leftEye.centerX;
    rightEyeCenterX = face.rightEye.centerX;
    rightEyebrowCenterY = face.rightEyebrow.centerY;

    /*
    Start drawing on the face here
    */

    //draw body parts
    image(neck, faceCenterX - 30, faceCenterY, 300, 223);
    image(shoulder, faceCenterX - 56, faceCenterY, 300, 223);
    image(hair, faceCenterX - 70, faceCenterY - 160, 330, 253);
    image(faceBase, faceCenterX - 70, faceCenterY - 150, 330, 253);
    image(hips, faceCenterX - 100, faceCenterY + 210, 450, 335);
    image(body, faceCenterX - 90, faceCenterY, 330, 253);


    //---Eyes!---
    let eyeRangeX = 90; // max horizontal movement from center
    let eyeOffsetY = -50; // vertical offset relative to face center

    // Left Eye
    let leftEyeRelX = leftEyeCenterX - faceCenterX;
    let leftEyeMappedX = constrain(faceCenterX + leftEyeRelX, faceCenterX - eyeRangeX, faceCenterX + eyeRangeX);
    let leftEyeMappedY = faceCenterY + eyeOffsetY;
    image(eyeWhiteLeft, leftEyeMappedX - 33, leftEyeMappedY - 20, 300, 223);

    // Pupil
    leftEyeH = face.keypoints[374].y - face.keypoints[386].y;
    leftPupilH = map(leftEyeH, 15, 20, 10, 30);
    leftPupilH = constrain(leftPupilH, 0, 30);
    fill(0);
    ellipse(leftEyeMappedX, leftEyeMappedY, 30, leftPupilH);

    // Right Eye
    let rightEyeRelX = rightEyeCenterX - faceCenterX;
    let rightEyeMappedX = constrain(faceCenterX + rightEyeRelX, faceCenterX - eyeRangeX, faceCenterX + eyeRangeX);
    let rightEyeMappedY = faceCenterY + eyeOffsetY;
    image(eyeWhiteRight, rightEyeMappedX, rightEyeMappedY - 19, 300, 223);

    // Pupil
    rightEyeH = face.keypoints[374].y - face.keypoints[386].y;
    rightPupilH = map(rightEyeH, 15, 20, 10, 30);
    rightPupilH = constrain(rightPupilH, 0, 30);
    fill(0);
    ellipse(rightEyeMappedX + 25, rightEyeMappedY + 5, 30, rightPupilH);


    //---Mouth---
    let mouthRangeX = 50; // max horizontal movement
    let mouthRangeY = 20; // max vertical movement
    let mouthBaseY = faceCenterY + 80; // base Y for mouth

    // Top Lip
    let topLipX = constrain(face.keypoints[0].x, faceCenterX - mouthRangeX, faceCenterX + mouthRangeX);
    let topLipY = constrain(face.keypoints[0].y, mouthBaseY - mouthRangeY, mouthBaseY + mouthRangeY);
    image(topLip, topLipX - 20, topLipY - 70, 300, 223);

    // Bottom Lip
    let bottomLipX = constrain(face.keypoints[14].x, faceCenterX - mouthRangeX, faceCenterX + mouthRangeX);
    let bottomLipY = constrain(face.keypoints[14].y, mouthBaseY - mouthRangeY, mouthBaseY + mouthRangeY);
    image(bottomLip, bottomLipX - 20, bottomLipY - 70, 300, 223);

    let mouthCentreX = topLipX - bottomLipX;
    let mouthCentreY = bottomLipY - topLipY;

    mouthCentreX = constrain(mouthCentreX, -mouthRangeX, mouthRangeX); // limit mouth movement
    mouthCentreY = constrain(mouthCentreY, 0, mouthRangeY); // limit mouth opening


    //donut function
    if (mouthCentreY > 19) {
      if (mouthOpenTimer === null) {
        mouthOpenTimer = millis();
      }
    } else {
      mouthOpenTimer = null; // reset timer if mouth closes
    }


    //AI Assisted Code (F.H is for my own comments to show understanding of code)
    //spawn donuts after 2 seconds of mouth open F.H
    if (mouthOpenTimer !== null && millis() - mouthOpenTimer >= 2000) {
      // only spawn new donut after 0.1s have passed since the last one F.H
      if (millis() - lastDonutTime > 100) {
        // create a new donut particle object F.H
        let newDonut = {
          x: face.keypoints[0].x - 20, // start X position F.H
          y: face.keypoints[0].y - mouthCentreY - 20, // start Y position F.H
          vx: random(-1, 1), // horizontal speed F.H
          vy: random(-5, -2), // vertical speed F.H
          alpha: 255 // opacity F.H
        };

        donutParticles.push(newDonut); // add this donut to the array of active particles F.H
        lastDonutTime = millis(); // reset the last spawn time F.H
      }
    }

    // UPDATE AND DRAW DONUTS EACH FRAME
    for (let i = 0; i < donutParticles.length; i++) {
      let p = donutParticles[i];
      p.x += p.vx; // horizontal movement F.H
      p.y += p.vy; // vertical movement F.H
      p.vy += 0.2; // applying gravity  F.H
      //p.alpha -= 5;               // reduce opacity each frame to fade out over time F.H

      tint(255, p.alpha); // apply transparency F.H
      image(donut, p.x, p.y, 330, 253);
      noTint(); // reset tint F.H
    }

    // REMOVE DONUTS THAT HAVE FADED
    donutParticles = donutParticles.filter(p => p.alpha > 0);
    // keep only particles that have not fully faded F.H

    //AI Assisted Code end

    //Stop drawing on the face here
  }
  // Addtional elements here. Keep face drawing inside the for loop. 
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
  if (key === 'f') {
    frameRate(8)
  }
  if (key === 'd') {
    frameRate(60)
  }

}