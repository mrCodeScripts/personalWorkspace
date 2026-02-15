export default async function sendData() {
    const payload = {count: 1};
    const requestInit = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)};
    const res = await fetch('http://localhost:3001/api/randomData', requestInit);
    const data = await res.json();
    return data;
};

