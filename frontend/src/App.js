import React, { useState } from "react";
import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function App() {
  const [name, setName] = useState("Mehul");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const apiData = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 10,
      }),
    }).then((pay) => pay.json());
    console.log(new Date(apiData.createdAt));

    var options = {
      key: "rzp_test_Sf6zqng6XmjVZ8",
      amount: apiData.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "http://localhost:5000/logo.svg",
      order_id: apiData.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        //TODO:Store the payment details in firebase or any other database
      },
      prefill: {
        name:"Praveen"
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="App-link"
          onClick={displayRazorpay}
        >
          PAY
        </button>
      </header>
    </div>
  );
}

export default App;
