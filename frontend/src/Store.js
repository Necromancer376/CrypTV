import React from "react";
import { ethers } from 'ethers';
import axios from 'axios';
import { items } from './items.js';
import './Store.css';


const API_URL = "http://localhost:4000";

// const ITEMS = [
//     {
//         id: 1,
//         price: ethers.utils.parseEther('100')
//     },
//     {
//         id: 2,
//         price: ethers.utils.parseEther('100')
//     },
//     {
//         id: 3,
//         price: ethers.utils.parseEther('400')
//     },
//     {
//         id: 4,
//         price: ethers.utils.parseEther('200')
//     }
// ];

const ITEMS = [
    {
        id: 1, 
        url: "http://Avatar",
        price: ethers.utils.parseEther('100'),
        image: "/images/img1.jpg"
    },
    {
        id: 2, 
        url: "http://1917",
        price: ethers.utils.parseEther('200'),
        image: "/images/img2.jpg"
    },
    {
        id: 3, 
        url: "http://Deewar",
        price: ethers.utils.parseEther('100'),
        image: "/images/img3.jpg"
    },
    {
        id: 4, 
        url: "http://LaLiga",
        price: ethers.utils.parseEther('400'),
        image: "/images/img4.jpg"
    },
    {
        id: 5, 
        url: "http://IndVsPak",
        price: ethers.utils.parseEther('200'),
        image: "/images/img5.jpg"
    },
    {
        id: 6, 
        url: "http://LordOfTheRings",
        price: ethers.utils.parseEther('500'),
        image: "/images/img6.jpg"
    },
];


console.log(ITEMS);

function Store({ paymentProcessor, dai }) {

    const buy = async item => {
        const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`);
        const tx1 = await dai.approve(paymentProcessor.address, item.price);
        await tx1.wait();

        const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId);
        await tx2.wait();

        await new Promise(resolve => setTimeout(resolve, 10000));

        const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`);
        console.log(response2);
        window.location.href = "http://127.0.0.1:8081/video.html";
        window.alert(response2.data.url);
    };
    
    return (
        // <div className="container">
        //   {cells}
        // </div>
        <div style={{display:"flex", margin:[0, "auto"], textAlign:"center", width:1600, paddingLeft:400, paddingRight:400}}>
            <ul className="list-group" style={{flex:1, margin:10}}>
                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[0].image } width="200" height="200" style={{padding:5}}></img>
                    </div>
                    Avatar<span className="front-weight-bold">100 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[0])} >
                            Buy
                        </button>
                    </div>
                </li>

                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[1].image} width="200" height="200" style={{padding:5}}></img>
                    </div>
                    1917<span className="front-weight-bold">150 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[1])} >
                            Buy
                        </button>
                    </div>
                </li>
            </ul>
            <ul className="list-group" style={{flex:1, margin:10}}>
                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[2].image } width="200" height="200" style={{padding:5}}></img>
                    </div>
                    Deewar<span className="front-weight-bold">100 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[2])} >
                            Buy
                        </button>
                    </div>
                </li>

                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[3].image} width="200" height="200" style={{padding:5}}></img>
                    </div>
                    LaLiga<span className="front-weight-bold">50 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[3])} >
                            Buy
                        </button>
                    </div>
                </li>
            </ul>
            
            <ul className="list-group" style={{flex:1, margin:10}}>
                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[4].image } width="200" height="200" style={{padding:5}}></img>
                    </div>
                    Ind vs Pak<span className="front-weight-bold">100 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[4])} >
                            Buy
                        </button>
                    </div>
                </li>

                <li className="list-group" style={ { width:250, alignItems:"center", textAlign:"center", backgroundColor:"grey", margin:5}}>
                    <div>
                        <img src={ITEMS[5].image} width="200" height="200" style={{padding:5}}></img>
                    </div>
                    Lord of the Rings<span className="front-weight-bold">150 DAI</span>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => buy(ITEMS[5])} >
                            Buy
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Store;