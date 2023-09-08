/* eslint-disable @next/next/no-async-client-component */
'use client';

import prisma from "@/utils/prisma";
import Loading from '../_loading';
import { useEffect, useState } from "react";

export default function SettingPage(params: any) {
  const [Loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch('/api/setting').then((r) => r.json())
      .then((r) => setSettings(r))
  }, [])

  const onAction = (e) => {
    e.preventDefault();
    const phoneNumber = e.target.elements.namedItem('phoneNumber') as HTMLInputElement;

    fetch('/api/setting', {
      method: 'PUT',
      body: JSON.stringify({
        phoneNumber: phoneNumber.value,
        id: settings.id
      })
    }).then((r) => r.json()).then((r) => {
      setSettings(r)
    })

  }

  return (
    <main className="p-8 ">
      <h1 className="text-3xl mb-6">პარამეტრები</h1>
      <div className="divider"></div>
      <div className="card max-w-md">
        <form onSubmit={onAction} className="flex flex-col gap-2">
          <div
            className="form-control w-full">
            <label className="label">
              <span className="label-text">საკონტაქტო ტელეფონის ნომერი</span>
            </label>
            <div className="form-control">
              <input className="input input-bordered w-full"
                name="phoneNumber" 
                defaultValue={settings ? settings.phoneNumber : ''}
                />
            </div>
          </div>
          <button type='submit' className="btn btn-success">
            <div className="loading loading-spinner text-white"></div>
            შენახვა
          </button>
        </form>
      </div>
    </main>
  )
}