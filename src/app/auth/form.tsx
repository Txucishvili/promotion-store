'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AuthForm() {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e: FormData) => {

    const itemsType = e.get("items-type");
    const userName = e.get('userName');
    const password = e.get("password");

    setLoading(true);

    const res = signIn("credentials", {
      userName,
      password,
      callbackUrl: '/dashboard',
      redirect: false,
    }).then(async (r) => {
      setLoading(false);
      if (r?.error) {
        setError(true);
        return;
      }

      router.replace('/dashboard');
    });

  }

  return (
    <div>
      <form action={onSubmit} className="form flex flex-col gap-2">
        {error ? <div className='text-error'>არასწორი მონაცემები</div> : null}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">ელ-ფოსტ</span>
          </label>
          <input
            name="userName"
            type="text"
            placeholder="example@mail.com"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">პაროლი</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="******"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-action mt-2">
          <button
            // formAction={formAction}
            type="submit"
            className="btn btn-neutral w-full relative"
          >
            {isLoading ? <div className="loading loading-spinner absolute left-2 top-center"></div> : null}
            შესვლა
          </button>
        </div>
      </form>
    </div>
  )
}
