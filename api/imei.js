export default async function handler(req, res) {
  // Enable CORS (optional, but good for testing)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Get IMEI from query parameter
  const { imei } = req.query;
  if (!imei) {
    return res.status(400).json({ error: 'Missing imei parameter' });
  }

  try {
    // Fetch data from the original API
    const originalUrl = `https://xc.taitaninfo.workers.dev/?imei=${encodeURIComponent(imei)}`;
    const response = await fetch(originalUrl);
    const data = await response.json();

    // Modify the credit section
    if (data.credit) {
      data.credit.owner = "@Akash_Exploits_bot";
      data.credit.channel = "@Akash_Exploits_bot";
    }

    // Return the modified JSON
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
