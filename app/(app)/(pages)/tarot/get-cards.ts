import { tarotCards, Card } from "@/lib/tarot-data";

export type Result = {
  card: Card;
  reading: string;
  context: "Passé" | "Présent" | "Futur";
};

export function getRandomCards() {
  const NUMBER_OF_CARDS = 3;
  const DECK_LENGTH = tarotCards.length;
  let cardsPicked: Card[] = [];
  let indexes: number[] = [];

  for (let i = 0; cardsPicked.length < NUMBER_OF_CARDS; i++) {
    const randomIndex = Math.floor(Math.random() * DECK_LENGTH);

    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);

      const card = tarotCards[randomIndex];
      cardsPicked.push(card);
    }
  }

  return cardsPicked;
}
