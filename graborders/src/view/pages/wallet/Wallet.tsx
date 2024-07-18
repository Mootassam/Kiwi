import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import InputFormItem from "src/shared/form/InputFormItem";
import selector from "src/modules/auth/authSelectors";
import SelectFormItem from "src/shared/form/SelectFormItem";
import userEnumerators from "src/modules/user/userEnumerators";
const schema = yup.object().shape({
  preferredcoin: yupFormSchemas.enumerator(i18n("user.fields.status"), {
    options: userEnumerators.wallet,
    required: true,
  }),
  trc20: yupFormSchemas.string(i18n("user.fields.walletAddress"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
});
function Wallet() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selector.selectCurrentUser);
  const [show, setShow] = useState(false);

  const [initialValues] = useState(() => {
    return {
      trc20: "" || currentUser.trc20,
      // withdrawPassword: "" || currentUser.withdrawPassword,
      walletname: "" || currentUser.walletname,
      usernamewallet: "" || currentUser.usernamewallet,
      balance: currentUser?.balance,
      preferredcoin: currentUser?.preferredcoin,
    };
  });
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });
  const onSubmit = ({
    preferredcoin,
    withdrawPassword,
    trc20,
    walletname,
    usernamewallet,
  }) => {
    const values = {
      trc20: trc20,
      walletname: walletname,
      usernamewallet: usernamewallet,
      balance: currentUser?.balance,
      withdrawPassword: withdrawPassword,
      preferredcoin: preferredcoin,
    };
    dispatch(actions.doUpdateProfile(values));
  };

  const formatAddress = (address) => {
    if (!address) return '';
    const visibleLength = Math.ceil(address.length * 0.25);
    const visiblePart = address.substring(0, visibleLength);
    const hashedPart = '*'.repeat(address.length - visibleLength);
    return visiblePart + hashedPart;
  };
  
  return (
    <div>
      <SubHeader title="Wallet" path="/profile" />
      <div className="app__wallet">
        <div className="wallet__">
          <h3 className="hall">Withdrawal method information</h3>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="wallet__form">
                {currentUser.trc20 && !show ? (
                  <>
                    <div className="modify__wallet">
                      <div className="itesma">
                        <span>
                          <b> Preferred coin: </b>
                        </span>
                        {currentUser.preferredcoin}
                      </div>
                      <div className="itesma">
                        <span>
                          <b> Wallet Address: </b>
                        </span>
                        {formatAddress(currentUser.trc20)}
                      </div>
                    </div>
                    <button className="modify" onClick={() => setShow(true)}>
                      Modify
                    </button>
                  </>
                ) : (
                  <>
                    <div className="form__">
                      <div className="form__group">
                        <div className="label__form">
                          <span style={{ color: "red" }}>*</span>
                          <span style={{ fontSize: "13px" }}>Full Name</span>
                        </div>
                        <div className="input__div">
                          <InputFormItem
                            type="text"
                            name="usernamewallet"
                            placeholder={i18n("user.fields.fullName")}
                            className="input__withdraw "
                          />
                        </div>
                      </div>

                      <div className="form__group">
                        <div className="label__form">
                          <span style={{ color: "red" }}>*</span>
                          <span style={{ fontSize: "13px" }}>Wallet Name</span>
                        </div>
                        <div className="input__div">
                          <InputFormItem
                            type="text"
                            name="walletname"
                            placeholder={i18n("user.fields.walletName")}
                            className="input__withdraw"
                          />
                        </div>
                      </div>

                      <div className="form__group">
                        <div className="label__form">
                          <span style={{ color: "red" }}>*</span>
                          <span style={{ fontSize: "13px" }}>
                            Choose preferred coin:
                          </span>
                        </div>
                        <div className="input__div">
                          <SelectFormItem
                            name="preferredcoin"
                            options={userEnumerators.wallet.map((value) => ({
                              value,
                              label: i18n(`user.enumerators.status.${value}`),
                            }))}
                            required={true}
                          />
                        </div>
                      </div>

                      <div className="form__group">
                        <div className="label__form">
                          <span style={{ color: "red" }}>*</span>
                          <span style={{ fontSize: "13px" }}>
                            Wallet Address
                          </span>
                        </div>
                        <div className="input__div">
                          <InputFormItem
                            type="text"
                            name="trc20"
                            placeholder={i18n("user.fields.walletAddress")}
                            className="input__withdraw"
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <div className="label__form">
                          <span style={{ color: "red" }}>*</span>
                          <span style={{ fontSize: "13px" }}>
                            Withdraw Password
                          </span>
                        </div>
                        <div className="input__div">
                          <InputFormItem
                            type="password"
                            name="withdrawPassword"
                            placeholder={i18n("user.fields.withdrawPassword")}
                            className="input__withdraw"
                          />
                        </div>
                      </div>
                    </div>
                    <button className="confirm" type="submit">
                      Submit
                    </button>
                  </>
                )}

                <span style={{ fontSize: 13 }}>
                  <b>Note:</b> &nbsp; Please be careful when filling out this
                  information.
                </span>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
