type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const makeRequest = async (url: string, method: RequestMethod, body?: any) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

export default makeRequest;