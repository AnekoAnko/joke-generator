import request from 'supertest';
import {it, expect, describe, vi, beforeEach, afterAll} from 'vitest';
import app from '../app.js'
import axios from 'axios';

vi.mock('axios');

const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

const mockResponse = {
    data: {
        category: "any"
    }
}

const mockErrorResponse = new Error("Failed to make request");

afterAll(() => {
    consoleMock.mockReset();
  });

beforeEach(() => {
    axios.get.mockResolvedValue(mockResponse);
});

describe('Express Routes', () => {
    describe('GET /', () => {
        it('should call axios.get with the correct URL', async () => {
            await request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then((response) => {
                console.log(response.body)
                expect(response.text).toContain(mockResponse.data.category);
            })

            expect(axios.get).toBeCalledWith('https://v2.jokeapi.dev/joke/');
        });
    });

    describe('POST /', () => {
        it('should call axios.get with the correct URL based on type', async () => {
            const type = "any";
            await request(app)
            .post('/')
            .send({ type })
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .then((response) => {
                expect(response.text).toContain(mockResponse.data.category);
            })

            expect(axios.get).toBeCalledWith(`https://v2.jokeapi.dev/joke/${type}`);
            
        });

        it('should handle errors and redirect to /', async () => {
            axios.get.mockRejectedValue(mockErrorResponse);

            await request(app)
            .post('/')
            .send({ type: "invalid" })
            .expect('Content-Type', 'text/html; charset=utf-8')
            expect(422)

            expect(consoleMock).toHaveBeenCalledOnce();
        });
    });
});

