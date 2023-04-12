import React, {useState, useEffect} from "react";
import Store from "./Store.js";
import getBlockchain from "./ethereum";

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const {paymentProcessor, dai} = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  }, []);

  if(typeof window.ethereum === 'underfined') {
    return (
      <div className="container" style={{margin:[0, "auto"], textAlign:"left", width:1600}}>
        <div className="col-sm-12">
          <h1>CrtypTV</h1>
          <p>You need to install the latest version of Metamask</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{margin:[0, "auto"], textAlign:"center", width:1600, backgroundColor:"lightgray"}}>
      <div className="col-sm-12">
        <h1 style={{margin:20, marginBottom:40}}>
          <b><u>CrtypTV</u></b>
          </h1>
        <Store paymentProcessor={ paymentProcessor } dai={ dai } />
      </div>
    </div>
  );
}

export default App;
