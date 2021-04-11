import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";
import LoadingAnimation from "./LoadingAnimation";

const NFT = ({ address, web3 }) => {
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState(null);
  const [top5, setTop5] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = {
      query: `
        {
          tokens {
            id
          }
        }`,
    };

    const url = "https://api.thegraph.com/subgraphs/name/sksuryan/baby-shark";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(query),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setTokens(data.data.tokens))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (tokens.length) setTokenName(tokens[0].id);
  }, [tokens]);

  useEffect(() => {
    if (tokenName) {
      const query = {
        query: `{ symbols(orderBy: totalDeposit, orderDirection: desc, first: 5, where: {symbol: "${tokenName}"}) { id totalDeposit symbol user eligibleForNFT } }`,
      };

      const url = "https://api.thegraph.com/subgraphs/name/sksuryan/baby-shark";
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(query),
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setTop5(data.data.symbols);
        })
        .catch((err) => console.log(err));
    }
  }, [tokenName]);

  // useEffect(() => {
  //   if (top5.length && address) {
  //     const users = top5.map((elt) => elt.user);
  //     if (users.indexOf(address) !== -1) setClaimNFT(true);
  //     else setClaimNFT(false);
  //   }
  // }, [top5, address]);

  const claimMyNFT = async (e) => {
    e.preventDefault();
    setLoading(true);

    const _oracle = `0x67890F4627D46E099fE490fF9D8ac1Cf5290b1F0`;
    const _jobId = `0f79687897bc48b8928bd133a52042e2`;
    const _tokenSymbol = tokenName;
    const APIConsumerAddress = `0x20750a5ae430225B41789e03a8b5889b5c9d5E70`;
    const APIConsumerABI = [
      {
        inputs: [
          { internalType: "address", name: "_oracle", type: "address" },
          { internalType: "string", name: "_jobId", type: "string" },
          { internalType: "string", name: "_tokenSymbol", type: "string" },
        ],
        name: "requestNFTClaim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    try {
      const con = new web3.eth.Contract(APIConsumerABI, APIConsumerAddress);

      const tx = await con.methods
        .requestNFTClaim(_oracle, _jobId, _tokenSymbol)
        .send({ from: address });

      const details = [{ key: "NFT Request", value: "Successfully sent" }];

      history.push({
        pathname: "/complete",
        state: {
          response: tx,
          details,
        },
      });
    } catch (error) {
      const details = [{ key: "NFT Request", value: "Failed" }];

      history.push({
        pathname: "/complete",
        state: {
          response: { ...error, status: false, from: address },
          details,
        },
      });
      console.log(error);
    }
  };

  return !loading ? (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="selectTokens" id="dropdown-basic">
            {tokenName ? tokenName : "Select"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {tokens.map((elt, key) => (
              <Dropdown.Item
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  setTokenName(elt.id);
                }}
                key={key}
              >
                {elt.id}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="w-50 mx-auto mt-5 text-light">
        <table className="table text-light">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Total Deposit</th>
              <th scope="col">Claim NFTs</th>
            </tr>
          </thead>
          <tbody>
            {top5.map((elt, key) => (
              <tr key={key}>
                <th scope="row">{elt.user}</th>
                <td>{elt.totalDeposit}</td>
                <td>
                  <button
                    className={
                      elt.user === address
                        ? "btn btn-success"
                        : "btn btn-secondary"
                    }
                    disabled={elt.user !== address}
                    onClick={claimMyNFT}
                  >
                    Claim!
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <LoadingAnimation height="40px" color="white" />
  );
};

export default NFT;
