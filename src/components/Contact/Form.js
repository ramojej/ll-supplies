import React, { useState } from "react"
import {
  useNetlifyForm,
  NetlifyFormProvider,
  NetlifyFormComponent,
  Honeypot,
} from "react-netlify-forms"
import { useForm } from "react-hook-form"
import tw, { styled } from "twin.macro"

const FormContainer = styled.div`
  ${tw`mt-8`};

  form {
    ${tw`flex flex-col justify-center`}
    input,
    textarea {
      border-bottom: 5px solid #282828;
      border-left: 5px solid #282828;
      padding: 10px;
      transition: all 0.3s ease;

      ${tw`w-full focus:outline-none`}
    }
    input {
      height: 50px;
    }

    input::placeholder,
    textarea::placeholder {
      color: #666;
      ${tw`font-semibold uppercase text-xs`}
    }

    p {
      color: #ff2020;
      ${tw`font-semibold text-xs mt-3`}
    }

    input.error,
    textarea.error {
      border-bottom: 5px solid #ff2020;
      border-left: 5px solid #ff2020;
    }

    div:not(:last-child) {
      ${tw`mb-8`}
    }

    textarea {
      height: 8rem;
    }

    button {
      ${tw`uppercase font-semibold text-center p-2`}
    }
  }

  h4 {
    ${tw`text-xl font-semibold`}
  }

  @media ${props => props.theme.screens.lg} {
    min-height: 450px;
  }
`

// const config = {
//   angle: 90,
//   spread: 360,
//   startVelocity: 40,
//   elementCount: 70,
//   dragFriction: 0.12,
//   duration: 3000,
//   stagger: 3,
//   width: "10px",
//   height: "10px",
//   perspective: "499px",
//   colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
// }

const Form = () => {
  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onChange",
  })

  const netlify = useNetlifyForm({
    name: "react-hook-form",
    action: "/thanks",
    honeypotName: "bot-field",
    onSuccess: (response, context) => {
      console.log("Successfully sent form data to Netlify Server")
    },
  })

  const { isSubmitting } = formState

  const [visibleForm, clearVisibleForm] = useState(true)

  //const [party, setParty] = useState(false)

  const onSubmit = data => netlify.handleSubmit(null, data)

  return (
    <FormContainer>
      {!visibleForm && (
        <>
          {/* <Confetti active={party} config={config} /> */}
          <h4>Thank you for contacting us! We will get back to you shortly!</h4>
        </>
      )}
      {visibleForm && (
        <NetlifyFormProvider>
          <NetlifyFormComponent onSubmit={handleSubmit(onSubmit)}>
            <Honeypot />
            <div>
              <input type="hidden" name="form-name" value="react-hook-form" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="ENTER YOUR NAME"
                className={errors.name ? "error" : ""}
                ref={register({
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be atleast 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Name should not be more than 100 characters",
                  },
                })}
              />
              {errors.name && errors.name.message && (
                <p>{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className={errors.email ? "error" : ""}
                ref={register({
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  },
                })}
              />
              {errors.email && errors.email.message && (
                <p>{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="PHONE NUMBER"
                className={errors.phone ? "error" : ""}
                ref={register({
                  required: "Phone number is required",
                  pattern: {
                    value: /\+65(6|8|9)\d{7}/g,
                    message: "Invalid phone number.",
                  },
                })}
              />
              {errors.phone && errors.phone.message && (
                <p>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="ENTER YOUR MESSAGE"
                ref={register}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </NetlifyFormComponent>
        </NetlifyFormProvider>
      )}
    </FormContainer>
  )
}

export default Form
