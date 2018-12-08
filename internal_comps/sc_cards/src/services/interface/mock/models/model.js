export const Model = getInitialModel();

export function getInitialModel() {
  return {
    cards: {},
    player: {
      hand: {
        cards: [],
        refillSize: 5
      },
      deck: {
        cards: []
      },
      discardPile: {
        cards: []
      },
      lostCards: {
        cards: []
      },
      field: {
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    },
    opponent: {
      field: {
        backlog: [
          {
            cards: []
          },
          {
            cards: []
          },
          {
            cards: []
          }
        ],
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    }
  };
}