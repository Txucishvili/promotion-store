/* eslint-disable @next/next/no-async-client-component */
'use client';

import prisma from "@/utils/prisma";
import { Metadata } from "next";
import { useEffect, useState } from "react";


export default function SettingPageComponent(params: any) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch('/api/setting').then((r) => r.json())
      .then((r) => {
        console.log('r', r);
        setSettings(r)
      })
  }, [])

  const onAction = (e) => {
    e.preventDefault();
    const phoneNumber = e.target.elements.namedItem('phoneNumber') as HTMLInputElement;

    setLoading(true);
    fetch('/api/setting', {
      method: 'PUT',
      body: JSON.stringify({
        phoneNumber: phoneNumber.value,
        id: settings.id
      })
    }).then((r) => r.json()).then((r) => {
      setLoading(false);
      setSettings(r)
    }).catch((e) => {
      setLoading(false);
    })

  }

  return (
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
        {loading ? <div className="loading loading-spinner text-white"></div> : null}
        შენახვა
      </button>
    </form>
  )
}