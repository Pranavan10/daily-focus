const request = require("supertest");
const app = require("./app");
const admin = require("firebase-admin");
const authorise = require("./auth");
const token = "MyToken";

const validBearerToken = {
    token: `Bearer ${token}`,
};

const noBearerPrefixToken = {
    token: token,
};

const {
    shortPasswordErrorMessage,
    mockToken,
    mockUid,
    invalidEmailErrorMessage,
    UnauthorizedErrorMessage,
} = require("./test_utils/mocks/mockFirebase");

jest.mock("firebase-admin", () => {
    const { mockFirebase } = require("./test_utils/mocks/mockFirebase");
    return mockFirebase;
});

describe("authorisation tests  ", () => {
    beforeAll(() => {
        //Used this originally for postman testing does not work without this line
        app.post("/auth", authorise);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("when a valid bearer token is given to firebase is the expected UUID returned", async () => {
        const response = await request(app)
            .post("/auth")
            .set("Authorization", validBearerToken.token);
        expect(response.status).toBe(200);
        expect(response.body.UUID).toEqual(mockUid);
        expect(admin.auth).toHaveBeenCalled();
        expect(admin.auth().verifyIdToken).toHaveBeenCalledWith(token);
    });

    it("Token is not given with request expects aunauthorized error message with 401 status", async () => {
        const response = await request(app).post("/auth");
        expect(response.status).toBe(401);
        expect(response.body).toEqual(UnauthorizedErrorMessage);
    });

    it("Token is given without Bearer prefix expects aunauthorized error message with 401 status", async () => {
        const response = await request(app)
            .post("/auth")
            .set("Authorization", noBearerPrefixToken.token);
        expect(response.status).toBe(401);
        expect(response.body).toEqual(UnauthorizedErrorMessage);
    });
});
