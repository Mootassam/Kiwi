import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from "src/modules/company/list/companyListActions";
import selectors from "src/modules/company/list/companyListSelectors";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "src/shared/LoadingModal";

function Tc() {
  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const doFetch = () => {
    dispatch(actions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  return (
    <div>
      <SubHeader title="Certificate" path="/" />
      <div className="detaill__company" style={{ whiteSpace: "pre-line" }}>
        <img src="/images/ce1.jpg" />
        <img src="/images/crrt2.jpg" />
        <img src="/images/cert3.jpg" />
      </div>
    </div>
  );
}

export default Tc;
