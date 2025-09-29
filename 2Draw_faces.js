// ----=  Faces  =----
/* load images here */

function prepareInteraction() {
  leftEye = loadImage('images/EyeLeft.png');
  //rightEye = loadImage('images/EyeRight.png');
  eyeWhiteRight = loadImage('images/eyeWhiteRight.png');
  face1 = loadImage('images/Face.png');
  topLip = loadImage('images/MouthTop.png');
  bottomLip = loadImage('images/MouthBottom.png');
  body = loadImage('images/body.png');
  neck = loadImage('images/neck.png');
  shoulder = loadImage('images/shoulders.png');
  legs = loadImage('images/legs.png');
  shoe = loadImage('images/shoe.png');


}

function drawInteraction(faces, hands) {

  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face\
    console.log(face);
    if (showKeypoints) {
      drawPoints(face)
    }

    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */
    // Here are some variables you may like to use. 
    // Face basics
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceheight = face.faceOval.height;
    // Left eye
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let leftEyeWidth = face.leftEye.width;
    let leftEyeHeight = face.leftEye.height;
    // Left eyebrow
    let leftEyebrowCenterX = face.leftEyebrow.centerX;
    let leftEyebrowCenterY = face.leftEyebrow.centerY;
    let leftEyebrowWidth = face.leftEyebrow.width;
    let leftEyebrowHeight = face.leftEyebrow.height;

    // Lips
    let lipsCenterX = face.lips.centerX;
    let lipsCenterY = face.lips.centerY;
    let lipsWidth = face.lips.width;
    let lipsHeight = face.lips.height;

    // Right eye
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let rightEyeWidth = face.rightEye.width;
    let rightEyeHeight = face.rightEye.height;

    // Right eyebrow
    let rightEyebrowCenterX = face.rightEyebrow.centerX;
    let rightEyebrowCenterY = face.rightEyebrow.centerY;
    let rightEyebrowWidth = face.rightEyebrow.width;
    let rightEyebrowHeight = face.rightEyebrow.height;

    let noseTipX = face.keypoints[4].x;
    let noseTipY = face.keypoints[4].y;

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
  image(leftEye,leftEyeCenterX-33,leftEyeCenterY-23,300,223);
  image(eyeWhiteRight,rightEyeCenterX-29,rightEyeCenterY-19,300,223);
  image(topLip,face.keypoints[0].x-20,face.keypoints[0].y-70,300,223);
  image(bottomLip,face.keypoints[14].x-20,face.keypoints[14].y-70,300,223);
  image(bottomLip,facekeypoints[14].x-20,face.keypoints[14].y-70,300,223);



    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}

function splashback(){
noStroke()
  fill(250)
  rect(0,0,1290,960)
}




// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}