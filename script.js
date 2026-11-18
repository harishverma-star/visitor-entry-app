
const camera = document.getElementById("camera");
const canvas = document.getElementById("photoCanvas");
const statusText = document.getElementById("selfieStatus");

let cameraStream = null;
let selfieCaptured = false;

const openCamera = document.getElementById("openCamera");
const capturePhoto = document.getElementById("capturePhoto");
const visitorForm = document.getElementById("visitorForm");

// Open front camera
openCamera.addEventListener("click", async function () {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    camera.srcObject = cameraStream;
    await camera.play();

    statusText.textContent = "Camera opened successfully";
  } catch (error) {
    alert("Camera access denied or unavailable. Please allow camera permission.");
  }
});

// Capture visitor selfie
capturePhoto.addEventListener("click", function () {
  if (!cameraStream) {
    alert("Please open the front camera first.");
    return;
  }

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  const context = canvas.getContext("2d");

  context.translate(canvas.width, 0);
  context.scale(-1, 1);

  context.drawImage(
    camera,
    0,
    0,
    canvas.width,
    canvas.height
  );

  selfieCaptured = true;

  statusText.textContent = "Selfie captured successfully";

  cameraStream.getTracks().forEach(track => track.stop());
  cameraStream = null;
});

// Submit form (test only)
visitorForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!selfieCaptured) {
    alert("Please capture visitor selfie first.");
    return;
  }

  alert(
    "Visitor form test successful! Google Sheets connection will be added in the next phase."
  );
});
