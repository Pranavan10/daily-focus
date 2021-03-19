const mockDatabaseLocation = {
    update: jest.fn(() => ({})),
};

const mockDatabase = {
    ref: jest.fn(() => mockDatabaseLocation),
};

module.exports = mockDatabase;
