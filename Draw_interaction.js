
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

function prepareInteraction() {
  face1 = loadImage('images/Face.png');
  leftEye = loadImage('images/EyeLeft.png');
  rightEye = loadImage('images/EyeRight.png');
  topLip = loadImage('images/MouthTop.png');
  bottomLip = loadImage('images/MouthBottom.png');
  neck = loadImage('images/neck.png');
  shoulder = loadImage('images/shoulders.png');
  arm = loadImage('images/arm.png');
  body = loadImage('images/body.png');
  legs = loadImage('images/legs.png');
  shoe = loadImage('images/shoe.png');
  eyeWhiteRight = loadImage('images/eyeWhiteRight.png');
  eyeWhiteLeft = loadImage('images/eyeWhiteLeft.png');

  
}

function drawInteraction(faces, hands) {
  
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }

  /*
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;

   
  //Start drawing hands here
  

  let anchorX = faceCenterX+20; // X position of anchor
  let anchorY = faceCenterY; // Y position of anchor

  push();
  translate(anchorX, anchorY);
  rotate(radians(angle));
  image(arm,faceCenterX+20,faceCenterY,300,223);
  pop()
  angle += 1;

    */
  //Stop drawing hands 
    
  }

  //------------------------------------------------------------
  //facePart
  
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    /*
    Start drawing on the face here
    */
  splashback()
  image(neck,faceCenterX-30,faceCenterY,300,223);
  image(shoulder,faceCenterX-56,faceCenterY,300,223);
  image(face1,faceCenterX-70,faceCenterY-150,330,253);
  image(legs,faceCenterX-100,faceCenterY+210,450,335);
  image(shoe,faceCenterX-180,faceCenterY+495,450,335);//right shoe
  image(shoe,faceCenterX,faceCenterY+507,450,335);//left shoe
  image(body,faceCenterX-90,faceCenterY,330,253);
  //image(leftEye,leftEyeCenterX-33,leftEyeCenterY-23,300,223);
  image(topLip,face.keypoints[0].x-20,face.keypoints[0].y-70,300,223);
  image(bottomLip,face.keypoints[14].x-20,face.keypoints[14].y-70,300,223);
  image(bottomLip,face.keypoints[14].x-20,face.keypoints[14].y-70,300,223);


//right eye draw
image(eyeWhiteRight,rightEyeCenterX,rightEyeCenterY-19,300,223);
rightEyeH =face.keypoints[374].y-face.keypoints[386].y
rightPupilH = map (rightEyeH,15,20,10,30)
rightPupilH = constrain(rightPupilH,0,30)
fill(0)
ellipse(rightEyeCenterX+25,rightEyeCenterY+5, 30, rightPupilH)

//left eye draw

image(eyeWhiteLeft,leftEyeCenterX-33,leftEyeCenterY-20,300,223);
leftEyeH =face.keypoints[374].y-face.keypoints[386].y
leftPupilH = map (leftEyeH,15,20,10,30)
leftPupilH = constrain(leftPupilH,0,30)
fill(0)
ellipse(leftEyeCenterX,leftEyeCenterY,30, leftPupilH)


/*/

imageMode(CENTRE)
image(face1,100,100,330,253);

/*/ 
  //Stop drawing on the face here
  }
  // Addtional elements here. Keep  face drawing inside the for loop. 
}

function splashback(){
noStroke()
  fill(250)
  rect(0,0,1290,960)
}

/*
function rightEye(eyeWhiteRight,){
imageMode(CENTRE)
image(eyeWhiteRight,rightEyeCenterX,rightEyeCenterY-19,300,223);

pupilH = map (face.keypoints[374].y, face.keypoints[396].y,10,20)

fill(0)
ellipse(rightEyeCenterX,rightEyeCenterY, 30, pupilH)
*/



