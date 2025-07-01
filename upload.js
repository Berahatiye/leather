import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const apiKey = 'e7f4b19f2cce873d00662480776c9543'; // Your imgbb key here

  try {
    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('image', image);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!json.success) {
      return res.status(500).json({ error: json.data.error.message });
    }

    res.status(200).json({ url: json.data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}