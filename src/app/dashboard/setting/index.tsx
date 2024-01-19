/* eslint-disable @next/next/no-async-client-component */
"use client";

import prisma from "@/utils/prisma";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { CheckCircle, CheckFat, List, Pencil, Trash } from "@phosphor-icons/react";

export default function SettingPageComponent(params: any) {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("/api/setting")
      .then((r) => r.json())
      .then((r) => {
        setSettings(r);
      });
  }, []);

  const onAction = (e) => {
    e.preventDefault();
    const phoneNumber = e.target.elements.namedItem(
      "phoneNumber"
    ) as HTMLInputElement;

    setLoading(true);
    fetch("/api/setting", {
      method: "PUT",
      body: JSON.stringify({
        phoneNumber: phoneNumber.value,
        id: settings.id,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        setLoading(false);
        setSettings(r);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={onAction} className="flex flex-col gap-2">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">საკონტაქტო ტელეფონის ნომერი</span>
        </label>
        <div className="form-control">
          <input
            className="input input-bordered w-full"
            name="phoneNumber"
            defaultValue={settings ? settings.phoneNumber : ""}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        {loading ? (
          <div className="loading loading-spinner text-white"></div>
        ) : null}
        შენახვა
      </button>
    </form>
  );
}

const ListInputItem = ({ item, onAction }: any) => {
  const [name, setName] = useState(item.name);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  const onSave = (e: any) => {
    setLoading(true);
    setLoadingState('SAVE')
    onAction({
      action: 'SAVE',
      name: name,
      id: e.id,
      cb: () => {
        setLoading(false);
        setLoadingState(null)
      },

    })
  }

  const onDelete = (e: any) => {
    setLoading(true);
    setLoadingState('DELETE')
    onAction({
      action: 'DELETE',
      name: name,
      id: e.id,
      cb: () => {
        setLoading(false);
        setLoadingState(null)
      },

    })
  }

  return (
    <div className="h-8 flex items-start">
      <input
        className="bg-transparent w-full h-[inherit] outline-none border-b-2 border-transparent focus-within:border-success"
        type="text"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name !== item.name ? <div className="flex items-center gap-1">
        <span className="text-warning"> *</span>
        <button type="button" onClick={() => onSave(item)} className="btn btn-square btn-ghost text-success btn-sm">

          {loading && loadingState == 'SAVE' ? (
            <div className="loading loading-spinner w-5 h-5 text-white"></div>
          ) : <CheckFat size={24} />}
        </button>
      </div> : null}
      <button type="button" onClick={() => onDelete(item)} className="btn btn-square btn-ghost text-error btn-sm">

        {loading && loadingState == 'DELETE' ? (
          <div className="loading loading-spinner w-5 h-5 text-error"></div>
        ) : <Trash size={24} />}
      </button>
    </div>
  )
}

export const CityRegionList = (props: any) => {
  const [list, setList]: any = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchList = () => {
    return fetch("/api/cities")
      .then((r) => r.json())
      .then((r) => {
        setList(r);
      }).catch(e => {
        setList(null);
      });
  }

  useEffect(() => {
    fetchList();
  }, []);

  const onListAction = ({ name, id, cb, action }: any) => {
    const actionType = action == 'SAVE' ? 'PUT' : 'DELETE';
    fetch("/api/cities", {
      method: actionType,
      body: JSON.stringify({
        id,
        name
      }),
    })
      .then((r) => {
        // setLoading(false);
        fetchList();
        if (cb) {
          cb();
        }
      })
      .catch((e) => {
        // setLoading(false);
        if (cb) {
          cb();
        }
      });
  }


  const onSubmit = (e: any) => {
    e.preventDefault();

    const cityRegion = e.target.elements.namedItem(
      "cityRegion"
    ) as HTMLInputElement;

    if (!cityRegion.value.length) {
      return
    }

    setLoading(true)

    fetch("/api/cities", {
      method: "POST",
      body: JSON.stringify({
        name: cityRegion.value,
      }),
    })
      .then((r) => {
        setLoading(false);
        fetchList();
        e.target.reset();
      })
      .catch((e) => {
        setLoading(false);
      });

  };

  return (
    <div>
      <ul className="list max-h-40 overflow-auto">
        {list && list.length ? list.map((c: any, key: any) => {
          return <li key={c.id}>
            <ListInputItem item={c} onAction={onListAction} />
          </li>
        }) : 'მონაცემები არარის'}
      </ul>
      <div className="divider"></div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">ახალი რეგიონის დამატება</span>
          </label>
          <div className="form-control">
            <input
              className="input input-bordered w-full"
              name="cityRegion"
              placeholder="სახელი"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          {loading ? (
            <div className="loading loading-spinner text-white"></div>
          ) : null}
          დამატება
        </button>
      </form>
    </div>
  );
};
