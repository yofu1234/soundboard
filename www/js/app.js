var app = angular.module('soundboard', ['ionic']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.controller('SoundBoardCtrl', function ($scope, $window) {

	$scope.media = null;

	$scope.model = {
		showDelete: false,
		showMove: false,
		sounds: [
			{
				'title': 'Cow',
				'image': 'img/animals/cow-icon.png',
				'desc': 'Mooo',
				'file': '/sounds/cow.mp3'
			},
			{
				'title': 'Dolphin',
				'image': 'img/animals/dolphin-icon.png',
				'desc': 'Whistle',
				'file': '/sounds/dolphin.mp3'
			},
			{
				'title': 'Frog',
				'image': 'img/animals/frog-icon.png',
				'desc': 'Croak',
				'file': '/sounds/frog.mp3'
			},
			{
				'title': 'Bird',
				'image': 'img/animals/bird-icon.png',
				'desc': 'Chirp',
				'file': '/sounds/bird.mp3'
			},
			{
				'title': 'Pig',
				'image': 'img/animals/pig-icon.png',
				'desc': 'Oink',
				'file': '/sounds/pig.mp3'
			},
			{
				'title': 'Dog',
				'image': 'img/animals/puppy-icon.png',
				'desc': 'Bark',
				'file': '/sounds/dog.mp3'
			},
			{
				'title': 'Cat',
				'image': 'img/animals/black-cat-icon.png',
				'desc': 'Meow',
				'file': '/sounds/cat.mp3'
			}
		]
	};

  // DELETES the selected Sound
  $scope.deleteSound = function($index) {
    $scope.model.sounds.splice($index, 1);
  };

  // MOVES the selected Sound
  $scope.moveSound = function(sound, fromIndex, toIndex){

    //move the sound from its current position...
    $scope.model.sounds.splice(fromIndex, 1);

    //...to where you want to drop it off
    $scope.model.sounds.splice(toIndex, 0, sound);
  };

	$scope.play = function (sound) {

    // add a check so that
    //    IF there is a a sound playing, it will be paused when you click on another sound so it doesn't overlap
    if ($scope.media) {

      //pause the media file
      $scope.media.pause();
    }



    // Cordova media plugin will only work on Android/iOS device, NOT on the browser
    // So if you are running it in the browser, you need to use the html5 and when in device, use the plugin
    if ($window.cordova) {
      console.log("Play called on device")

      //When ionic application is finished loading and ready:
      ionic.Platform.ready(function () {

        //if ionic is running on an Android:
        var src = sound.file;
        if(ionic.Platform.is('android')){
          src = '/android_asset/www' + src;
        }

        //create a new media object and path in the sound file
        $scope.media = new $window.Media(src);

        //play the media
        $scope.media.play();
      });
    }
    else {

      //create new audio object for the sounds
      $scope.media = new Audio();

      //equal the new audio object to the location of the sound file
      $scope.media.src = sound.file;

      //load the sound file
      $scope.media.load();

      //play the sound file
      $scope.media.play();
    }

	};
});

