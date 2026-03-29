// helper functions here
type Card = {
  type: string; // e.g. "Visa"
  number: string; // e.g. "4111111111111234"
};
export function formatCard(card: Card) {
  const last4 = card.number.slice(-4);
  return `${card.type}, •••• ${last4}`;
}
