// npm install firebase-admin
const admin = require("firebase-admin");
admin.initializeApp({ credential: admin.credential.cert(require("./serviceAccountKey.json")) });
const db = admin.firestore();

app.post("/api/record-efc-payment", async (req, res) => {
  const { txHash, from, to, amount, ref, blockNumber } = req.body;
  await db.collection("efc_payments").doc(txHash).set({
    type: "EFC",
    txHash, from, to, amount, ref, blockNumber,
    status: "confirmed",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  res.json({ ok: true });
});

// Add this inside your existing /api/verify-payment route, right where the
// comment says "Payment is real and confirmed. Do your fulfillment here":
await db.collection("bank_payments").doc(String(tx.id)).set({
  type: "BANK",
  txRef: tx.tx_ref,
  amount: tx.amount,
  currency: tx.currency,
  customerEmail: tx.customer.email,
  status: "confirmed",
  createdAt: admin.firestore.FieldValue.serverTimestamp()
});
