'use client'
import { CategoryItem } from "@/app/api/category/route";
import { ForwardRefRenderFunction, Fragment, FunctionComponent, PropsWithChildren, createRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import InputField from "@/components/InputField";
import { FormEvent } from "react";
import AddForm, { FormRef } from "@/components/AddForm";

interface CategoryListProps {
  list: CategoryItem[];
  onAction: any;
  loading?: boolean;
}

export function CategoryList(props: CategoryListProps) {

  const { list, onAction } = props;

  console.log('list', list.length)

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Total products</th>
            <th>Hash tags</th>
            <th style={{ width: 10 }}></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {list.map((i) => {
            return <tr className="hover" key={i.id}>
              {/* <td>{i.id}</td> */}
              <td>{i.data.title}</td>
              <td>{i.data.tags.length}</td>
              <td className="flex flex-wrap">
                {i.data.tags.length ? i.data.tags.map((tag: any, key: number) => {
                  return <div key={key + '-' + i.id} className="badge badge-outline">
                    {tag}
                  </div>
                }) : null}
              </td>
              <td>
                <div className="join">
                  <button className="join-item btn  btn-neutral">Edit</button>
                  <button onClick={() => onAction(i)} className="join-item btn  btn-neutral">Delete</button>
                </div>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export function CategoryPage(props: any) {
  const { list } = props;
  const [itemList, setItems] = useState(list);
  const formRef = useRef<FormRef>(null);

  const fetchItems = () => {
    fetch('/api/category').then((r) => r.json()).then((r) => {
      console.log('fetch', r)
      setItems(r.result);
    })
  }

  const onCategorySubmit = (data: any) => {

    formRef.current?.loading(true);

    fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        tags: data.tags.split(" "),
      }),
    }).then(() => {

      setTimeout(() => {
        formRef.current?.loading(false);
        formRef.current?.reset();
      }, 500);
      fetchItems();
      // window.my_modal_3.close()
    });
  }


  const onListAction = (item: any) => {
    fetch("/api/category", {
      method: "DELETE",
      body: JSON.stringify(item.id),
    }).then(() => {
      fetchItems();
    })
  }

  return (
    <Fragment>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <AddForm title="კატეგორიის დამატება" ref={formRef} onSubmit={onCategorySubmit}>
            <InputField name="title" label={"სახელი"} />
            <InputField name="tags" label={"თეგები"} />
          </AddForm>
        </div>
      </dialog>
      <div className='flex px-4 py-8 '>
        <div className="flex-1 m-auto">
          <h1 className='text-xl'>კატეგორიები - ({list.length})</h1>
        </div>
        <div className="div">
          <button className="btn" onClick={() => window.my_modal_3.showModal()}>ახალი კატეგორია</button>
        </div>
      </div>
      <br />
      <CategoryList list={itemList} onAction={onListAction} />
    </Fragment>
  )
}
