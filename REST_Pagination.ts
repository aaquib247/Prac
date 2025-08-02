import fetch from 'node-fetch';

async function getUsernames(): Promise<string[]> {
  const response = await fetch('https://jsonmock.hackerrank.com/api/users?page=1');
  const json = await response.json() as User[];

  const users = json;
  const usernames = users.map((user: any) => user.first_name);

  return usernames;
}

// Example: Output result (optional, not for HackerRank)
getUsernames().then(console.log).catch(console.error);

type User = {
    id: number;
    first_name: string;
    age: number;
  };
  
