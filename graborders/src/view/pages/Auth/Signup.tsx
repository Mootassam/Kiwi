import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),

  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),

  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password"), null], i18n("auth.passwordChange.mustMatch")),
  phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
  invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
    required: true,
  }),

  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signup() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    withdrawPassword: "",
    invitationcode: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({
    email,
    password,
    phoneNumber,
    withdrawPassword,
    invitationcode,
  }) => {
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        phoneNumber,
        withdrawPassword,
        invitationcode
      )
    );
  };
  return (
    <div className="auth__page">
      <div className="auth__header">
        <img src="/images/white.svg" alt="" style={{ height: 100 }} />
        <div className="auth__div">
          <span className="auth__textlogin">Create Account</span>
          <span className="auth__description" style={{ maxWidth: 320 }}>
            It's a pleasure to have you on board with us!
          </span>
        </div>
      </div>
      <div className="signin__design">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="auth__form">
              <div className="form__authgroup">
                <div className="group__text">Username</div>

                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("user.fields.username")}
                  className="auth__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>
              <div className="form__authgroup">
                <div className="group__text">Phone Number</div>
                <InputFormItem
                  type="text"
                  name="phoneNumber"
                  placeholder={i18n("user.fields.phoneNumber")}
                  className="auth__input"
                />
              </div>
              <div className="form__authgroup">
                <div className="group__text">withdrawal Password</div>
                <InputFormItem
                  type="password"
                  name="withdrawPassword"
                  placeholder={i18n("user.fields.withdrawPassword")}
                  className="auth__input"
                />
              </div>
              <div className="form__authgroup">
                <div className="group__text">Password</div>
                <InputFormItem
                  type="password"
                  name="password"
                  placeholder={i18n("user.fields.password")}
                  className="auth__input"
                />
              </div>
              <div className="form__authgroup">
                <div className="group__text">Confirm Password</div>
                <InputFormItem
                  type="password"
                  name="newPasswordConfirmation"
                  autoComplete="new-password"
                  placeholder={i18n("user.fields.confirmPassword")}
                  className="auth__input"
                />
              </div>
              <div className="form__authgroup">
                <div className="group__text">Invitation Code</div>
                <InputFormItem
                  type="text"
                  name="invitationcode"
                  placeholder={i18n("user.fields.invitationcode")}
                  className="auth__input"
                  externalErrorMessage={externalErrorMessage}
                />
              </div>
            </div>
            <div className="auth__bottom">
              <button className="auth__button" disabled={loading} type="submit">
                {!loading && (
                  <i className="fa fa-arrow-right" style={{ fontSize: 34 }}></i>
                )}
                <ButtonIcon loading={loading} />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      <Link to="/auth/signin" className="remove__ligne">
        <span className="auth__link">Already have an account</span>
      </Link>
    </div>
  );
}

export default Signup;
