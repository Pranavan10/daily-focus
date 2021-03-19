const mockToken = {
    token: "mockToken",
};
const mockUid = "mockUid";

const shortPasswordErrorMessage = {
    message: "Password should be at least 6 characters",
};
const invalidEmailErrorMessage = {
    message: "The email address is badly formatted.",
};

const mockCreateUserWithEmailAndPassword = jest.fn((inputEmail, inputPassword) => {
    if (inputPassword.length < 6) {
        return Promise.reject(new Error(shortPasswordErrorMessage.message));
    } else if (inputEmail.length == 0) {
        return Promise.reject(new Error(invalidEmailErrorMessage.message));
    } else {
        return Promise.resolve(mockUserData);
    }
});

const mockUserData = {
    user: {
        uid: mockUid,
        getIdToken: jest.fn(() => Promise.resolve(mockToken.token)),
    },
};

const mockAuthObject = {
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
};

const mockFirebase = {
    auth: jest.fn(() => mockAuthObject),
    initializeApp: jest.fn(({}) => ({})),
};

module.exports = {
    mockFirebase,
    mockToken,
    mockUid,
    shortPasswordErrorMessage,
    invalidEmailErrorMessage,
};
