import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import styles from "../../styles/TransactionComplete.module.sass";
import CheckAnimation from "../../assets/animations/1798-check-animation.json";
import CrossAnimation from "../../assets/animations/4970-unapproved-cross.json";

const TransactionComplete = () => {
  const history = useHistory();
  let response, details, newPool;
  let defaultOptions;

  try {
    response = history.location.state.response;
    details = history.location.state.details;
    newPool = history.location.state.newPool;

    defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: response.status ? CheckAnimation : CrossAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  } catch (e) {
    history.push({
      pathname: "/",
    });
  }

  return history.location.state ? (
    <div className={styles.container}>
      <div>
        <div className={styles.animationContainer}>
          <div>
            <Lottie options={defaultOptions} height={132} width={132} />
          </div>
          <p>
            {response.status ? "Transaction Complete" : "Transaction Failed"}
          </p>
        </div>
        <div className={styles.detailsContainer}>
          <p>
            From:
            <span className={styles.value}>{response.from}</span>
          </p>
          {response.status && (
            <p>
              To:
              <span className={styles.value}>{response.to}</span>
            </p>
          )}
          <p>
            Status:
            <span className={styles.value}>
              {response.status ? "Success" : "Failed"}
            </span>
          </p>
          {details.map((option, id) => (
            <p key={id}>
              {option.key}:<span className={styles.value}>{option.value}</span>
            </p>
          ))}
          {response.status && (
            <p>
              Gas used:
              <span className={styles.value}>{response.gasUsed} wei</span>
            </p>
          )}
          {newPool && <p>Please save your Private Key for further use.</p>}
          <Link to="/">
            <button className={styles.home}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TransactionComplete;
