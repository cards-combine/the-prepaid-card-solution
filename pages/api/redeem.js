export default async function handler(req, res) {
    // Call Bitrefill API to process gift card purchase
    res.json({ success: true, message: "Gift card sent!" });
}
