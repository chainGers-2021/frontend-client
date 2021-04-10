import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const NFT = () => {
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState(null);
  const [top5, setTop5] = useState([]);
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

  return (
    <>
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
      <div className="w-50 mx-auto mt-5 text-light">
        <table className="table text-light">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Total Deposit</th>
            </tr>
          </thead>
          <tbody>
            {top5.map((elt, key) => (
              <tr key={key}>
                <th scope="row">{elt.user}</th>
                <td>{elt.totalDeposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NFT;
