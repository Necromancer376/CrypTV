const Koa =  require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const ethers = require("ethers");
const PaymentProcessor = require("../frontend/src/contracts/PaymentProcessor.json");
// const itemslist = require("../frontend/src/items.js");
const { Payment } = require("./db.js");

const app = new Koa();
const router = new Router()

const items =  {
    '1': {
        id: 1, 
        url: "http://Avatar",
        price: ethers.utils.parseEther('100'),
        image: "/images/img1.jpg"
    },
    '2': {
        id: 2, 
        url: "http://1917",
        price: ethers.utils.parseEther('200'),
        image: "/images/img2.jpg"
    },
    '3': {
        id: 3, 
        url: "http://Deewar",
        price: ethers.utils.parseEther('100'),
        image: "/images/img3.jpg"
    },
    '4': {
        id: 4, 
        url: "http://LaLiga",
        price: ethers.utils.parseEther('400'),
        image: "/images/img4.jpg"
    },
    '5': {
        id: 5, 
        url: "http://IndVsPak",
        price: ethers.utils.parseEther('200'),
        image: "/images/img5.jpg"
    },
    '6': {
        id: 6, 
        url: "http://LordOfTheRings",
        price: ethers.utils.parseEther('500'),
        image: "/images/img6.jpg"
    },
};

router.get("/api/getPaymentID/:itemId", async ctx => {
    const paymentId = (Math.random() * 10000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: ctx.params.itemId,
        paymentDone: true
    });
    ctx.body = {
        paymentId
    };
});

router.get('/api/getItemUrl/:paymentID', async ctx => {
    const payment = await Payment.findOne({id: ctx.params.paymentID});

    console.log(payment);

    if(payment && payment.paymentDone == true) {
        ctx.body = {
            url: items[payment.itemId].url
        };
    }
    else {
        ctx.body = {
            url: ""
        };
    }
});



app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, () =>{
    console.log("Server running on port 4000");
});

const listenToEvent = () => {
    console.log("event");
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const networkId = "5777";

    const paymentProc = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    );

    paymentProc.on('PaymentDone', async (payer, amount, paymentId, date) => {
        // console.log("test");
        // console.log(`
        //     from ${payer} 
        //     amount ${amount} 
        //     paymentId ${paymentId} 
        //     date ${(new Date(date.toNumber() * 1000)).toLocaleString()}
        // `);

        const payment = await Payment.findOne({id: paymentId});

        if(payment) {
            console.log(payment);
            payment.paymentDone = true;
            await payment.save();
        }
    });    
}

listenToEvent();