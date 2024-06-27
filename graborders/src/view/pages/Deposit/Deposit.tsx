import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import selectors from "src/modules/company/list/companyListSelectors";
import actions from "src/modules/company/list/companyListActions";
import LoadingModal from "src/shared/LoadingModal";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import Storage from "src/security/storage";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Formselectors from "src/modules/transaction/form/transactionFormSelectors";
import ButtonIcon from "src/view/shared/ButtonIcon";
import Transactionactions from "src/modules/transaction/form/transactionFormActions";

const schema = yup.object().shape({
  photo: yupFormSchemas.images(i18n("entities.product.fields.photo"), {
    required: true,
  }),
});

function Deposit() {
  const dispatch = useDispatch();
  const record = useSelector(selectors.selectRows);
  const recordForm = useSelector(Formselectors.selectRecord);

  const loading = useSelector(selectors.selectLoading);

  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState("");
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [wallet, setWallet] = useState("USDT");

  const handleChange = (e) => {
    setWallet(e.target.value);
  };

  const doFetch = async () => {
    await dispatch(actions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  const [initialValues] = useState(() => {
    const record = recordForm || {};
    return {
      status: record.status,
      date: record.date || new Date(),
      user: currentUser.id || [],
      type: "deposit",
      amount: balance || 0,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (values) => {
    values.amount = balance;
    values.user = currentUser;
    values.type = "deposit";
    dispatch(Transactionactions.doCreate(values));
  };

  return (
    <div>
      {!show ? (
        <div>
          <SubHeader title="Deposit" path="/" />
          <div className="app__deposit">
            <div className="profile__balances">
              <span>Total Balance</span>
              <span>USDT {currentUser?.balance}</span>
            </div>

            <div className="deposit__title">
              <span>Deposit Amount </span>
            </div>

            <div className="deposit__balance">
              <div onClick={() => setBalance("100")}>
                <span>USDT</span>
                <span>100.00</span>
              </div>
              <div onClick={() => setBalance("200")}>
                <span>USDT</span>
                <span>200.00</span>
              </div>
              <div onClick={() => setBalance("500")}>
                <span>USDT</span>
                <span>500.00</span>
              </div>
            </div>

            <div className="deposit__Form">
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="deposit Amount"
                  className="deposit__"
                  onChange={(e) => setBalance(e.target.value)}
                  value={balance}
                />
              </div>
            </div>

            <div className="submit__button" onClick={() => setShow(true)}>
              Submit
            </div>
          </div>
        </div>
      ) : (
        <div>
          <SubHeader title="USDT Deposit" path="/" />
          <div className="app__deposit">
            {loading && <LoadingModal />}
            {record && (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    <div className="select__wallet">
                      <select
                        name="wallet"
                        id=""
                        className="input__wallet"
                        value={wallet}
                        onChange={handleChange}
                      >
                        <option value="USDT">USDT TRC20</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>
                    <div className="">
                      {wallet === "USDT" ? (
                        <div className="usdt__">
                          <div>TRC20 Address:</div>
                          <div>{record[0]?.trc20}</div>
                        </div>
                      ) : (
                        <div className="usdt__">
                          <div>ETH Address:</div>
                          <div>{record[0]?.eth}</div>
                        </div>
                      )}
                    </div>

                    <div className="amount__deposit">
                      <div>Deposit Amount</div>
                      <div className="deposit__Form">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="deposit Amount"
                          className="deposit__"
                          value={balance}
                          disabled={true}
                        />
                      </div>{" "}
                    </div>

                    {/* <div className="col-lg-7 col-md-8 col-12">
                      <InputFormItem
                        name="amount"
                        label={i18n("entities.transaction.fields.amount")}
                        required={true}
                      />
                    </div> */}
                    <div className="amount__deposit">
                      <div>Payment Voucher</div>
                      <div className="amount__detaila">
                        Please Provide a screenshot of the receipt wich is
                        showing "Completed" or "Sucess"
                      </div>
                      <ImagesFormItem
                        name="photo"
                        storage={Storage.values.galleryPhotos}
                        max={1}
                      />
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      <ButtonIcon
                        // loading={props.saveLoading}
                        iconClass="far fa-save"
                      />
                      &nbsp;
                      {i18n("common.save")}
                    </button>
                  </div>
                </form>
              </FormProvider>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;
