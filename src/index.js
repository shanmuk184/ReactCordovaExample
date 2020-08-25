import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import FirebaseMessaging from '../plugins/cordova-plugin-firebase-messaging/www/FirebaseMessaging';
// FirebaseMessaging
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const renderReactDom = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

var onSuccess = function(position) {
  console.log('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
};


// onError Callback receives a PositionError object
//
function onError(error) {
  console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

function setOptions(srcType) {
  var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: 1,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: 0,
      mediaType: 0,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
  }
  return options;
}
function displayImage(imgUri) {

  var elem = document.getElementById('imageFile');
  elem.src = imgUri;
}
// function createNewFileEntry(imgUri) {
//   window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

//       // JPEG file
//       dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

//           // Do something with it, like write to it, upload it, etc.
//           // writeFile(fileEntry, imgUri);
//           console.log("got file: " + fileEntry.fullPath);
//           // displayFileData(fileEntry.fullPath, "File copied to");

//       }, onErrorCreateFile);

//   }, onErrorResolveUrl);
// }
function openCamera(selection) {

  var srcType = 1;
  var options = setOptions(srcType);
  // var func = createNewFileEntry;

  navigator.camera.getPicture(function cameraSuccess(imageUri) {

      displayImage(imageUri);
      // You may choose to copy the picture, save it somewhere, or upload.
      // func(imageUri);

  }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

  }, options);
}
if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  navigator.geolocation.getCurrentPosition(onSuccess,onError);
  navigator.contacts.pickContact(function(contact){
    console.log('The following contact has been selected:' + JSON.stringify(contact));
},function(err){
    console.log('Error: ' + err);
});
document.getElementById("cameraTakePicture").addEventListener("click", openCamera); 
window.cordova.plugins.firebase.messaging.requestPermission().then(function() {
  console.log("Push messaging is allowed");
});
window.cordova.plugins.firebase.messaging.getToken().then(function(token) {
  console.log("Got device token: ", token);
});
window.cordova.plugins.firebase.messaging.getInstanceId().then(function(instanceId) {
console.log("Got instanceId: ", instanceId);
});
window.cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
console.log("You'll get foreground notifications when a push message arrives");
});
VideoPlayer.play("file:///android_asset/www/movie.mp4");

  }, false);

} else {
  renderReactDom();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
