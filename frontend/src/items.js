import { ethers } from 'ethers';


const items = [
    {
        id: 1, 
        url: "http://game1",
        price: ethers.utils.parseEther('100'),
        image: "/images/img1.jpg"
    },
    {
        id: 2, 
        url: "http://game1",
        price: ethers.utils.parseEther('200'),
        image: "/images/img2.jpg"
    },
    {
        id: 3, 
        url: "http://game1",
        price: ethers.utils.parseEther('100'),
        image: "/images/img3.jpg"
    },
    {
        id: 3, 
        url: "http://game1",
        price: ethers.utils.parseEther('400'),
        image: "/images/img4.jpg"
    },
    {
        id: 3, 
        url: "http://game1",
        price: ethers.utils.parseEther('200'),
        image: "/images/img5.jpg"
    },
    {
        id: 3, 
        url: "http://game1",
        price: ethers.utils.parseEther('500'),
        image: "/images/img6.jpg"
    },
]


export { items };