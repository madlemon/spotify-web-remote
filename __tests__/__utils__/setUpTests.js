const {spotifyServer} = require("../__mocks__/spotifyServer");

process.env.NEXT_PUBLIC_CLIENT_ID = "123"
process.env.NEXT_PUBLIC_CLIENT_SECRET = "456"
process.env.POLLING_INTERVAL = 999999999999999

// Establish API mocking before all tests.
beforeAll(() => spotifyServer.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => spotifyServer.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => spotifyServer.close())
