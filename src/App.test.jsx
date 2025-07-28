// Mock window.alert and fetch to prevent jsdom errors and provide product data
beforeAll(() => {
  window.alert = jest.fn();
  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        products: [
          {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            category: 'Test Category',
            image: 'test.jpg',
          },
        ],
      }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
  cleanup();
  if (window.sessionStorage) {
    window.sessionStorage.clear();
  }
  // Restore window.fetch and window.alert to prevent side effects
  if (window.fetch && window.fetch.mockRestore) window.fetch.mockRestore();
  if (window.alert && window.alert.mockRestore) window.alert.mockRestore();
});
// Mock Firebase Auth module to prevent leaks and errors
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
}));
// Mock Firestore to prevent real network connections
// The Firestore mock is now globally mocked in jest.setup.cjs
import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';
/* global it, expect, afterEach, beforeAll, jest */

it('renders Home link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();
});

// ****************************************
//Test to check if the app renders Products cards
it('renders product cards', async () => {
  window.history.pushState({}, '', '/products');
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const productCards = await screen.findAllByTestId('product-card');
  expect(productCards.length).toBeGreaterThan(0);
});

// Duplicate afterEach removed
