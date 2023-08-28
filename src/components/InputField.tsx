import React from "react";

export type InputFieldProps = {
  placeholder?: string | undefined;
  value?: string | null;
  label?: string | number | null;
  error?: string | string[] | null;
  name?: string | undefined;
};

export default function InputField({
  error = null,
  placeholder = undefined,
  value = null,
  label = null,
  name,
}: InputFieldProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {/* <span className="label-text-alt">Top Right label</span> */}
      </label>
      <input
        defaultValue={value}
        name={name}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      {/* <label className="label"> */}
      {/* <span className="label-text-alt">Bottom Left label</span> */}
      {/* <span className="label-text-alt">Bottom Right label</span> */}
      {/* </label> */}
    </div>
  );
}
