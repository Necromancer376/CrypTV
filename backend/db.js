const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://malhar2110:thispasstemp@blockchainproject.afdfbrn.mongodb.net/test",
    {},
    {userNewUrlParser: true, useUnifiedTopology: true}
);

const paymentSchema = new mongoose.Schema(
    {
        id: String,
        itemId: String,
        paymentDone: Boolean
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
    Payment
}