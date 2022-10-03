const allCountryWrapper = document.querySelector(".all-country-wrapper");

class Country {
  #url = "https://restcountries.com/v2/all";

  constructor() {
    this._getAllCountryData();
  }

  async _getAllCountryData() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) throw new Error("Error occured while fetching data");
      const data = await response.json();
      this._renderCountry(data);
    } catch (error) {
      this._renderError(error.message);
    }
  }

  _renderCountry(countries) {
    countries.forEach((country) => {
      const html = `
        <div
          class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              class="rounded-t-lg h-48 w-full object-cover"
              src="${country.flag}"
              alt="Flag of ${country.name}"
            />
          </a>
          <div class="p-5">
            <a href="#">
              <h5
                class="mb-2 text-2xl font-bold h-16 tracking-tight text-gray-900 dark:text-white"
              >
              ${country.name}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              🏛️ ${country.capital} <br />
              🗺️ ${country.area} km² area <br />
              🧑🏻‍🤝‍🧑🏾 ${(country.population / 1000000).toFixed(
                1
              )} million people <br />
              🗣️ ${country.languages?.at(0)?.name} (${
        country.languages?.at(0)?.nativeName
      }) <br />
              💰 ${country.currencies?.at(0)?.name} (${
        country.currencies?.at(0)?.symbol
      })
            </p>
            <a
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Learn more
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      `;

      allCountryWrapper.insertAdjacentHTML("beforeend", html);
    });
  }

  _renderError(errorMessage) {
    const p = `<p class="text-gray-700 dark:text-gray-400">${errorMessage}</p>`;
    allCountryWrapper.insertAdjacentHTML("beforeend", p);
  }
}

const country1 = new Country();
