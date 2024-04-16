import express, { type ErrorRequestHandler } from 'express';
import { ScryfallAPI } from './services/scryfall.js';
import { type CardAndRulings } from './models/cards.js';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json({
    strict: true,
}));

app.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

const scryfall = new ScryfallAPI();
const prisma = new PrismaClient();

app.get('/', (_, res) => res.send("Hello, World!"));
app.post('/echo', (req, res) => res.send(req.body));
app.get('/hello/:name', (req, res) => res.send(`Hello, ${req.params.name}!`));

app.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
        }
    });
    res.status(201).send(newUser);
});
app.get('/users/:id', async (req, res) => {
    res.send(await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }));
});

app.get('/scryfall/cards/:name', async (req, res) => {
    const card = await scryfall.getCard(req.params.name);
    if (!card) {
        return res.sendStatus(404);
    }
    return res.json(card);
});
app.get('/scryfall/cards/:name/rulings', async (req, res) => {
    const card = await scryfall.getCard(req.params.name);
    if (!card) {
        return res.sendStatus(404);
    }
    const rulings = await scryfall.getRulings(card.id);
    if (!rulings) {
        return res.sendStatus(500);
    }
    const cardAndRulings: CardAndRulings = { ...card, ...rulings };
    res.json(cardAndRulings)
});

// CONSIDER: Without the cast this doesn't determine the type correctly.
app.use(((err, req, res, next) => {
    console.log("SJS");
    res.status(500).send(err);
}) as ErrorRequestHandler);

export default app;