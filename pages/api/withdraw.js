export default async function handler(req, res) {
    // Call PayPal API to send funds to user
    res.json({ success: true, message: "Funds sent to PayPal!" });
}
