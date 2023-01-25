import { elements } from "./elements.js";
import Controls from "./controls.js";
import Timer from "./timer.js";
import Sound from "./sounds.js";

const {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonSoundOn,
  buttonSoundOff,
  minutesDisplay,
  secondsDisplay
} = elements;

let minutes = Number(minutesDisplay.textContent);

const controls = Controls({
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet
});

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.reset,
  minutes
});

const sound = Sound();

buttonPlay.addEventListener('click', function() {
  controls.play();
  timer.countDown();
  sound.pressButton();

  if(!buttonSoundOn.classList.contains('hide')){
    sound.bgAudio.play();
  };
});

buttonPause.addEventListener('click', function() {
  controls.pause();
  timer.pause();
  sound.pressButton();
  sound.bgAudio.pause();
});

buttonStop.addEventListener('click', function() {
  controls.reset();
  timer.reset();
  sound.pressButton();
  sound.bgAudio.pause();
});

buttonSoundOn.addEventListener('click', function() {
  buttonSoundOn.classList.add('hide');
  buttonSoundOff.classList.remove('hide');
  sound.bgAudio.pause();
});

buttonSoundOff.addEventListener('click', function() {
  buttonSoundOff.classList.add('hide');
  buttonSoundOn.classList.remove('hide');
  
  if(buttonPlay.classList.contains('hide')){
    sound.bgAudio.play();
  };
});

buttonSet.addEventListener('click', function() {
  let newMinutes = controls.getMinutes();
  
  if (!newMinutes) {
    timer.reset();
    return;
  };

  minutes = newMinutes;
  timer.updateDisplay(minutes, 0);
  timer.updateMinutes(minutes);
});
