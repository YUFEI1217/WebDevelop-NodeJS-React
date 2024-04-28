export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};
  
// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    WORD_MISSING: 'noSuchId', // Someone was inconsistent!
    INVALID_WORD: 'invalid-word',
};
  
export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};
  
export const MESSAGES = {
    // The [] below uses the variable value as the key
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    // Here we use 'dog' to simulate a bad password
    [SERVER.AUTH_INSUFFICIENT]: 'You are not a dog, please input correct username.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_WORD]: 'Please enter the word',
    [SERVER.INVALID_WORD]: 'You word includes some invalid letters or numbers',
    default: 'Something went wrong.  Please try again',
};