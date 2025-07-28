/* global afterEach,  jest */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

import React from 'react';

/* global test, expect, describe */

describe('Cart integration', () => {
  test('updates cart when adding a product', async () => {
    window.history.pushState({}, '', '/products');
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Wait for product cards to appear
    const productCards = await screen.findAllByTestId('product-card');
    // Find the first Add to Cart button
    const addToCartButton = within(productCards[0]).getByRole('button', { name: /Add to Cart/i });
    // Simulate clicking Add to Cart
    fireEvent.click(addToCartButton);
    // Open the cart modal
    const viewCartButton = screen.getByRole('button', { name: /View Cart/i });
    fireEvent.click(viewCartButton);
    // Assert that the cart contains the product
    const cartItems = await screen.findAllByTestId('cart-item');
    expect(cartItems.length).toBeGreaterThan(0);
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

  // No Firebase app.delete() needed for web SDK
});
