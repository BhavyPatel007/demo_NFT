import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [getData, setGetData] = useState([]);
  const [connectWallet, setConnectWallet] = useState();
  const getETH = localStorage.getItem("eth");

  const handleConnectWallet = () => {
    if (window) {
      if (window.ethereum || getETH) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            setConnectWallet(res);
            localStorage.setItem("eth", res);
          });
      } else {
        alert("install metamask extension!!");
        window.open(
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
          "_blank"
        );
      }
    }
  };

  useEffect(() => {
    if (window?.ethereum?.selectedAddress) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(
        "https://api.opensea.io/api/v1/collections?offset=0&limit=300",
        options
      )
        .then((response) => response.json())
        .then((response) => setGetData(response.collections))
        .catch((err) => console.error(err));
      setConnectWallet(getETH);
    } else {
      localStorage.setItem("eth", "");
      setConnectWallet("");
    }
  }, [connectWallet]);

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "60px",
          background: "black",
          color: "antiquewhite",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <header
          style={{ paddingLeft: "15px", fontSize: "27px", fontWeight: "600" }}
        >
          NEFTY Showcase
        </header>
        <button
          style={{
            marginRight: "15px",
            backgroundColor: "white",
            border: "none",
            padding: "10px 25px",
            borderRadius: "15px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow:
              "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
          }}
          onClick={() => handleConnectWallet()}
        >
          {!getETH ? "Connect wallet" : getETH}
        </button>
      </div>
      <div style={{ display: "flex", background: "#3765c4", flexWrap: "wrap" }}>
        {connectWallet ? (
          getData.length ? (
            getData.map((item) =>
              !!item.image_url ? (
                <div
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    transition: "0.3s",
                    borderRadius: "5px",
                    width: "fit-content",
                    margin: "10px 15px",
                    background: "papayawhip",
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: "-webkit-fill-available",
                      borderRadius: "5px 5px 0 0",
                    }}
                    height="200"
                  />
                  <div style={{ padding: "2px 16px" }}>
                    <h4>
                      <b>{item.name}</b>
                    </h4>
                  </div>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <span
              style={{
                background: "white",
                width: "100%",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
            >
              Loading...
            </span>
          )
        ) : (
          <span
            style={{
              background: "white",
              width: "100%",
              alignItems: "center",
              textAlign: "center",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              height: "90vh",
              fontSize: "24px",
            }}
          >
            Please connect your wallet to show NFT's
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
