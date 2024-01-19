/* eslint-disable react/display-name */
import { HtmlProps } from "next/dist/shared/lib/html-context";
import React, {
  FormEvent,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  Ref,
  RefAttributes,
  forwardRef,
  useRef,
  useState,
} from "react";

export type InputFieldProps = {
  error?: string | string[] | null;
};

const InputBase = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    const { value, ...otherProps } = props;
    const _value = value || "";

    return (
      <div className="form-control">
        <input ref={ref} {...otherProps} defaultValue={_value} />
      </div>
    );
  }
);

const FormInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props: InputFieldProps & HTMLProps<HTMLInputElement>, ref) => {
    const { value, error, label, className, onChange, ...inputProps } = props;
    const _inputProps: any = inputProps; // !!
    const defaultValue = value || "";

    const onInputChange = (e: FormEvent<HTMLInputElement>) => {
      if (!onChange) return;

      onChange(e);
    };

    return (
      <div className={"form-control " + className}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{label}</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <InputBase
            ref={ref}
            onChange={onInputChange}
            value={defaultValue}
            className={"input input-bordered w-full"}
            {..._inputProps}
          />
          {/* <label className="label"> */}
          {/* <span className="label-text-alt">Bottom Left label</span> */}
          {/* <span className="label-text-alt">Bottom Right label</span> */}
          {/* </label> */}
        </div>
      </div>
    );
  }
);

const FormSelectBase = (props: any, ref: any) => {
  const { name, value, label, fields = [], ...otherProps } = props;
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered"
        ref={ref}
        value={value}
        {...otherProps}
      >
        {fields.map((c: any) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const FormSelect = forwardRef(FormSelectBase);

export default FormInput;
