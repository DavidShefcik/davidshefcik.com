import React, {
  ReactElement,
  useState,
  ChangeEvent,
  TextareaHTMLAttributes,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "firebase/firestore";

import HomeSection from "../../../../components/HomeSection";

import FormInput from "../../../../components/FormInput";
import FormButton from "../../../../components/FormButton";

import replaceWhitespace from "../../../../util/replaceWhitespace";
import validEmail from "../../../../util/validEmail";

import useFirebase from "../../../../store/Firebase";

export default function Contact(): ReactElement {
  const [emailValue, setEmailValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [formSuccess, setFormSuccess] = useState(false);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  let recaptchaSolved = false;

  function captchaSolved(value: any): void {
    axios
      .get(`${process.env.FUNCTIONS_URL}/captchaCheck?code=${value}`)
      .then((res: any) => {
        const { data } = res;
        if (data.message === "ok") {
          recaptchaSolved = true;
        }
      })
      .catch((error: any) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        setErrorText("Something happened! Please try again!");
      });
  }

  async function submit(): Promise<boolean> {
    let hasError = false;
    setEmailError(false);
    setSubjectError(false);
    setMessageError(false);
    setErrorText("");

    setLoading(true);

    if (
      replaceWhitespace(emailValue, "").length === 0 ||
      emailValue.length > 64
    ) {
      setEmailError(true);
      hasError = true;
    }
    if (
      replaceWhitespace(subjectValue, "").length === 0 ||
      subjectValue.length > 128
    ) {
      setSubjectError(true);
      hasError = true;
    }
    if (
      replaceWhitespace(messageValue, "").length === 0 ||
      messageValue.length > 2048
    ) {
      setMessageError(true);
      hasError = true;
    }

    if (hasError) {
      setErrorText("Invalid values!");
    } else if (!validEmail(emailValue)) {
      setEmailError(true);
      setErrorText("Email invalid!");
      hasError = true;
    }

    if (!hasError) {
      if (recaptchaSolved) {
        try {
          const contactForDB = {
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            time: new Date(),
          };
          await db.collection("contact").add(contactForDB);
          setEmailValue("");
          setSubjectValue("");
          setMessageValue("");
          setFormSuccess(true);
          setLoading(false);
        } catch (error) {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
          hasError = true;
          setErrorText("Something happened! Please try again!");
          setLoading(false);
        }
      } else {
        setErrorText("ReCAPTCHA needs to be solved!");
        hasError = true;
      }
    }

    setLoading(false);

    return true;
  }

  function messageChange(event: ChangeEvent<TextareaHTMLAttributes>): void {
    setMessageValue(event.target.value);
  }

  return (
    <HomeSection title="Contact" status="success" growable>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full lg:w-2/4 flex flex-col lg:flex-row justify-center items-center">
          <FormInput
            type="email"
            placeholder="Your Email"
            maxLength={64}
            value={emailValue}
            onChange={setEmailValue}
            error={emailError}
            margin="mr-0 lg:mr-1"
          />
          <FormInput
            type="text"
            placeholder="Subject"
            maxLength={128}
            value={subjectValue}
            onChange={setSubjectValue}
            error={subjectError}
            margin="ml-0 lg:ml-1"
          />
        </div>
        <textarea
          className={`my-1 w-full lg:w-2/4 p-4 box-border text-white bg-secondary-background rounded-sm outline-none transition ease-in duration-75 border border-solid ${
            messageError ? "border-red-600" : "border-darker-primary-background"
          } focus:border-blue-400`}
          defaultValue={messageValue}
          onChange={messageChange}
          maxLength={2048}
          placeholder="Your message"
        />
        <div className="my-2">
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY}
            theme="dark"
            onChange={captchaSolved}
          />
        </div>
        {errorText !== "" ? (
          <p className="pb-2 text-red-600">{errorText}</p>
        ) : null}
        {formSuccess ? (
          <p className="pb-2 text-green-600">
            Thank you for your response! I'll try and get back to you as soon as
            I can!
          </p>
        ) : null}
        <FormButton text="Submit" click={() => submit()} loading={loading} />
      </div>
    </HomeSection>
  );
}
