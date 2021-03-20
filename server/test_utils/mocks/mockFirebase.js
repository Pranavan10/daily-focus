const mockToken = {
    token: "mockToken",
};
const mockUid = "mockUid";

const mockVerifiedIdToken = {
    user_id: mockUid,
};

const shortPasswordErrorMessage = {
    message: "Password should be at least 6 characters",
};
const invalidEmailErrorMessage = {
    message: "The email address is badly formatted.",
};
const unauthorizedEmailPasswordMessage = {
    message: "Either your email or password is incorrect",
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

const mockSignInWithEmailAndPassword = jest.fn((inputEmail, inputPassword) => {
    const validLogin = {
        email: "test@gmail.com",
        password: "123456",
    };
    if (inputEmail == validLogin.email && inputPassword == validLogin.password) {
        return Promise.resolve(mockUserData);
    } else {
        return Promise.reject(unauthorizedEmailPasswordMessage);
    }
});

const mockVerifyIdToken = jest.fn((idToken) => {
    return Promise.resolve(mockVerifiedIdToken);
});

const mockUserData = {
    user: {
        uid: mockUid,
        getIdToken: jest.fn(() => Promise.resolve(mockToken.token)),
    },
};

const mockAuthObject = {
    createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    verifyIdToken: mockVerifyIdToken,
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
    unauthorizedEmailPasswordMessage,
};
