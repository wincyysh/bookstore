/**
 * @fileoverview fetch google api
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 1.0.0
 * @license MIT
 */

/**
 * Fetches data from a given API URL.
 * @param {string} para - The query parameter for the API.
 * @returns {Promise<object | null>} A description of the return value.
 */
export async function fetchApi(para) {
  const basicUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  const url = basicUrl + para;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch operation failed ', error);
    return null;
  }
}
