import { type ScryfallCard, type ScryfallRulings } from "../models/scryfall.js";
import { type Card, type Ruling, type Rulings } from "../models/cards.js";
import * as rm from 'typed-rest-client/RestClient.js';

export class ScryfallAPI {
    private client: rm.RestClient;

    constructor(protocol: String = 'https', host: String = 'api.scryfall.com', port: number = 443) {
        const baseUrl = `${protocol}://${host}:${port}`
        this.client = new rm.RestClient('stanton-sandbox', baseUrl);
    }

    public async getCard(name: String): Promise<Card | null> {
        const response = await this.client.get<ScryfallCard>(`/cards/named?exact=${name}`);
        if (response.statusCode !== 200 || response.result == null) {
            console.log(`An error occurred finding card named ${name}: ${response.result}`);
            return null;
        }
        const responseCard = response.result;
        return {
            id: responseCard.id,
            cmc: responseCard.cmc,
            types: (responseCard.type_line as String).split(' ').filter(v => v != '—'),
            manaCost: responseCard.mana_cost,
            name: responseCard.name,
            text: responseCard.text,
        }
    }

    public async getRulings(cardId: String): Promise<Rulings | null> {
        const response = await this.client.get<ScryfallRulings>(`/cards/${cardId}/rulings`);
        if (response.statusCode !== 200 || response.result == null) {
            console.log(`An error occurred finding rulings for card with ID ${cardId}: ${response.result}`);
            return null;
        }

        return {
            rulings: response.result.data.map((ruling: { published_at: String; source: String; comment: String; }) => {
                return {
                    date: ruling.published_at,
                    source: ruling.source,
                    text: ruling.comment,
                }
            }),
        }
    }
}