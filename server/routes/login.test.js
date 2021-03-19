const request = require("supertest");
const app = require("../app");
const firebase = require("firebase");
const database = require("./../firebase").database;

const {
    shortPasswordErrorMessage,
    mockToken,
    mockUid,
    invalidEmailErrorMessage,
    unauthorizedEmailPasswordMessage,
} = require("../test_utils/mocks/mockFirebase");

jest.mock("firebase", () => {
    const { mockFirebase } = require("../test_utils/mocks/mockFirebase");
    return mockFirebase;
});

jest.mock("./../firebase", () => {
    const mockDatabase = require("../test_utils/mocks/mockDatabase");
    return {
        database: mockDatabase,
    };
});

const authorizedPasswordAndEmailInput = {
    email: "test@gmail.com",
    password: "123456",
};

const unauthorizedAccountInput = {
    email: "test@gmail.com",
    password: "1234567",
};

describe("login user endpoint  ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("when an authorised email and password is given it returns 200 and makes calls to firebase", async () => {
        const response = await request(app)
            .post("/login")
            .set("Accept", "application/json")
            .send(authorizedPasswordAndEmailInput);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockToken);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            authorizedPasswordAndEmailInput.email,
            authorizedPasswordAndEmailInput.password
        );
    });
    it("when an unauthorised password/email is given an error messgae is returned with a status of 401 ", async () => {
        const response = await request(app)
            .post("/login")
            .set("Accept", "application/json")
            .send(unauthorizedAccountInput);

        expect(response.status).toBe(401);
        expect(response.body).toEqual(unauthorizedEmailPasswordMessage);

        //tests firebase method calls for creating a user
        expect(firebase.auth).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            unauthorizedAccountInput.email,
            unauthorizedAccountInput.password
        );
    });
});
