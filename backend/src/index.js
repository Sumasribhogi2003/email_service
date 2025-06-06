const express = require('express');
const cors = require('cors');        // <-- add this
const EmailService = require('./services/EmailService');

const app = express();
const emailService = new EmailService();

app.use(cors());                    
app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const result = await emailService.sendEmail(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Email sending failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Email service running on port ${PORT}`));
