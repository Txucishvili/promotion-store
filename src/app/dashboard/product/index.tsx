"use client";
import { Fragment, useMemo, useRef, useState } from "react";
import InputField from "@/components/InputField";
import AddForm, { FormRef } from "@/components/AddForm";
import { ProductItem } from "@/app/api/product/route";
import { CategoryItem } from "@/app/api/category/route";
import Image from "next/image";

export type ACTION_TYPES = 'EDIT' | 'DELETE' | 'SAVE';

export enum FormFieldsEnum {
  id = 'id',
  name = 'name',
  category = 'category',
  categoryId = 'categoryId',
  photo_main = 'photo_main',
  photo_1 = 'photo_1',
  desc_1 = 'desc_1',
  desc_2 = 'desc_2',
  timer = 'timer',
  show = 'show',
  bio = 'bio'
}

type ActionType = {
  type: ACTION_TYPES;
  data?: any;
};

interface ProductListProps {
  list: ProductItem[];
  categories: CategoryItem[];
  onAction: (e: ActionType) => void;
  loading?: boolean;
}

export function CategoryList(props: ProductListProps) {
  const { list, onAction, categories } = props;

  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto"></div>
      {FormFieldsEnum.category}
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
          {list.map((i) => {
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
                      <div className="font-bold">
                        {i.title || "no-title"}
                      </div>
                      <div className="text-sm opacity-50">
                        {categories.find((item) => item.id == i.data.categoryId)
                          ?.data.title || "no category"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {/* {categories.find(item => (item.id == i.data.categoryId))?.data.title} */}
                  {
                    categories.find((item) => item.id == i.data.categoryId)
                      ?.data.tags ? categories.find((item) => item.id == i.data.categoryId)
                        ?.data.tags.map((t, key: number) => {
                          return <span key={key + '-' + t} className="badge badge-ghost badge-sm">
                            {t}
                          </span>
                        }) : 'no tags'
                  }
                </td>
                <td>{i.orders || 0}</td>
                <th>
                  <div className="join">
                    <button onClick={() => onAction({ type: 'EDIT', data: i })} className="join-item btn  btn-neutral">Edit</button>
                    <button
                      onClick={() => onAction({ type: 'DELETE', data: i.id })}
                      className="join-item btn  btn-neutral"
                    >
                      Delete
                    </button>
                  </div>
                  {/* <button className="btn btn-ghost btn-xs">VIEW BANNER</button> */}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ProductsPage(props: any) {
  const { list = [], categories = [] } = props;
  const [itemList, setItems] = useState(list);
  const formRef = useRef<FormRef>(null);
  const modalStateType = useRef(null);
  const activeItem = useRef(null);

  console.log('object', list, categories);


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
        setItems(r.result);
      });
  };

  const onCategorySubmit = (data: ProductItem) => {
    const {
      title,
      categoryId,
      category,
      desc_1,
      desc_2,
      photo_main,
      photo_1,
      timer,
      bio,
      show,
    } = data;
    formRef.current?.loading(true);

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

    console.log('r', data);


    fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => {
      console.log('r', r);
      return;
      formRef.current?.reset();
      setTimeout(() => {
        formRef.current?.loading(false);
      }, 500);

      // fetchItems();
      // window.formmodal.close()
    });
  };

  const onListAction = (item: ActionType) => {
    if (item.type === 'DELETE') {
      fetch("/api/product", {
        method: "DELETE",
        body: JSON.stringify(item.data),
      }).then(() => {
        fetchItems();
      });
      modalStateType.current = 'DELETE';
    }

    if (item.type === 'EDIT') {
      window.formmodal.showModal();
      setEditItem(item.data.id);

      // console.log(formRef.current?.ref);

      Object.values(FormFieldsEnum).forEach((e) => {
        const el = formRef.current?.ref?.elements.namedItem(e) as HTMLInputElement;
        if (el) {
          el.value = item.data.data[e];
        }
      })
      modalStateType.current = 'EDIT';
      activeItem.current = item.data;
    }
  };

  return (

    <Fragment>
      {editItemId}
      <dialog id="formmodal" className="modal">
        <div className="modal-box">
          <AddForm
            title={modalStateType.current == 'EDIT' ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტის დამატება"}
            ref={formRef}
            onSubmit={onCategorySubmit}
          >
            <InputField name={FormFieldsEnum.name} label={"სახელი"} value={'some title'} />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">კატეგორია</span>
              </label>
              <select name={FormFieldsEnum.categoryId} className="select select-bordered">
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

            {/* <InputField name="categoryId" label={"კატეგორია"} /> */}
            <InputField name={FormFieldsEnum.desc_1} label={"აღწერა"} />
            <InputField name={FormFieldsEnum.desc_2} label={"აღწერა 2"} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your bio</span>
                <span className="label-text-alt">Alt label</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
                name="bio"
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
            <InputField name={FormFieldsEnum.photo_main} label={"მთავარი ფოტო"} />
            <InputField name={FormFieldsEnum.photo_1} label={"ფოტო 1"} />
            <InputField name={FormFieldsEnum.photo_2} label={"ფოტო 2"} />
            <InputField name="photo_3" label={"ფოტო 3"} />
            <InputField name="photo_4" label={"ფოტო 4"} />
          </AddForm>
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
