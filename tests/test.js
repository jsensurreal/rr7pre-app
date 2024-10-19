// Run with: node tests/test.js

import axios from 'axios';

let errorCount = 0;
const url = 'http://localhost:5173/api/users'; // Replace with your actual endpoint
const numberOfRequests = 100; // Number of concurrent requests
const searchTerms = Array.from({ length: numberOfRequests }, () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
});

async function sendPostRequest(search) {
  try {
    const response = await axios.post(url, new URLSearchParams({ search }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log(`Response for search "${search}":`, response.data.users?.length || 0);
  } catch (error) {
    console.error(`Error for search "${search}":`, ++errorCount, error.code);
  }
}

async function testConcurrentPosts() {
  const promises = [];
  for (let i = 0; i < numberOfRequests; i++) {
    promises.push(sendPostRequest(searchTerms[i]));
  }
  await Promise.all(promises);
  console.log(`All ${numberOfRequests} requests completed, with ${errorCount} errors.`);
}

testConcurrentPosts();