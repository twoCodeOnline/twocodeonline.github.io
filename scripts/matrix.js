// character lists
let greek = "Α, α, Β, β, Γ, γ, Δ, δ, Ε, ε, Ζ, ζ, Η, η, Θ, θ, Ι, ι, Κ, κ, Λ, λ, Μ, μ, Ν, ν, Ξ, ξ, Ο, ο, Π, π, Ρ, ρ, Σ, σ, ς, Τ, τ, Υ, υ, Φ, φ, Χ, χ, Ψ, ψ, Ω, ω";
let japanese = "ぁ, あ, ぃ, い, ぅ, う, ぇ, え, ぉ, お, か, が, き, ぎ, く, ぐ, け, げ, こ, ご, さ, ざ, し, じ, す, ず, せ, ぜ, そ, ぞ, た, だ, ち, ぢ, っ, つ,づ, て, で, と, ど, な, に, ぬ, ね, の, は, ば, ぱ, ひ, び, ぴ, ふ, ぶ, ぷ, へ, べ, ぺ, ほ, ぼ, ぽ, ま, み, む, め, も, ゃ, や, ゅ, ゆ, ょ, よ, ら, り, る, れ, ろ, ゎ, わ, ゐ, ゑ, を, ん, ゔ, ゕ, ゖ, ァ, ア, ィ, イ, ゥ, ウ, ェ, エ, ォ, オ, カ, ガ, キ, ギ, ク, グ, ケ, ゲ, コ, ゴ, サ, ザ, シ, ジ, ス, ズ, セ, ゼ, ソ, ゾ, タ, ダ, チ, ヂ, ッ, ツ, ヅ, テ, デ, ト, ド, ナ, ニ, ヌ, ネ, ノ, ハ, バ, パ, ヒ, ビ, ピ, フ, ブ, プ, ヘ, ベ, ペ, ホ, ボ, ポ, マ, ミ, ム, メ, モ, ャ, ヤ, ュ, ユ, ョ, ヨ, ラ, リ, ル, レ, ロ, ヮ, ワ, ヰ, ヱ, ヲ, ン, ヴ, ヵ, ヶ";
let russian = "б, в, г, д, ж, з, к, л, м, н, п, р, с, т, ф, х, ц, ч, ш, щ, а, е, ё, и, о, у, ы, э, ю, я, й, ъ, ь";
let emojiList = "🍔, 🦅, 🇺🇸, 🛻";
let matrixElement = document.querySelector(".matrix");
let characterList = greek.split(", ");

// variables
let animationSpeedMultiplier = 400;
let charSpacing = -1;
let opacityDiff = 0.04;

// grids and columns
let columns;
let rows;
let columnData = [];

setColumnsAndRows();
generateColumns();

window.addEventListener("resize", () => {
   setColumnsAndRows();
   generateColumns();
});

function setColumnsAndRows() {
   let pageHeight = window.innerHeight;
   rows = Math.floor(pageHeight / 20) + 2;
   let columnNumber = Math.floor(window.innerWidth / 80);
   columns = columnNumber;
   matrixElement.style.display = "grid";
   matrixElement.style.gridTemplateColumns = `repeat(${columns}, 1ch)`;
}

function generateColumns() {
   matrixElement.innerHTML = "";
   columnData = [];

   for (let i = 0; i < columns; i++) {
      let columnElement = document.createElement("div");
      columnElement.width = "1ch";
      matrixElement.appendChild(columnElement);

      let column = {
         element: columnElement,
         characters: [],
         opacityPattern: [],
         offset: 0
      };

      let charOpacity = Math.random();
      for (let j = 0; j < rows; j++) {
         charOpacity += opacityDiff;
         if (charOpacity > 1) {
            charOpacity = charSpacing;
         }

         let charElement = document.createElement("p");
         charElement.textContent = randomCharacter();
         charElement.style.opacity = Math.max(0, charOpacity);
         columnElement.appendChild(charElement);

         column.characters.push(charElement);
         column.opacityPattern.push(charOpacity);
      }

      columnData.push(column);
      let animationSpeed = 100 + (Math.random() * animationSpeedMultiplier);
      setInterval(() => {
         shiftColumnPattern(column);
      }, animationSpeed);
   }
}

function shiftColumnPattern(column) {
   column.offset = (column.offset + 1) % rows;

   for (let i = 0; i < column.characters.length; i++) {
      let patternIndex = (i - column.offset + rows) % rows;
      let opacity = column.opacityPattern[patternIndex];

      column.characters[i].style.opacity = Math.max(0, opacity);

      if (Math.random() < 0.1) {
         column.characters[i].textContent = randomCharacter();
      }
   }
}

function randomCharacter() {
   return characterList[Math.floor(Math.random() * characterList.length)];
}