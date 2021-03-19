const request = require("supertest");
const app = require("./app");
const admin = require("firebase-admin");
const authorise = require("./auth");
const token = "MyToken";

const validBearerToken = {
    token: `Bearer ${token}`,
};

const {
    shortPasswordErrorMessage,
    mockToken,
    mockUid,
    invalidEmailErrorMessage,
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
});
