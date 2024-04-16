export type ScryfallCard = {
    object: "card",
    id: String,
    name: String,
    mana_cost: String,
    cmc: number,
    type_line: String,
    text: String,
}

export type ScryfallRuling = {
    object: "ruling",
    published_at: String,
    source: String,
    comment: String,
}
export type ScryfallRulings = {
    object: "list",
    data: ScryfallRuling[],
}