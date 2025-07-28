// Global Firestore mock to prevent async/gRPC leaks
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({
    docs: [
      {
        id: '1',
        data: () => ({
          title: 'Test Product',
          price: 10.99,
          category: 'Test Category',
          image: 'test.jpg',
        }),
      },
    ],
  })),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  initializeFirestore: jest.fn(),
  connectFirestoreEmulator: jest.fn(),
  onSnapshot: jest.fn(),
  runTransaction: jest.fn(),
  setDoc: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  Firestore: jest.fn(),
  Timestamp: jest.fn(),
  FieldValue: jest.fn(),
  QuerySnapshot: jest.fn(),
  DocumentSnapshot: jest.fn(),
  DocumentReference: jest.fn(),
  Query: jest.fn(),
  FirestoreError: jest.fn(),
}));
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const fetch = require('cross-fetch');
global.fetch = fetch;
global.Response = fetch.Response;
global.Request = fetch.Request;
global.Headers = fetch.Headers;
// Clear sessionStorage after each test to prevent leaks
afterEach(() => {
  if (global.sessionStorage) {
    global.sessionStorage.clear();
  }
});
