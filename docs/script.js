import stateguy from "../stateguy.js";

// Fill out state with default values
stateguy.init({
  population: {
    stateguyUserCount: 0
  },
  developer: {
    name: 'camden',
    job: 'unemployed'
  },
  weather: 'partly cloudy'
});

const stateButton = document.getElementById('bump-state');

stateButton.addEventListener(
  'click', () => stateguy.dispatch('population', { stateguyUserCount: stateguy.fetch('population', 'stateguyUserCount') + 1 })
);