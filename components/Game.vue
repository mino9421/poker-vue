<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="poker-container">
    <div class="table">
      <div class="community-cards">
        <h3>Community Cards</h3>
        <div class="cards">
          <img
            v-for="card in communityCards"
            :key="card"
            :src="getCardImage(card)"
            class="card-image"
            :alt="card"
          />
        </div>
      </div>
      <div class="player-hand">
        <div class="player-name">Player ({{ player.credits }} credits)</div>
        <div class="player-cards">
          <img
            v-for="card in player.cards"
            :key="card"
            :src="getCardImage(card)"
            class="card-image"
            :alt="card"
          />
        </div>
      </div>
      <div />
      <div class="controls">
        <button @click="dealCards">Deal Hole Cards</button>
        <button :disabled="flopDealt" @click="dealFlop">Deal Flop</button>
        <button
          :disabled="turnDealt || communityCards.length < 3"
          @click="dealTurn"
        >
          Deal Turn
        </button>
        <button
          :disabled="riverDealt || communityCards.length < 4"
          @click="dealRiver"
        >
          Deal River
        </button>
        <div class="betting">
          <input
            v-model="betAmount"
            type="number"
            min="1"
            placeholder="Enter bet amount"
          />
          <button @click="placeBet">Place Bet</button>
        </div>
        <div class="pot">
          <h4>Pot: {{ pot }} credits</h4>
        </div>
        <div v-if="riverDealt" class="result">
          <h4 class="result-title">Player's Hand:</h4>
          <div class="cards player-hand">
            <img
              v-for="card in player.cards"
              :key="card"
              :src="getCardImage(card)"
              class="card-image"
              :alt="card"
            />
          </div>
          <h4 class="result-title">Community Cards:</h4>
          <div class="cards community-cards">
            <img
              v-for="card in communityCards"
              :key="card"
              :src="getCardImage(card)"
              class="card-image"
              :alt="card"
            />
          </div>
          <h4 class="result-title">Computer's Hand:</h4>
          <div class="cards computer-hand">
            <img
              v-for="card in computer.cards"
              :key="card"
              :src="getCardImage(card)"
              class="card-image"
              :alt="card"
            />
          </div>
          <h4 class="result-title">Result:</h4>
          <div class="result-message">
            {{ resultMessage }}
          </div>
        </div>
      </div>
      <div class="hand-rank">
        <img
          src="/cards/poker_hands.jpg"
          alt="Poker Hand Ranks"
          class="hand-rank-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const player = ref({
  name: "Player",
  cards: [],
  credits: 1000,
});

const computer = ref({
  cards: [],
});

const communityCards = ref([]);
const flopDealt = ref(false);
const turnDealt = ref(false);
const riverDealt = ref(false);
const currentBet = ref(0);
const betAmount = ref(0);
const pot = ref(0);
const resultMessage = ref("");

// Computed properties to combine player/computer hand and community cards
const playerHandCards = computed(() => [
  ...player.value.cards,
  ...communityCards.value,
]);
const computerHandCards = computed(() => [
  ...computer.value.cards,
  ...communityCards.value,
]);

const deck = [
  "spades_ace",
  "spades_2",
  "spades_3",
  "spades_4",
  "spades_5",
  "spades_6",
  "spades_7",
  "spades_8",
  "spades_9",
  "spades_10",
  "spades_jack",
  "spades_queen",
  "spades_king",
  "hearts_ace",
  "hearts_2",
  "hearts_3",
  "hearts_4",
  "hearts_5",
  "hearts_6",
  "hearts_7",
  "hearts_8",
  "hearts_9",
  "hearts_10",
  "hearts_jack",
  "hearts_queen",
  "hearts_king",
  "diamonds_ace",
  "diamonds_2",
  "diamonds_3",
  "diamonds_4",
  "diamonds_5",
  "diamonds_6",
  "diamonds_7",
  "diamonds_8",
  "diamonds_9",
  "diamonds_10",
  "diamonds_jack",
  "diamonds_queen",
  "diamonds_king",
  "clubs_ace",
  "clubs_2",
  "clubs_3",
  "clubs_4",
  "clubs_5",
  "clubs_6",
  "clubs_7",
  "clubs_8",
  "clubs_9",
  "clubs_10",
  "clubs_jack",
  "clubs_queen",
  "clubs_king",
];

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const dealCards = () => {
  const shuffledDeck = shuffleDeck(deck.slice());

  player.value.cards = [shuffledDeck.pop(), shuffledDeck.pop()];
  computer.value.cards = [shuffledDeck.pop(), shuffledDeck.pop()];

  communityCards.value = [];
  flopDealt.value = false;
  turnDealt.value = false;
  riverDealt.value = false;
  currentBet.value = 0;
  pot.value = 0;
  resultMessage.value = "";
};

const dealFlop = () => {
  const shuffledDeck = shuffleDeck(deck.slice());
  shuffledDeck.pop();
  communityCards.value = [
    shuffledDeck.pop(),
    shuffledDeck.pop(),
    shuffledDeck.pop(),
  ];
  flopDealt.value = true;
};

const dealTurn = () => {
  const shuffledDeck = shuffleDeck(deck.slice());
  shuffledDeck.pop();
  communityCards.value.push(shuffledDeck.pop());
  turnDealt.value = true;
};

const dealRiver = () => {
  const shuffledDeck = shuffleDeck(deck.slice());
  shuffledDeck.pop();
  communityCards.value.push(shuffledDeck.pop());
  riverDealt.value = true;
  determineWinner();
};

const placeBet = () => {
  if (betAmount.value <= 0 || betAmount.value > player.value.credits) {
    alert("Invalid bet amount.");
    return;
  }
  player.value.credits -= betAmount.value;
  pot.value += betAmount.value;
  currentBet.value = betAmount.value;
  betAmount.value = 0;
};

const determineWinner = () => {
  const playerHand = evaluateHand(playerHandCards.value);
  const computerHand = evaluateHand(computerHandCards.value);

  if (playerHand.value > computerHand.value) {
    resultMessage.value = `You win with ${playerHand.hand}! You get ${
      pot.value * 2
    } credits.`;
    player.value.credits += pot.value * 2;
  } else if (playerHand.value < computerHand.value) {
    resultMessage.value = `Computer wins with ${computerHand.hand}. You lose your bet of ${pot.value} credits.`;
  } else {
    // Tie-breaker based on High Card
    if (playerHand.highCard > computerHand.highCard) {
      resultMessage.value = `You win with a High Card! You get ${
        pot.value * 2
      } credits.`;
      player.value.credits += pot.value * 2;
    } else if (playerHand.highCard < computerHand.highCard) {
      resultMessage.value = `Computer wins with a High Card. You lose your bet of ${pot.value} credits.`;
    } else {
      resultMessage.value = `It's a tie with ${playerHand.hand}.`;
      player.value.credits += currentBet.value; // Return the bet amount in case of a tie
    }
  }
};

const evaluateHand = (cards) => {
  const rankOrder = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  };

  const rankConversion = {
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  };

  const suits = cards.map((card) => card.split("_")[0]);
  const ranks = cards.map((card) => {
    const rank = card.split("_")[1];
    return rankConversion[rank] || rank;
  });

  // Check if ranks are valid
  const validRanks = ranks.every((rank) => rankOrder[rank] !== undefined);
  if (!validRanks) {
    throw new Error(`Invalid rank detected in the cards: ${ranks}`);
  }

  const rankCounts = {};
  ranks.forEach((rank) => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const uniqueRanks = [...new Set(ranks)].sort(
    (a, b) => rankOrder[a] - rankOrder[b]
  );

  // Check for straight
  const isStraightHand = (uniqueRanks) => {
    if (uniqueRanks.length !== 5) return false;

    const firstRankValue = rankOrder[uniqueRanks[0]];
    const lastRankValue = rankOrder[uniqueRanks[4]];
    const isStandardStraight = lastRankValue - firstRankValue === 4;

    // Handle low-Ace straight (A, 2, 3, 4, 5)
    const isLowAceStraight =
      uniqueRanks.includes("ace") &&
      uniqueRanks.includes("2") &&
      lastRankValue - rankOrder["2"] === 3;

    return isStandardStraight || isLowAceStraight;
  };

  const isFlushHand = isFlush(suits);
  const isStraight = isStraightHand(uniqueRanks);

  if (isFlushHand && isStraight && uniqueRanks[0] === "10")
    return { hand: "Royal Flush", value: 10 };
  if (isFlushHand && isStraight) return { hand: "Straight Flush", value: 9 };
  if (counts[0] === 4) return { hand: "Four of a Kind", value: 8 };
  if (counts[0] === 3 && counts[1] === 2)
    return { hand: "Full House", value: 7 };
  if (isFlushHand) return { hand: "Flush", value: 6 };
  if (isStraight) return { hand: "Straight", value: 5 };
  if (counts[0] === 3) return { hand: "Three of a Kind", value: 4 };
  if (counts[0] === 2 && counts[1] === 2) return { hand: "Two Pair", value: 3 };
  if (counts[0] === 2) return { hand: "One Pair", value: 2 };

  const highCardValue = Math.max(...ranks.map((rank) => rankOrder[rank]));

  return {
    hand: "High Card",
    value: 1,
    highCard: highCardValue,
  };
};

const isFlush = (suits) => new Set(suits).size === 1;

const isStraight = (uniqueRanks, rankOrder) => {
  if (uniqueRanks.length !== 5) return false;

  const firstRankValue = rankOrder[uniqueRanks[0]];
  const lastRankValue = rankOrder[uniqueRanks[4]];
  const isStandardStraight = lastRankValue - firstRankValue === 4;
  const isLowAceStraight =
    uniqueRanks.includes("ace") &&
    uniqueRanks.includes("2") &&
    uniqueRanks.includes("5");

  return isStandardStraight || isLowAceStraight;
};

const getCardImage = (card) => {
  return `/cards/${card}.svg`;
};
</script>

<style scoped>
.poker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-color: #2e7d32;
}

.table {
  position: relative;
  width: 80%;
  max-width: 1200px;
  height: auto;
  background-color: #004d40;
  border-radius: 15px;
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.community-cards,
.player-hand {
  width: 100%;
  margin-bottom: 20px;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.card-image {
  width: 100px;
  height: auto;
}

.player-hand {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.player-cards {
  display: flex;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.controls button {
  margin: 5px;
}

.betting input {
  margin-top: 20px;
  color: black;
}

.pot {
  margin-top: 10px;
}

.result {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #004d40;
  border: 2px solid #00796b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.result-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #00796b;
}

.result-message {
  font-size: 22px;
  font-weight: bold;
  color: #ffd54f;
  padding: 15px;
  background-color: #003d33;
  border: 2px solid #00796b;
  border-radius: 8px;
  text-align: center;
}

.hand-rank-image {
  width: auto;
  height: 350px;
  margin-right: 20px;
}
</style>
