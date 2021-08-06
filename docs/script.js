import stateguy from "https://cdn.jsdelivr.net/npm/stateguy@0.0.1/stateguy.min.js";

// Get Denmark data because why not
const getDenmarkData = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/alpha/dk');
  const data = await response.json();
  return data.population;
};

const denmarkPopulation = await getDenmarkData();

const stateguyPopulation = Math.floor(Math.random() * 100000)

document.getElementById('denmark-pop').innerHTML = denmarkPopulation

// Fill out state with default values
stateguy.init({
  currentTab: 'home',
  population: {
    stateguyUserCount: stateguyPopulation,
    denmarkPopPercentage: Math.round(stateguyPopulation / await denmarkPopulation * 10000) / 100
  },
  developer: {
    name: 'Camden',
    job: 'unemployed <a href="https://camdenmecklem.com/resume.pdf">(please hire me!)</a>'
  },
  weather: 'partly cloudy'
});

// Get the different content tabs
const homeContent = document.getElementById('home-content');
const statsContent = document.getElementById('stats-content');
const contentElements = [homeContent, statsContent];

const changeTab = () => {
  contentElements.forEach(element => element.style.display = 'none')
  switch (stateguy.fetch('currentTab')) {
    case 'home':
      homeContent.style.display = 'block';
      break;
    case 'stats':
      statsContent.style.display = 'block';
      break;
    default:
      homeContent.style.display = 'block';
  }
}

// Set up buttons that interact with state
const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  stateguy.dispatch('currentTab', 'home');
  changeTab();
});

const statsButton = document.getElementById('stats-button');
statsButton.addEventListener('click', () => {
  stateguy.dispatch('currentTab', 'stats');
  changeTab();
});

const bumpUserButton = document.getElementById('increment-pop');

bumpUserButton.addEventListener(
  'click', () => stateguy.dispatch('population', { stateguyUserCount: stateguy.fetch('population', 'stateguyUserCount') + 1 })
);

const removeUserButton = document.getElementById('decrement-pop');

removeUserButton.addEventListener(
  'click', () => stateguy.dispatch('population', { stateguyUserCount: stateguy.fetch('population', 'stateguyUserCount') - 1 })
);