export type Card = {
    id: String,
    name: String,
    manaCost: String,
    cmc: number,
    types: String[],
    text: String,
}

export type Ruling = {
    source: String,
    date: String,
    text: String,
}

export type Rulings = {
    rulings: Ruling[],
}

export type CardAndRulings = Card & Rulings;