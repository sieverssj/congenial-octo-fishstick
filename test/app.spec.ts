import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import app from '../build/app.js';

describe('Root path', () => {
    test('should repond to GET with "Hello, World!"', async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello, World!");
    });
});