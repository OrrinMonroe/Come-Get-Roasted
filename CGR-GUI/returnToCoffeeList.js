returnToCoffeeList();

function returnToCoffeeList() {
  let goBack = document.querySelector('.goBack');

  goBack.addEventListener('submit', event => {
      event.preventDefault();

      let mainDiv = document.querySelector('.main');
      mainDiv.innerHTML = `
          <div id="preferenceList" class="hidden"><ul>This is where the preference list goes if you're logged in</ul></div>
          <ul id="drinkList"></ul>
      `
  });
}