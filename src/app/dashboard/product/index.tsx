"use client";
import { Fragment, useMemo, useRef, useState } from "react";
import InputField from "@/components/InputField";
import FormContainer, { FormRef } from "@/components/Form";
import { ProductItem } from "@/app/api/product/route";
import Image from "next/image";
import { useRouter } from "next/router";

export type ACTION_TYPES = "EDIT" | "DELETE" | "SAVE" | 'VIEW';

export enum FormFieldsEnum {
  id = "id",
  name = "name",
  slug = "slug",
  descriptions = "descriptions",
  photo_main = "photo_main",
  photo_gallery = "photo_gallery",
  // details = "details",
  categories = "categories",
  categoryId = "categoryId",
  show = "show",
  timer = "timer",
  endDate = "endDate",
  orders = "orders",
}

type ActionType = {
  type: ACTION_TYPES;
  data?: any;
};

interface ProductListProps {
  list: ProductItem[];
  categories: any[];
  onAction: (e: ActionType) => void;
  loading?: boolean;
}

export function CategoryList(props: ProductListProps) {
  const { list, onAction, categories } = props;

  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto"></div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Tags</th>
            <th>Orders Count</th>
            <th style={{ width: 10 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {list.length ? list.map((i) => {
            return (
              <tr key={i.id} className="hover">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          width={100}
                          src={
                            i.photo_main ||
                            "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=1024x1024&w=is&k=20&c=UQ4nLSvmPcDRCU45WTvex8V39_wHHZBZdJSXe9o_BRs="
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{i.name || "no-title"}</div>
                      <div className="text-sm opacity-50">
                        {i.categories?.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="flex gap-2">
                  {i.categories?.tags.length ?
                    i.categories?.tags.map((t, key: number) => {
                      return (
                        <span
                          key={t.id}
                          className="badge badge-outline badge-sm"
                        >
                          {t.name}
                        </span>
                      );
                    }) : null}
                </td>
                <td>{i.orders || 0}</td>
                <th>
                  <div className="join">
                    <button
                      onClick={() => onAction({ type: "VIEW", data: {slug: i.slug, id: i.id, categories: {name: i.categories?.name}} })}
                      className="join-item btn"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onAction({ type: "EDIT", data: i })}
                      className="join-item btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onAction({ type: "DELETE", data: i.id })}
                      className="join-item btn"
                    >
                      Delete
                    </button>
                  </div>
                  {/* <button className="btn btn-ghost btn-xs">VIEW BANNER</button> */}
                </th>
              </tr>
            );
          }) : <tr>
            <th>No Data</th>
          </tr>}
        </tbody>
      </table>
    </div>
  );
}

function DynamicPhoto(parameters: any): any {
  const [fields, setFields] = useState(['']);

  const addField = () => {
    const newFields = [
      ...fields,
      ''
    ]
    setFields(newFields)
  }

  return (
    <Fragment>
      {fields.map((f, k) => {
        return (
          <InputField key={k} name={`photo_gallery`} label={`ფოტო ${k}`} />
        )
      })}
      <div className="py-4">
        <button onClick={addField} type="button" className="btn btn-block btn-sm">Add photo</button>
      </div>
    </Fragment>
  )
}

export function ProductsPage(props: any) {
  const { list = [], categories = [] } = props;
  const [itemList, setItems] = useState(list);
  const formRef = useRef<FormRef>(null);
  const modalStateType = useRef(null);
  const activeItem = useRef(null);

  const [editItemId, setEditItem] = useState<string | null>(null);

  // const editItem = useMemo(() => {
  //   const item = itemList.find((i: any) => i.id === editItemId);
  //   // console.log('item', item);
  //   return item
  // }, [editItemId, itemList])

  const fetchItems = () => {
    fetch("/api/product")
      .then((r) => r.json())
      .then((r) => {
        // console.log("fetch", r);
        setItems(r);
      });
  };

  const onCategorySubmit = (data: ProductItem) => {
    const {
      id,
      name,
      descriptions,
      photo_gallery,
      photo_main,
      categories,
      categoryId,
      endDate,
      show,
      timer
    } = data;

    // console.log('FormData', data);
    // return;

    const desc = [descriptions]

    // if (modalStateType.current == 'EDIT') {
    //   // console.log('----', data)
    //   fetch("/api/product", {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       id: editItemId,
    //       data: data,
    //     }),
    //   }).then(() => {
    //     fetchItems();
    //     formRef.current?.loading(false);
    //     window.formmodal.close();
    //     setEditItem(null);
    //   });
    //   return;
    // }

    // formRef.current?.loading(true);

    fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(Object.assign(data, {
        descriptions: desc,
        photo_gallery: typeof photo_gallery === 'string' ? [photo_gallery] : photo_gallery
      })),
    }).then((r) => {
      formRef.current?.reset();

      setTimeout(() => {
        formRef.current?.loading(false);
      }, 500);

      fetchItems();
      // window.formmodal.close()
    }).catch((e) => {
      formRef.current?.loading(false);
    });
  };

  const onListAction = (item) => {
    if (item.type === "DELETE") {
      fetch("/api/product", {
        method: "DELETE",
        body: JSON.stringify(item.data),
      }).then(() => {
        fetchItems();
      });
      // modalStateType.current = "DELETE";
    }

    if (item.type === "EDIT") {
      // window.formmodal.showModal();
      // setEditItem(item.data.id);

      // console.log(formRef.current?.ref);

      Object.values(FormFieldsEnum).forEach((e) => {
        const el = formRef.current?.ref?.elements.namedItem(
          e
        ) as HTMLInputElement;
        if (el) {
          el.value = item.data.data[e];
        }
      });
      // modalStateType.current = "EDIT";
      // activeItem.current = item.data;
    }

    if (item.type == 'VIEW') {
      window.open(window.location.origin + '/view/' + item.data.categories.name + '/' + item.data.id, 'blank')
    }
  };

  return (
    <Fragment>
      {editItemId}
      <dialog id="formmodal" className="modal">
        <div className="modal-box">
          <FormContainer
            title={
              modalStateType.current == "EDIT"
                ? "პროდუქტის რედაქტირება"
                : "ახალი პროდუქტის დამატება"
            }
            ref={formRef}
            onSubmit={onCategorySubmit}
          >
            <InputField
              name={FormFieldsEnum.name}
              label={"სახელი"}
              value={"some title"}
            />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">კატეგორია</span>
              </label>
              <select
                name={FormFieldsEnum.categoryId}
                className="select select-bordered"
              >
                {/* <option disabled selected defaultValue={'some'}>
                  კატეგორია
                </option> */}
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <InputField name={FormFieldsEnum.descriptions} label={"აღწერა"} /> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">აღწერა</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
                name={FormFieldsEnum.descriptions}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">ამთვლელი:</span>
                <input
                  type="checkbox"
                  className="toggle"
                  name={FormFieldsEnum.timer}
                  defaultChecked={false}
                />
              </label>
            </div>
            {

            }
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">გამოჩენა:</span>
                <input
                  type="checkbox"
                  className="toggle"
                  name={FormFieldsEnum.show}
                  defaultChecked={true}
                />
              </label>
            </div>
            <div className="divider"></div>
            <InputField
              name={FormFieldsEnum.photo_main}
              label={"მთავარი ფოტო"}
            />
            <DynamicPhoto></DynamicPhoto>
            {/* <InputField name={FormFieldsEnum.photo_2} label={"ფოტო 2"} /> */}
            {/* <InputField name="photo_3" label={"ფოტო 3"} /> */}
            {/* <InputField name="photo_4" label={"ფოტო 4"} /> */}
          </FormContainer>
        </div>
      </dialog>
      <div className="flex px-4 py-8 ">
        <div className="flex-1 m-auto">
          <h1 className="text-xl">პროდუქცია - ({itemList.length})</h1>
        </div>
        <div className="div">
          <button className="btn" onClick={() => window.formmodal.showModal()}>
            პროდუქტის დამატება
          </button>
        </div>
      </div>
      <br />
      <CategoryList
        categories={categories}
        list={itemList}
        onAction={onListAction}
      />
    </Fragment>
  );
}
