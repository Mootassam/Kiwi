import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import { useLocation } from "react-router-dom";


function Online() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    // Check if current location matches the specific page where you want to show the live chat
    if (location.pathname === "/Online") {

      // Load Tawk.to script dynamically
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://embed.tawk.to/668d88df7a36f5aaec966a1d/1i2cdtap3";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      script.id = "tawkto-script"; // Add id attribute

      // Append script to the body
      document.body.appendChild(script);

      // Optionally, you can initialize the chat here if needed
    

      // Clean up function: remove the script when component unmounts or when navigating away from the page
      return () => {
        const existingScript = document.getElementById("tawkto-script");
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }
  }, [location.pathname]);

  const showLiveChat = () => {  
 
  };

  const hideLiveChat =()=>{

  }

  return (
    <div>
      <div className="online__service">
        <h4>Customer Service</h4>
      </div>

      <div className="online__header">
        For general inquiries and assistance, please reach out to us via live
        chat. To register your full working day for salary calculation after
        successfully completing your daily tasks (two sets), contact the
        Specialized Team only.
      </div>
      <div className="contact__list">
        {loading && <LoadingModal />}

        {!loading &&
          record &&
          record.map((item) => (
            <div className="contact__online" key={item.id}>
              <div className="list__header">{item?.name}</div>
              <div className="online__image">
                <img
                  src={item?.photo[0]?.downloadUrl}
                  alt=""
                  className="customer__image"
                />
              </div>
              <div className="online__footer">
                {item.type === "whatsApp" ? (
                  <a
                    href={`https://wa.me/${item.number}`}
                    className="number__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="contact__now">
                      <i
                        className="fa-brands fa-whatsapp"
                        style={{ fontSize: 18 }}
                      ></i>
                      Contact now
                    </div>
                  </a>
                ) : (
                  <a
                    href={`https://t.me/${item.number}`}
                    className="number__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="contact__now __telegram">
                      <i
                        className="fa-brands fa-telegram"
                        style={{ fontSize: 18 }}
                      ></i>
                      Contact now
                    </div>
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Online;
