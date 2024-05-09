import { getFullYear, getFooterCopy, getLatestNotification } from './utils.js';

describe('getFullYear', () => {
  test('returns the correct year', () => {
    const currentYear = new Date().getFullYear();
    expect(getFullYear()).toEqual(currentYear);
  });
});

describe('getFooterCopy', () => {
  test('returns "Holberton School" when the argument is true', () => {
    expect(getFooterCopy(true)).toEqual('Holberton School');
  });

  test('returns "Holberton School main dashboard" when the argument is false', () => {
    expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
  });
});

describe('getLatestNotification', () => {
  test('returns the correct string', () => {
    // Assuming getLatestNotification always returns a specific string
    const expectedNotification = '<strong>Urgent requirement</strong> - complete by EOD';
    expect(getLatestNotification()).toEqual(expectedNotification);
  });
});