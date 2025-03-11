import axios from "axios";

export default async function handler(req, res) {
    const { amount, cardDetails } = req.body;

    const response = await axios.post("https://api.pinpayments.com/1/charges", {
        amount: amount * 100,
        currency: "AUD",
        card: cardDetails
    }, { auth: { username: "your-pin-payments-key", password: "" } });

    if (response.data.error) return res.status(400).json({ error: response.data.error });
    return res.json({ success: true });
}
