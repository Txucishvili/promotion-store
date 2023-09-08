/* eslint-disable react/display-name */
import {
  FormEvent,
  HTMLProps,
  PropsWithChildren,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

export interface FormComponent {
  isLoading?: any;
  loading?: any;
  reset?: any;
  toggleCheckmark?: any;
  submit?: any;
  title?: string;
  onAction: () => void;
}

export type FormRef = {
  setLoading: (e: boolean) => void;
  isLoading: () => boolean;
  submit: () => void;
  reset: () => void;
  form: HTMLFormElement | null;
}

const FormBase = forwardRef<HTMLFormElement, HTMLProps<HTMLFormElement>>((props, ref) => {
  const { children } = props;
  return <form ref={ref} {...props}>
    {children}
  </form>
})

const FormContainer = forwardRef<FormRef & FormComponent, FormComponent & FormComponent & PropsWithChildren & HTMLProps<HTMLFormElement>>((props, inputRef) => {
  const { loading = false, onAction, onSubmit, children, title } = props;
  const [isLoading, setLoading] = useState(loading);
  const [isCheckmark, setMark] = useState(false);
  const ref = createRef<HTMLFormElement>();

  useImperativeHandle(
    inputRef,
    () => {
      return {
        form: ref.current,
        setLoading: (e: boolean) => {
          console.log('loading', ref)
          return setLoading(e);
        },
        submit: () => {
          ref.current?.submit();
        },
        reset: () => {
          console.log('form reset', ref)
          ref.current?.reset();
        },
        isLoading: () => {
          return isLoading
        }
      };
    },
    [isLoading, ref]
  );

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements: HTMLFormControlsCollection = e.currentTarget.elements;
    const formFileds: any = {};

    const elementNames = new Set(
      Array.from(elements)
        .filter((i: HTMLInputElement) => i.name.length)
        .map((i: HTMLInputElement) => String(i.name))
    );

    for (const key of Array.from(elementNames)) {
      if (Object.prototype.hasOwnProperty.call(elements, key)) {
        const element = elements.namedItem(
          key
        ) as HTMLInputElement;

        if (element instanceof RadioNodeList) {
          for (const i of Array.from(element) as HTMLInputElement[]) {
            if (i.type === "radio") {
              Object.assign(formFileds, {
                [key]: element.value,
              });
              continue;
            }

            if (i.type == "checkbox") {
              if (!formFileds[key]) {
                Object.assign(formFileds, {
                  [key]: [],
                });
              }

              if (i.checked) {
                Object.assign(formFileds, {
                  [key]: formFileds[key].concat(i.value),
                });
              }
              continue;
            }

            if (!formFileds[key]) {
              Object.assign(formFileds, {
                [key]: [i.value],
              });
            } else {
              Object.assign(formFileds, {
                [key]: formFileds[key].concat(i.value),
              });
            }
            continue;
          }
          continue;
        }

        if (element.type == "checkbox") {
          Object.assign(formFileds, {
            [element.name]: element.checked,
          });
          continue;
        }

        Object.assign(formFileds, {
          [element.name]: element.value,
        });
      }
    }
    // console.log("element", formFileds);

    if (onSubmit) {
      onSubmit(formFileds)
    };
  };

  return (
    <FormBase ref={ref} onSubmit={handleForm}>
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="divider"></div>
      {children}
      {/* <InputField label={''} /> */}
      <div className="modal-action">
        {isCheckmark && !isLoading ? (
          <div
            className="flex justify-center align-middle"
            style={{ width: 24 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline
                points="40 144 96 200 224 72"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </div>
        ) : null}
        {isLoading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : null}
        {/* if there is a button in form, it will close the modal */}
        <button
          type="button"
          onClick={() => {
            window.modalform.close();
          }}
          className="btn"
        >
          დახურვა
        </button>
        <button
          className={["btn btn-success", isLoading ? "disabled" : ""]
            .join()
            .replace(",", "")}
          disabled={isLoading}
          type="submit"
        >
          შენახვა
        </button>
      </div>
    </FormBase>
  );
});

// export const FormContainer = forwardRef(Form);
export default FormContainer;
