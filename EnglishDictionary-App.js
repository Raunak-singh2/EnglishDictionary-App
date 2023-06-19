
const inputEl = document.getElementById("inp");
const infoEl = document.getElementById("info-text");
const containerItemsEl = document.getElementById("container-items");
const wordEl = document.getElementById("word");

const meaningEl = document.getElementById("meaning");
const audiouEl = document.getElementById("imgbox");

async function fetchApi(word) {
  try {
    infoEl.style.display = "block";
    containerItemsEl.style.display = "none";
    infoEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    if (result.title) {
      wordEl.innerText = word;
      meaningEl.innerText = "N/A";
      audiouEl.style.display = "none";
    }
    infoEl.style.display = "none";
    containerItemsEl.style.display = "block";
    audiouEl.style.display = "inline-flex";

    wordEl.innerText = result[0].word;
    meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audiouEl.src = result[0].phonetics[0].audio;
  } catch (error) {
    console.log(error);
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key == "Enter") {
    fetchApi(e.target.value);
  }
});
