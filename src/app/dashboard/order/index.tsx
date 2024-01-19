"use client";
import { Fragment, useState } from "react";
import InputField from "@/components/InputField";
import FormContainer from "@/components/Form";
import { ModalConfirmation, OnListAction } from "@/utils/action-types";
import { ProductModel } from "@/app/api/product/route";
import { format } from "date-fns";
import { es, ka } from "date-fns/locale";
import { Phone, Trash } from "@phosphor-icons/react";

export type ListActions = "CALL" | "DELETE";

type OrderModel = {
  id: string;
  fullName: string;
  phoneNumber: number;
  createdAt: Date;
  product: ProductModel
}


interface CategoryListProps {
  list: OrderModel[];
  onAction: (props: OnListAction<ListActions, OrderModel>) => void;
  loading?: boolean;
}

export function CategoryList(props: CategoryListProps) {
  const { list, onAction } = props;

  return (
    
      <div className="overflow-x-auto w-full">
        
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>პროდუქტი</th>
              <th>სახელი გვარი</th>
              <th>ქალაქი/რაიონი</th>
              <th>ნომერი</th>
              <th>თარიღი</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.length ? list.map((i, key: number) => {
              return (
                <tr className="hover cursor-pointer whitespace-nowrap" key={i.id}>
                  <td>{key}</td>
                  <td className="w-[200px]">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            width={100}
                            src={
                              i.product.photo_main ||
                              "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=1024x1024&w=is&k=20&c=UQ4nLSvmPcDRCU45WTvex8V39_wHHZBZdJSXe9o_BRs="
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold w-[300px] whitespace-normal text-ellipsis overflow-hidden">{i.product.name || "-"}</div>
                        <div className="text-sm opacity-50">
                          {i.product.categories?.name || '-'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{i.fullName}</td>
                  <td>{i.cityRegion ? i.cityRegion.name : '-'}</td>
                  <td><a href={`tel:${i.phoneNumber}`} className="underline">{i.phoneNumber}</a></td>
                  <td>{
                    i.createdAt ?
                      <span>
                        <p>{format(new Date(i.createdAt), 'EEEE', {
                          locale: ka
                        })}</p>
                        <p>{format(new Date(i.createdAt), 'dd-MM-yyyy')}</p>
                        <p>{format(new Date(i.createdAt), 'hh:mm:ss aa', {
                          locale: ka
                        })}</p>
                      </span>
                      : '-'
                  }</td>
                  
                  <td>
                    <div className="join flex items-end justify-end">
                      <a href={`tel:${i.phoneNumber}`}
                        onClick={() => onAction({ action: "CALL", data: i })}
                        className="join-item btn"
                      >
                        <Phone size={18} />
                        დარეკვა
                      </a>
                      <button
                        onClick={() => onAction({ action: "DELETE", data: i })}
                        className="join-item btn"
                      >
                        <Trash size={18} />
                        წაშლა
                      </button>
                    </div>
                  </td>
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

export function OrderPage(props: any) {
  const { list } = props;
  const [itemList, setItems] = useState(list);
  const [formMode, setFormMode] = useState<ListActions | null>(null)
  const [activeItem, setActiveItem] = useState<OrderModel | null>(null)

  const fetchItems = async () => {
    return fetch("/api/order")
      .then((r) => r.json())
      .then((r) => {
        setItems(r);
      });
  };

  const onListAction = (e: OnListAction<ListActions, OrderModel>) => {

    switch (e.action) {
      case "CALL":
        break;
      case 'DELETE':
        window.modalConfirm.showModal();
        setFormMode(e.action);
        setActiveItem(e.data);
        break;
      default:
        break;
    }
  };

  const onModalConfirmAction = (value: ModalConfirmation) => {
    switch (value) {
      case "YES":
        if (formMode == 'DELETE' && activeItem) {
          fetch("/api/order", {
            method: 'DELETE',
            body: JSON.stringify(activeItem.id),
          }).then(() => {
            window.modalConfirm.close();
            setFormMode(null);
            setActiveItem(null);
            fetchItems();
          })
        }
        break;
      case 'NO':
        window.modalConfirm.close();
        setFormMode(null);
        setActiveItem(null);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <dialog id="modalConfirm" className="modal">
        <div className="modal-box">
          <h2 className="card-title mb-4">დარწმუნებული ხართ?</h2>
          {formMode == "DELETE" ? (
            <div>
              <p className="mb-4">წაშლა:</p>
              <div className="mb-4">ID: <span className="">{activeItem?.id}</span></div>

              <div className="flex flex-col gap-3">
                <div>
                  <img
                    className="w-max-md"
                    src={
                      activeItem?.product.photo_main ||
                      "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=1024x1024&w=is&k=20&c=UQ4nLSvmPcDRCU45WTvex8V39_wHHZBZdJSXe9o_BRs="
                    }
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
                <div>სახელი გვარი: <span className="font-bold">{activeItem?.fullName}</span></div>
                <div>ნომერი: <span className="font-bold">{activeItem?.phoneNumber}</span></div>
                <div>პროდუქტი: <span className="font-bold">{activeItem?.product.name}</span></div>
              </div>
            </div>
          ) : null}
          <div className="card-actions justify-end">
            <button
              className="btn btn-ghost"
              onClick={() => onModalConfirmAction('NO')}
            >
              გაუქმება
            </button>
            <button className="btn btn-error" onClick={() => onModalConfirmAction('YES')}>
              წაშლა
            </button>
          </div>
        </div>
      </dialog>
      <div className="flex px-4 py-8 ">
        <div className="flex-1 m-auto">
          <h1 className="text-xl">შეკვეთები - ({list.length})</h1>
        </div>
      </div>
      <br />
      <CategoryList list={itemList} onAction={onListAction} />
    </Fragment>
  );
}
