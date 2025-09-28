// src/services/bookService.test.js

// Using CommonJS require to match the module.exports in bookService.js
const { fetchApi } = require('./bookService');

// --- MOCK DATA FOR DEFAULT (BEFORE EACH) ---
// This smaller object is needed because your beforeEach function currently
// tries to access an undefined 'mockSuccessData'
const mockSuccessData = {
  kind: 'books#volumes',
  totalItems: 2,
  items: [
    { id: '1A', volumeInfo: { title: 'Mock Book 1' } },
    { id: '2B', volumeInfo: { title: 'Mock Book 2' } },
  ],
};

// --- MOCK DATA FOR 100 BOOKS TEST ---
// FIX: The 'export' is removed as it caused a SyntaxError.
const mockSuccessData100 = {
  kind: 'books#volumes',
  totalItems: 100, // Explicitly set to 100 for test verification
  items: [
    // --- 1. CLASSIC LITERATURE (First 40 books are real titles for good data) ---
    {
      id: '1',
      volumeInfo: {
        title: '1984',
        authors: ['George Orwell'],
        description: 'A dystopian social science fiction novel.',
        publishedDate: '1949',
      },
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Pride and Prejudice',
        authors: ['Jane Austen'],
        description: 'A romantic novel of manners written by Jane Austen.',
        publishedDate: '1813',
      },
    },
    {
      id: '3',
      volumeInfo: {
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee'],
        description:
          'Told through the eyes of Scout Finch, it examines racial injustice in the Deep South.',
        publishedDate: '1960',
      },
    },
    {
      id: '4',
      volumeInfo: {
        title: 'The Great Gatsby',
        authors: ['F. Scott Fitzgerald'],
        description:
          'A portrait of the Jazz Age, exploring themes of decadence and idealism.',
        publishedDate: '1925',
      },
    },
    {
      id: '5',
      volumeInfo: {
        title: 'Moby Dick',
        authors: ['Herman Melville'],
        description:
          'The saga of Captain Ahab and his obsession with a white whale.',
        publishedDate: '1851',
      },
    },
    {
      id: '6',
      volumeInfo: {
        title: 'War and Peace',
        authors: ['Leo Tolstoy'],
        description: 'An epic novel chronicling the French invasion of Russia.',
        publishedDate: '1869',
      },
    },
    {
      id: '7',
      volumeInfo: {
        title: 'The Odyssey',
        authors: ['Homer'],
        description: 'The journey of Greek hero Odysseus after the Trojan War.',
        publishedDate: 'BC 8th Century',
      },
    },
    {
      id: '8',
      volumeInfo: {
        title: 'Jane Eyre',
        authors: ['Charlotte Brontë'],
        description:
          'The story of a young governess finding love and independence.',
        publishedDate: '1847',
      },
    },
    {
      id: '9',
      volumeInfo: {
        title: 'Wuthering Heights',
        authors: ['Emily Brontë'],
        description: 'A dark tale of passion and revenge on the English moors.',
        publishedDate: '1847',
      },
    },
    {
      id: '10',
      volumeInfo: {
        title: 'Crime and Punishment',
        authors: ['Fyodor Dostoevsky'],
        description:
          'A psychological novel about a student who plots to kill an unscrupulous pawnbroker.',
        publishedDate: '1866',
      },
    },

    {
      id: '11',
      volumeInfo: {
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
        description: 'The first quest of Bilbo Baggins.',
        publishedDate: '1937',
      },
    },
    {
      id: '12',
      volumeInfo: {
        title: 'A Game of Thrones',
        authors: ['George R.R. Martin'],
        description: 'Book one of A Song of Ice and Fire.',
        publishedDate: '1996',
      },
    },
    {
      id: '13',
      volumeInfo: {
        title: 'Dune',
        authors: ['Frank Herbert'],
        description:
          'Set on the desert planet Arrakis, a rich blend of adventure and mysticism.',
        publishedDate: '1965',
      },
    },
    {
      id: '14',
      volumeInfo: {
        title: "The Hitchhiker's Guide to the Galaxy",
        authors: ['Douglas Adams'],
        description: 'A comedic space opera.',
        publishedDate: '1979',
      },
    },
    {
      id: '15',
      volumeInfo: {
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ['J.K. Rowling'],
        description: "The start of the young wizard's journey.",
        publishedDate: '1997',
      },
    },
    {
      id: '16',
      volumeInfo: {
        title: 'Foundation',
        authors: ['Isaac Asimov'],
        description: 'The story of the decline of a galactic empire.',
        publishedDate: '1951',
      },
    },
    {
      id: '17',
      volumeInfo: {
        title: 'Neuromancer',
        authors: ['William Gibson'],
        description: 'The first novel in the cyberpunk genre.',
        publishedDate: '1984',
      },
    },
    {
      id: '18',
      volumeInfo: {
        title: 'Children of Blood and Bone',
        authors: ['Tomi Adeyemi'],
        description:
          'A young adult fantasy inspired by West African mythology.',
        publishedDate: '2018',
      },
    },
    {
      id: '19',
      volumeInfo: {
        title: 'Name of the Wind',
        authors: ['Patrick Rothfuss'],
        description: 'The first book of The Kingkiller Chronicle.',
        publishedDate: '2007',
      },
    },
    {
      id: '20',
      volumeInfo: {
        title: 'Mistborn: The Final Empire',
        authors: ['Brandon Sanderson'],
        description: 'A unique fantasy world where magic is drawn from metals.',
        publishedDate: '2006',
      },
    },

    {
      id: '21',
      volumeInfo: {
        title: 'Where the Crawdads Sing',
        authors: ['Delia Owens'],
        description: 'A coming-of-age story that is also a murder mystery.',
        publishedDate: '2018',
      },
    },
    {
      id: '22',
      volumeInfo: {
        title: 'The Vanishing Half',
        authors: ['Brit Bennett'],
        description:
          'Identical twin sisters choose to live radically different lives.',
        publishedDate: '2020',
      },
    },
    {
      id: '23',
      volumeInfo: {
        title: 'Project Hail Mary',
        authors: ['Andy Weir'],
        description: "A lone astronaut is humanity's last hope.",
        publishedDate: '2021',
      },
    },
    {
      id: '24',
      volumeInfo: {
        title: 'The Midnight Library',
        authors: ['Matt Haig'],
        description:
          'A woman gets a chance to explore all the lives she could have lived.',
        publishedDate: '2020',
      },
    },
    {
      id: '25',
      volumeInfo: {
        title: 'Educated',
        authors: ['Tara Westover'],
        description:
          'A memoir of a woman who overcame her survivalist family to earn a Ph.D.',
        publishedDate: '2018',
      },
    },
    {
      id: '26',
      volumeInfo: {
        title: 'Circe',
        authors: ['Madeline Miller'],
        description:
          'A novel about the mythical sorceress Circe of the Odyssey.',
        publishedDate: '2018',
      },
    },
    {
      id: '27',
      volumeInfo: {
        title: 'Pachinko',
        authors: ['Min Jin Lee'],
        description:
          'A sweeping saga about a Korean family that immigrates to Japan.',
        publishedDate: '2017',
      },
    },
    {
      id: '28',
      volumeInfo: {
        title: 'The Silent Patient',
        authors: ['Alex Michaelides'],
        description: null,
        publishedDate: '2019',
      },
    }, // Test case for null description
    {
      id: '29',
      volumeInfo: {
        title: 'The Gilded Wolves',
        authors: ['Roshani Chokshi'],
        description: 'A race for a mythical artifact in 1889 Paris.',
        publishedDate: '2019',
        imageLinks: { thumbnail: 'https://test.image.link/book29' },
      },
    },
    {
      id: '30',
      volumeInfo: {
        title: 'The Secret History',
        authors: ['Donna Tartt'],
        description:
          'A group of classics students in Vermont engage in a tragedy.',
        publishedDate: '1992',
      },
    },

    {
      id: '31',
      volumeInfo: {
        title: 'The Pragmatic Programmer',
        authors: ['David Thomas', 'Andrew Hunt'],
        description: 'Advice for improving software development process.',
        publishedDate: '1999',
      },
    },
    {
      id: '32',
      volumeInfo: {
        title: 'Clean Code',
        authors: ['Robert C. Martin'],
        description: 'A handbook of agile software craftsmanship.',
        publishedDate: '2008',
      },
    },
    {
      id: '33',
      volumeInfo: {
        title: 'Design Patterns',
        authors: [
          'Erich Gamma',
          'Richard Helm',
          'Ralph Johnson',
          'John Vlissides',
        ],
        description: 'Elements of Reusable Object-Oriented Software.',
        publishedDate: '1994',
      },
    },
    {
      id: '34',
      volumeInfo: {
        title: 'Sapiens',
        authors: ['Yuval Noah Harari'],
        description: 'A brief history of humankind.',
        publishedDate: '2011',
      },
    },
    {
      id: '35',
      volumeInfo: {
        title: 'Atomic Habits',
        authors: ['James Clear'],
        description:
          'An easy & proven way to build good habits & break bad ones.',
        publishedDate: '2018',
      },
    },
    {
      id: '36',
      volumeInfo: {
        title: 'Thinking, Fast and Slow',
        authors: ['Daniel Kahneman'],
        description: 'The two systems that drive the way we think.',
        publishedDate: '2011',
      },
    },
    {
      id: '37',
      volumeInfo: {
        title: 'The Fifth Risk',
        authors: ['Michael Lewis'],
        description:
          'Explores the risk posed by the transition of presidential power.',
        publishedDate: '2018',
      },
    },
    {
      id: '38',
      volumeInfo: {
        title: 'JavaScript: The Good Parts',
        authors: ['Douglas Crockford'],
        description:
          'The definitive guide to the essential features of JavaScript.',
        publishedDate: '2008',
      },
    },
    {
      id: '39',
      volumeInfo: {
        title: 'Eloquent JavaScript',
        authors: ['Marijn Haverbeke'],
        description: 'A modern introduction to programming.',
        publishedDate: '2011',
      },
    },
    {
      id: '40',
      volumeInfo: {
        title: 'The Lean Startup',
        authors: ['Eric Ries'],
        description: "How Today's Entrepreneurs Use Continuous Innovation.",
        publishedDate: '2011',
      },
    },

    // --- 5. REMAINDER (Generated placeholder items to reach 100) ---
    ...Array.from({ length: 60 }, (_, i) => ({
      id: String(i + 41),
      volumeInfo: {
        title: `Mock Book Title ${i + 41}`,
        authors: [`Author ${i + 41}`],
        description: `This is a generated placeholder description for book number ${i + 41}.`,
        publishedDate: String(2000 + (i % 20)),
        ...(i % 5 === 0 && {
          imageLinks: {
            thumbnail: `https://test.image.link/book${i + 41}`,
          },
        }),
      },
    })),
  ],
};

const mockFetchFailResponse = {
  // Simulates the response object if it fails the 'response.ok' check
  ok: false,
  status: 404,
  statusText: 'Not Found',
};

// Spy on the global fetch function
let fetchSpy;

describe('fetchApi', () => {
  // Set up and restore the spy for each test
  beforeEach(() => {
    // Spy on global.fetch and do not call the original implementation
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
      // Default mock implementation to satisfy all tests unless overridden
      Promise.resolve({
        ok: true,
        // FIX: Use the small mockSuccessData for the default implementation
        json: () => Promise.resolve(mockSuccessData),
        status: 200,
      })
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore(); // Restore the original fetch after each test
  });

  // --- TEST CASE 1: Successful Data Fetch (200 OK) ---
  test('should return data on a successful fetch', async () => {
    // Test case using the default mockSuccessData
    const data = await fetchApi('intitle:', 'react');

    // Check if fetch was called with the correct URL
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://www.googleapis.com/books/v1/volumes?q=intitle:react'
    );
    // Verify the function returns the default mock data
    expect(data).toEqual(mockSuccessData);
  });

  // --- TEST CASE 1b: Successful Fetch with 100 Items ---
  test('should handle a successful fetch with 100 items', async () => {
    // Override the mock for this specific test
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessData100),
        status: 200,
      })
    );

    const data = await fetchApi('intitle:', 'large_query');

    // Verify the function handles the large dataset
    expect(data.totalItems).toBe(100);
    expect(data.items).toHaveLength(100);
    expect(data.items[0].volumeInfo.title).toBe('1984');
  });

  // --- TEST CASE 2: No Results Found (200 OK, but empty data is a different mock) ---
  test('should return data structure when API returns no items', async () => {
    // Custom mock for this test: empty items array
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ totalItems: 0, items: [] }),
        status: 200,
      })
    );
    const data = await fetchApi('intitle:', 'gibberish');
    expect(data.totalItems).toBe(0);
    expect(data.items).toEqual([]);
  });

  // --- TEST CASE 3: HTTP Error (404 Not Found) ---
  test('should log error and return null on an HTTP error', async () => {
    // Mock the response to fail the 'response.ok' check in fetchApi
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve(mockFetchFailResponse)
    );

    // Spy on console.error to check that the error is logged internally
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const data = await fetchApi('intitle:', 'error');

    // Verify the function handled the error by returning null
    expect(data).toBeNull();
    // Verify that the error was logged to the console
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Fetch operation failed ',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
