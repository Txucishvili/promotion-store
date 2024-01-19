"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import InputField from "@/components/InputField";
import FormContainer, { FormRef } from "@/components/Form";
import { Category } from "@/app/api/category/route";
import { ModalConfirmation, OnListAction } from "@/utils/action-types";
import { Pencil, Trash } from "@phosphor-icons/react";

export type ListActions = "EDIT" | "SAVE" | "VIEW" | "DELETE";

interface CategoryListProps {
  list: Category[];
  onAction: (props: OnListAction<ListActions, Category>) => void;
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {list.length ? (
            list.map((i) => {
              return (
                <tr className="hover" key={i.id}>
                  {/* <td>{i.id}</td> */}
                  <td>{i.name}</td>
                  <td>{i.tags.length}</td>
                  <td className="flex gap-2">
                    {i.tags.length
                      ? i.tags.map((tag: any, key: number) => {
                        return (
                          <div
                            key={key + "-" + i.id}
                            className="badge badge-outline"
                          >
                            {tag.name}
                          </div>
                        );
                      })
                      : null}
                  </td>
                  <td>
                    <div className="join flex items-end justify-end">
                      <button
                        onClick={() => onAction({ action: "EDIT", data: i })}
                        className="join-item btn"
                      >
                        <Pencil size={18} />
                        {/* შეცვლა */}
                      </button>
                      <button
                        onClick={() => onAction({ action: "DELETE", data: i })}
                        className="join-item btn"
                      >
                        <Trash size={18} />
                        {/* წაშლა */}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <th>No Data</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const initialFormStatet = {
  name: null,
  tags: null,
};

export function CategoryPage(props: any) {
  const { list } = props;
  const [itemList, setItems] = useState(list);
  const formRef = useRef<FormRef>(null);
  const [formState, setFormState] = useState<Category | null>(
    initialFormStatet
  );
  const [formMode, setFormMode] = useState<ListActionsEnum | null>(null);
  const formStateRef = useRef<Category | null>(null);

  const fetchItems = async () => {
    return fetch("/api/category")
      .then((r) => r.json())
      .then((r) => {
        setItems(r);
      });
  };

  useEffect(() => {
    // fetchItems();
    window.modalform.addEventListener("close", (e) => {
      setFormMode(null);
      setFormState(initialFormStatet);
      formStateRef.current = null;

    });
  }, []);

  const onSubmit = (data: Category) => {
    let METHOD = "POST";

    const formState = {
      ...data,
      tags: data.tags.split(" ").map((t: any) => t.replace("#", "")),
    };

    if (formMode == "EDIT") {
      METHOD = "PUT";
      Object.assign(formState, {
        id: formStateRef.current?.id,
      });
    }

    formRef.current?.setLoading(true);

    fetch("/api/category", {
      method: METHOD,
      body: JSON.stringify(formState),
    }).then(() => {
      fetchItems().then((r) => {
        setTimeout(() => {
          if (formMode != "EDIT") {
          } else {
            window.modalform.close();

          }
          formRef.current?.reset();
          formRef.current?.setLoading(false);
        }, 500);
      });
    });
  };

  const onAddNew = () => {
    window.modalform.showModal();
  };

  const onListAction = (item: OnListAction<ListActions, Category>) => {
    setFormMode(item.action);
    setFormState(item.data);
    formStateRef.current = item.data;


    switch (item.action) {
      case "DELETE":
        window.modalConfirm.showModal();
        break;
      case "EDIT":
        window.modalform.showModal();
        // activeRef.current = item.data;
        break;
      default:
        break;
    }
  };

  const onModalConfirmAction = (value: ModalConfirmation) => {
    switch (value) {
      case "YES":
        if (formMode == "DELETE") {
          fetch("/api/category", {
            method: "DELETE",
            body: JSON.stringify(formState?.id),
          }).then(() => {
            fetchItems().then((e) => {
              window.modalConfirm.close();
            });
          });
        }
        break;
      case "NO":
        setFormMode(null);
        setFormState(null);
        window.modalConfirm.close();
        formStateRef.current = null;
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
            <p>
              წაშლა <span className="underline">{formState?.name}</span>
            </p>
          ) : null}
          <div className="card-actions justify-end">
            <button
              className="btn btn-ghost"
              onClick={() => onModalConfirmAction("NO")}
            >
              გაუქმება
            </button>
            <button
              className="btn btn-error"
              onClick={() => onModalConfirmAction("YES")}
            >
              წაშლა
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="modalform" className="modal">
        <div className="modal-box">
          <FormContainer
            title={
              formMode == "EDIT"
                ? "კატეგორიის რედაქტირება"
                : "კატეგორიის დამატება"
            }
            ref={formRef}
            onSubmit={onSubmit}
          >
            <InputField
              name="name"
              value={formState?.name}
              label={"სახელი"}
            />
            <InputField
              className={formMode == "EDIT" ? "hidden" : ""}
              name="tags"
              value={formState?.tags}
              label={"თეგები"}
            />
          </FormContainer>
        </div>
      </dialog>
      <div className="flex px-4 py-8 ">
        <div className="flex-1 m-auto">
          <h1 className="text-xl">კატეგორიები - ({list.length})</h1>
        </div>
        <div className="div">
          <button className="btn" onClick={onAddNew}>
            ახალი კატეგორია
          </button>
        </div>
      </div>
      <br />
      <CategoryList list={itemList} onAction={onListAction} />
    </Fragment>
  );
}
