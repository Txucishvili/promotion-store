'use client'
import { ForwardRefRenderFunction, Fragment, FunctionComponent, PropsWithChildren, createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import InputField from "@/components/InputField";
import { FormEvent } from "react";
import FormContainer, { FormRef } from "@/components/Form";
import { Category } from '@/app/api/category/route';

interface CategoryListProps {
  list: Category[];
  onAction: any;
  loading?: boolean;
}

export function CategoryList(props: CategoryListProps) {

  const { list, onAction } = props;

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
              <td>{i.name}</td>
              <td>{i.tags.length}</td>
              <td className="flex gap-2">
                {i.tags.length ? i.tags.map((tag: any, key: number) => {
                  return <div key={key + '-' + i.id} className="badge badge-outline">
                    {tag.name}
                  </div>
                }) : null}
              </td>
              <td>
                <div className="join">
                  <button className="join-item btn">Edit</button>
                  <button onClick={() => onAction(i)} className="join-item btn">Delete</button>
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

  // console.log('list', list)
  // return null

  const fetchItems = () => {
    fetch('/api/category').then((r) => r.json()).then((r) => {
      // console.log('r', r)
      setItems(r);
    })
  }

  useEffect(() => {
    fetchItems();
  }, [])

  const onCategorySubmit = (data: any) => {
    formRef.current?.loading(true);

    // console.log('data', data);
    fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        tags: data.tags.split(' ').map((t: any) => t.replace('#', '')),
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
      <dialog id="formmodal" className="modal">
        <div className="modal-box">
          <FormContainer title="კატეგორიის დამატება" ref={formRef} onSubmit={onCategorySubmit}>
            <InputField name="title" label={"სახელი"} />
            <InputField name="tags" label={"თეგები"} />
          </FormContainer>
        </div>
      </dialog>
      <div className='flex px-4 py-8 '>
        <div className="flex-1 m-auto">
          <h1 className='text-xl'>კატეგორიები - ({list.length})</h1>
        </div>
        <div className="div">
          <button className="btn" onClick={() => window.formmodal.showModal()}>ახალი კატეგორია</button>
        </div>
      </div>
      <br />
      <CategoryList list={itemList} onAction={onListAction} />
    </Fragment>
  )
}
