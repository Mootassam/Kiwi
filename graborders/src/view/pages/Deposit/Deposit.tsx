import React, { useEffect, useRef, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import selectors from "src/modules/company/list/companyListSelectors";
import actions from "src/modules/company/list/companyListActions";
import LoadingModal from "src/shared/LoadingModal";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import Storage from "src/security/storage";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import Formselectors from "src/modules/transaction/form/transactionFormSelectors";
import ButtonIcon from "src/view/shared/ButtonIcon";
import Transactionactions from "src/modules/transaction/form/transactionFormActions";
import Message from "src/shared/message";
import Transactionselectors from 'src/modules/transaction/form/transactionFormSelectors';

const schema = yup.object().shape({
  photo: yupFormSchemas.images(i18n("entities.product.fields.photo"), {
    required: true,
  }),
});

const secondSchema = yup.object().shape({
  amount: yupFormSchemas.string(i18n("entities.transaction.fields.amount"), {
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

  const saveLoading = useSelector(
    Transactionselectors.selectSaveLoading,
  );

  const handleChange = (e) => {
    setWallet(e.target.value);
  };

  const referenceCodeRef = useRef<any>(null);
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

  const form2 = useForm({
    resolver: yupResolver(secondSchema),
    mode: "all",
  });

  const { setValue } = form2;


  const handleBalanceClick = (amount) => {
    setBalance(amount);
    setValue('amount', amount); // Update the form field
  };

  const onSubmit2 = (values) => {
    setShow(true);
    setBalance(values.amount);
  };

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
          <div className="app__deposit wallet__form">
            <div className="profile__balances">
              <span className="total__deposit">Total Balance:</span>
              <span className="balance__">
                USDT {currentUser?.balance?.toFixed(2)}
              </span>
            </div>

            <div className="deposit__title">
              <span className="deposit__text">Deposit Amount </span>
            </div>
            <FormProvider {...form2}>
              <form onSubmit={form2.handleSubmit(onSubmit2)}>
                <div className="deposit__balance">
                  <div onClick={() => handleBalanceClick("100")}>
                    <span>USDT</span>
                    <span>100.00</span>
                  </div>
                  <div onClick={() => handleBalanceClick("200")}>
                    <span>USDT</span>
                    <span>200.00</span>
                  </div>
                  <div onClick={() => handleBalanceClick("500")}>
                    <span>USDT</span>
                    <span>500.00</span>
                  </div>
                </div>
                <div className="deposit__Form">
                  <div style={{marginTop:20}}>
                    <InputFormItem
                      type="text"
                      name="amount"
                      placeholder={i18n("entities.transaction.fields.amount")}
                      className="input__withdraw"
                    />
                  </div>
                </div>
                <div
                  className="confirm"
                  onClick={form2.handleSubmit(onSubmit2)}
                >
                  Submit
                </div>
              </form>
            </FormProvider>
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
                  <div className="wallet__form">
                    <div className="select__wallet">
                      <div className="deposit__text">Choose preferred coin</div>

                      <select
                        name="wallet"
                        id=""
                        className="input__wallet"
                        value={wallet}
                        onChange={handleChange}
                      >
                        <option value="USDT">USDT (TRC20)</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>
                    <div className="">
                      {wallet === "USDT" ? (
                        <div className="usdt__">
                          <div>TRC20 Address:</div>
                          <div className="usdt__copy">
                            <div ref={referenceCodeRef} className="full__address">{record[0]?.trc20}</div>
                        
                              <i
                                className="fa fa-copy"
                                onClick={() => copyToClipboard()}
                              ></i>
                          
                          </div>
                        </div>
                      ) : (
                        <div className="usdt__">
                          <div>ETH Address:</div>
                          <div className="usdt__copy">
                            <div ref={referenceCodeRef}>{record[0]?.eth}</div>
                            <div>
                              <i
                                className="fa fa-copy"
                                onClick={() => copyToClipboard()}
                              ></i>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="amount__deposit">
                      <div className="deposit__text">Deposit Amount</div>
                      <div className="deposit__Form">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Deposit Amount"
                          className="input__withdraw"
                          value={balance}
                          disabled={true}
                        />
                      </div>
                    </div>

                    {/* <div className="col-lg-7 col-md-8 col-12">
                      <InputFormItem
                        name="amount"
                        label={i18n("entities.transaction.fields.amount")}
                        required={true}
                      />
                    </div> */}
                    <div className="amount__deposit">
                      <div className="deposit__text">Payment Voucher</div>
                      <div className="amount__detaila">
                        Please provide a screenshot of the receipt which is
                        showing "Completed" or "Success"
                      </div>
                      <ImagesFormItem
                        name="photo"
                        storage={Storage.values.galleryPhotos}
                        max={1}
                      />
                    </div>

                    <button
                      className="confirm"
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      <ButtonIcon
                        loading={saveLoading}
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
