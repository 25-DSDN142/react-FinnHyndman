let leftEye;
let rightEye;
let face1;
let topLip;
let bottomLip;
let body;
let neck;
let shoulder;
let legs;
let shoe;
let arm;
let faceCenterX;
let faceCenterY;
let leftEyeCenterX;
let rightEyeCenterX;
let screenshotTaken = false;

function prepareInteraction() {
  face1 = loadImage('images/Face.png');
  leftEye = loadImage('images/EyeLeft.png');
  rightEye = loadImage('images/EyeRight.png');
  topLip = loadImage('images/MouthTop.png');
  bottomLip = loadImage('images/MouthBottom.png');
  neck = loadImage('images/neck.png');
  shoulder = loadImage('images/shoulders.png');
  arm = loadImage('images/Armcopy.png');
  armRight = loadImage('images/armRight.png');
  body = loadImage('images/body.png');
  legs = loadImage('images/legs.png');
  hips = loadImage('images/hip.png');
  leftLeg = loadImage('images/leftLeg.png');
  rightLeg = loadImage('images/rightLeg.png');
  shoe = loadImage('images/shoe.png');
  eyeWhiteRight = loadImage('images/eyeWhiteRight.png');
  eyeWhiteLeft = loadImage('images/eyeWhiteLeft.png');
  hair = loadImage('images/hair.png');
  donut = loadImage('images/donut.png');
  startTime = millis(); //set up seconds counter

}

function drawInteraction(faces, hands) {
  noStroke()
  fill(250)
  rect(0, 0, 1290, 960)

  //screenshot function
  if (!screenshotTaken) {
    if (key === 's') {
      if (screenshotTimer === null) {
        // start timer the moment condition is first met
        screenshotTimer = millis();
      }
      // check 4 seconds since mouthTimer start
      if ((millis() - screenshotTimer) >= 4000) {
        saveCanvas('ml5-capture-' + frameCount, 'png');
        screenshotTaken = true
        screenshotTimer = null;
      }
    } else {
      screenshotTimer = null;
    }
  }

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
      let angle = map(indexFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI

      push();
      translate(faceCenterX - 45, faceCenterY + 35); // anchor for left arm
      rotate(angle);
      image(arm, 0, 0, 300, 50);
      pop();
    }

    if (hand.handedness === "Right") {
      let indexFingerTipY = hand.index_finger_tip.y;
      let angle = map(indexFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI
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
      let angle = map(pinkyFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI
      push();
      translate(faceCenterX + 20, faceCenterY + 260); // anchor for right leg
      scale(-1, 1);
      rotate(angle);
      image(leftLeg, 0, 0, 450, 335);
      pop();
    }

    if (hand.handedness === "Left") {
      let pinkyFingerTipY = hand.pinky_finger_tip.y;
      let angle = map(pinkyFingerTipY, 0, 960, TWO_PI, 0); //math for PI done by AI
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
    faceCenterX = face.faceOval.centerX;
    faceCenterY = face.faceOval.centerY;
    leftEyeCenterX = face.leftEye.centerX;
    rightEyeCenterX = face.rightEye.centerX;


    /*
    Start drawing on the face here
    */
    image(neck, faceCenterX - 30, faceCenterY, 300, 223);
    image(shoulder, faceCenterX - 56, faceCenterY, 300, 223);
    image(hair, faceCenterX - 70, faceCenterY - 150, 330, 253);
    image(face1, faceCenterX - 70, faceCenterY - 150, 330, 253);
    image(hips, faceCenterX - 100, faceCenterY + 210, 450, 335);
    image(body, faceCenterX - 90, faceCenterY, 330, 253);


    //EYES
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


    //MOUTH
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

    //donut vomit
    let mouthCentreX = topLipX - bottomLipX
    let mouthCentreY = bottomLipY - topLipY

    mouthCentreX = constrain(mouthCentreX, -mouthRangeX, mouthRangeX);
    mouthCentreY = constrain(mouthCentreY, 0, mouthRangeY); // vertical only downwards

    // draw donut animation after 2 seconds

   if (mouthCentreY > 19) {
    if (mouthTimer === null) {
      mouthTimer = millis(); // start timer
    }

    // check 2 seconds since mouth opened
    if ((millis() - mouthTimer) >= 2000) {
      // draw donut
      image(donut, face.keypoints[0].x - 20, face.keypoints[0].y - mouthCentreY - 20 + donutY, 300, 223);

      // gradually increase donutY over time
      donutY += 10; // increases 1 unit per frame after 2 seconds
    }
  } else {
    mouthTimer = null;
    donutY = 0; // reset if mouth closes
  }


    //Stop drawing on the face here
  }
  // Addtional elements here. Keep face drawing inside the for loop. 
}