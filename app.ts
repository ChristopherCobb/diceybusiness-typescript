const button1 = document.getElementById("btn-generate") as HTMLButtonElement,
  containerDiv = document.getElementById("containerDiv") as HTMLDivElement,
  diceDiv = document.getElementById("diceDiv") as HTMLDivElement,
  rollDiceBtn = document.getElementById("roll-dice-btn") as HTMLButtonElement,
  diceSumBtn = document.getElementById("dice-sum-btn") as HTMLButtonElement,
  advancedBtn = document.getElementById("advanced-btn") as HTMLButtonElement,
  diceArray: Die[] = [],
  diceArrayUnicode: string[] = [
    null, 
    "\u2680",
    "\u2681",
    "\u2682",
    "\u2683",
    "\u2684",
    "\u2685",
  ];

class Die {
    public dice: HTMLDivElement;
    public value: number;
    constructor() {
    
    this.dice = document.createElement("div") as HTMLDivElement;
    this.dice.className = "dice";

    this.roll();
    diceDiv.appendChild(this.dice);

    // Double-Click Die to remove from grid - adjust SUM accordingly
      this.dice.addEventListener("dblclick", (e) => {
      diceDiv.removeChild(this.dice);
      let index: number = diceArray.indexOf(this);
      diceArray.splice(index, 1);
    });

    // Changes the Numbered Die to actual Dice

    advancedBtn.addEventListener("click", () => {
      this.dice.innerHTML = diceArrayUnicode[this.value];
    });
    // Click Die to reroll and update face value

    this.dice.addEventListener("click", () => {
      this.roll();
    });
  }

  // Function that defines the value of the Die

  roll(): void {
    let randomVal = Math.floor(Math.random() * 6) + 1;
    this.value = randomVal;
    this.dice.innerText = this.value.toString();
  }
}

// Creates a new die when "Generate Die" button is clicked - pushes the new Die to the global array

button1.addEventListener("click", () => {
  let newDie: Die = new Die();
  diceArray.push(newDie);
  //   console.log(diceArray);
});

// Rerolls all the Die when the "Reroll" button is clicked

rollDiceBtn.addEventListener("click", () => {
  diceArray.forEach((dice) => {
    dice.roll();
  });
});

// Adds up the sum of all the dice when the "Get Sum" button is clicked

diceSumBtn.addEventListener("click", () => {
  let sum: number = 0;
  diceArray.forEach((dice) => (sum += dice.value));
  alert(`The sum of all the dice is ${sum}`);
});
