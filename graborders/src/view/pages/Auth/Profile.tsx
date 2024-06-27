import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/styles.css";
import { Link } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import Amount from "src/shared/Amount";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import Message from "src/view/shared/message";

function Profile() {
  const dispatch = useDispatch();
  const total = useSelector(selectors.selectTotal);
  const totalperday = useSelector(selectors.selectTotalPerday);

  useEffect(() => {
    const values = {
      status: "completed",
    };
    dispatch(actions.doCountDay());
    dispatch(actions.doFetch(values, values));
  }, [dispatch]);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };
  const history = useHistory();

  const goto = (param) => {
    history.push(param);
  };
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const data = [
    {
      icon: "fa-solid fa-clock-rotate-left",
      name: "Tasks History",
      url: "/order",
    },
    { icon: "fa-solid fa-wallet", name: "Bind Wallet", url: "/wallet" },
    {
      icon: "fa-solid fa-arrow-right-arrow-left",
      name: "Transactions",
      url: "/transacation",
    },
    {
      icon: "fa-solid fa-money-bill-transfer",
      name: "Withdraw",
      url: "/withdraw",
    },
    { icon: "fa-solid fa-user", name: "Profile", url: "/myprofile" },
    { icon: "fa-solid fa-lock", name: "Security", url: "/security" },
  ];
  const referenceCodeRef = useRef<any>(null);

  const couponCodeRef = useRef<any>(null);

  const copyToClipboard = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    // Check if the browser supports the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Copied");
          // You can add any additional logic here, such as showing a success message
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          // You can handle errors here, such as displaying an error message to the user
        });
    } else {
      // Fallback for browsers that do not support the modern clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied");

      // You can add any additional logic here for the fallback mechanism
    }
  };

  const copyToClipboardCoupon = () => {
    const referenceCode = couponCodeRef.current.innerText;

    // Check if the browser supports the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Copied");
          // You can add any additional logic here, such as showing a success message
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          // You can handle errors here, such as displaying an error message to the user
        });
    } else {
      // Fallback for browsers that do not support the modern clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied");

      // You can add any additional logic here for the fallback mechanism
    }
  };
  return (
    <div className="app__profile">
      {/* <div className="profile__arc">


        <div className="arc__header">
          <div className="arc__left">
        <img src="/icons/vip.png" alt=""  className="diamond__vip" /> 
          <div className="dashboard__title">{currentUser?.vip?.title}</div>
          </div>
          <div className="arc__right" onClick={()=> doSignout()}>
          <i className="fa-solid fa-right-from-bracket " style={{ color:"white", fontSize:30, cursor:'pointer'}}></i>
          </div>
        </div>
        <div className="dashboard__user">
          Hi, {currentUser?.fullName}!
        </div>

        <div className="dashbaord__balance">
        <label htmlFor="" className="label__balance">Total Balance</label>
        <span className="total__amount">{Amount.Dollar(currentUser?.balance)}</span>
        </div>

      </div>
      

      <div className="button__profile">
        <div className="send__money" onClick={() => goto("/online")}>
          <img src="/icons/send.svg" alt="" />
          Deposit Money
        </div>

        <div  className="receive_money" onClick={() => goto("/withdraw")}>
        <img src="/icons/request.svg" alt="" />
          Request Money
  
        </div>
   
      </div>

      <div className="profile__content">
        {data.map((item, index) => (
          <Link to={item.url} className="remove__ligne" key={index}>
            <div className="tasks__">
            <div className="profile__link">
              <div className="profile__links">
              <div>
                <i className={`${item.icon} profile__icon`}></i>
              </div>
              <div>{item.name}</div>
            </div>
            </div>
            <div>
              <i className="fa fa-arrow-right " ></i>
            </div>
            </div>
          </Link>
        ))}
      </div> */}

      <div className="profiles__header">
        <div className="header__background"></div>
        <div className="carde__profile">
          <div className="cadre__top">
            <div className="cadre__left">
              <div>
                <img src="/images/user.png" alt="" style={{ height: 70 }} />
              </div>
              <div className="left__details">
                <div className="user__title">{currentUser?.fullName}</div>
                <div className="small__invitation">
                  <div className="small__inviation__left">
                    InvitationCode :
                    <span ref={referenceCodeRef}> {currentUser?.refcode}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cadre__right">
              <i
                className="fa-regular fa-copy"
                style={{ fontSize: 30, color: "orange" }}
                onClick={copyToClipboard}
              />
            </div>
          </div>

          <div className="score">
            <div className="score__right">Credit Score:</div>
            <div className="score__left">
              {currentUser?.score ? currentUser.score : 100}%
            </div>
          </div>
          <div className="bar">
            <div
              className="progress-value"
              style={{
                width: `${currentUser?.score ? currentUser.score : 100}%`,
              }}
            ></div>
          </div>
          <div className="cadre__bottom">
            <div className="firt__cadre">
              <span className="title__cadre">Balance</span>
              <span className="amount__cadre">
                {currentUser?.balance?.toFixed(2) || 0.0} USDT
              </span>
            </div>
            <div className="second__cadre"></div>
            <div className="">
              <span className="title__cadre">Today Profit</span>
              <span className="amount__cadre">{totalperday} USDT </span>
            </div>
            <div className="second__cadre"></div>
            <div>
              <span className="title__cadre">Frozen amount</span>
              <span className="amount__cadre">
                {currentUser?.freezeblance?.toFixed(2)} USDT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__content">
        <div>
          <label htmlFor="" className="titre">
            My Financial
          </label>
          <div className="detail__section">
            <div
              className="line__section border__"
              onClick={() => goto("/Deposit")}
            >
              <div className="titre__section">
                <i className="fa-solid fa-paper-plane" />
                <span>Deposit</span>
              </div>
              <div>
                <i className="fa fa-arrow-right " />
              </div>
            </div>
            <div className="line__section" onClick={() => goto("/withdraw")}>
              <div className="titre__section">
                <i className="fa-solid fa-money-check" />
                <span>Withdraw</span>
              </div>
              <div>
                <i className="fa fa-arrow-right " />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="" className="titre">
            My Details
          </label>
          <div className="detail__section">
            <Link to="/myprofile" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-user profile__icon"></i>
                  <span>Profile</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
            <Link to="/wallet" className="remove__ligne">
              <div className="line__section">
                <div className="titre__section">
                  <i className="fa-solid fa-wallet profile__icon"></i>
                  <span>Wallet</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <label htmlFor="" className="titre">
            Other
          </label>
          <div className="detail__section">
            <Link to="/transacation" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-arrow-right-arrow-left profile__icon"></i>
                  <span>Transaction</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
            <Link to="/order" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-clock-rotate-left profile__icon"></i>
                  <span>Tasks History</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
            <Link to="/security" className="remove__ligne">
              <div className="line__section border__">
                <div className="titre__section">
                  <i className="fa-solid fa-lock profile__icon"></i>
                  <span>Security</span>
                </div>
                <div>
                  <i className="fa fa-arrow-right " />
                </div>
              </div>
            </Link>
              <div className="line__section ">
                <div className="titre__section">
                  <i className="fa fa-gift"></i>
                  <span>
                    Redemption :
                    <span ref={couponCodeRef}> {currentUser?.couponcode} </span>
                  </span>
                </div>
                <div>
                  <i
                    className="fa-regular fa-copy"
                    onClick={() => copyToClipboardCoupon()}
                  />
                </div>
              </div>
    
          </div>
        </div>
      </div>
      <div className="logout__button" onClick={() => doSignout()}>
        {" "}
        Logout
      </div>
    </div>
  );
}

export default Profile;
