"use client";
import {
  Fragment,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InputField, { FormSelect } from "@/components/InputField";
import FormContainer, { FormRef } from "@/components/Form";
import { ProductModel } from "@/app/api/product/route";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalConfirmation, OnListAction } from "@/utils/action-types";
import { Prisma } from "@prisma/client";
import {
  ArrowSquareOut,
  Copy,
  Pencil,
  Trash,
  TrashSimple,
} from "@phosphor-icons/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import Form, { Field, useForm } from 'rc-field-form';

export enum FormFieldsEnum {
  id = "id",
  name = "name",
  price = "price",
  newPrice = "newPrice",
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

export type ListActions = "EDIT" | "VIEW" | "DELETE" | "COPY";

interface ProductListProps {
  list: ProductModel[];
  categories: any[];
  onAction: (props: OnListAction<ListActions, ProductModel>) => void;
  loading?: boolean;
}

export function CategoryList(props: ProductListProps) {
  const { list, onAction, categories } = props;
  const copyRef = useRef();

  const refsById = useMemo(() => {
    const refs: any = {};
    list.forEach((item: any, index: number) => {
      refs[index] = createRef();
    });
    return refs;
  }, [list]);

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {list.length ? (
            list.map((i, k: number) => {
              return (
                <tr
                  key={i.id}
                  className="hover focus-visible:bg-gray-500 whitespace-nowrap lg:whitespace-normal"
                >
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
                        <div className="font-bold w-[350px] text-ellipsis overflow-hidden">
                          {i.name || "no-title"}
                          {i.timer ? (
                            <div className="badge badge-secondary ml-2">
                              აქცია
                            </div>
                          ) : null}
                        </div>
                        <div className="text-sm opacity-50">
                          {i.categories?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="flex gap-2">
                    {i.categories?.tags.length
                      ? i.categories?.tags.map((t, key: number) => {
                          return (
                            <span
                              key={t.id}
                              className="badge badge-outline badge-sm"
                            >
                              {t.name}
                            </span>
                          );
                        })
                      : null}
                  </td>
                  <td>{i.orders.length || 0}</td>
                  <th>
                    <div className="join flex items-end justify-end">
                      <button
                        onClick={() =>
                          onAction({
                            action: "VIEW",
                            data: i,
                          })
                        }
                        className="join-item btn"
                      >
                        <ArrowSquareOut size={18} />
                        გახსნა
                      </button>
                      <button
                        onClick={() =>
                          onAction({
                            action: "COPY",
                            data: i,
                            ref: refsById[k],
                          })
                        }
                        // data-tip="Copied!"
                        className="join-item btn tooltip tooltip-success"
                      >
                        <Copy size={18} />
                        <div className="visible-[hidden] w-0 h-0 overflow-hidden">
                          <input
                            className=""
                            type="text"
                            ref={refsById[k]}
                            defaultValue={
                              window.location.origin +
                              "/view/" +
                              i.categories?.name +
                              "/" +
                              i.id
                            }
                          />
                        </div>
                      </button>
                      <button
                        onClick={() => onAction({ action: "EDIT", data: i })}
                        className="join-item btn"
                      >
                        <Pencil size={18} />

                        {/* რედაქტირერბა */}
                      </button>
                      <button
                        onClick={() => onAction({ action: "DELETE", data: i })}
                        className="join-item btn"
                      >
                        <Trash size={18} />
                        {/* წაშლა */}
                      </button>
                    </div>
                    {/* <button className="btn btn-ghost btn-xs">VIEW BANNER</button> */}
                  </th>
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

function DynamicPhoto(parameters: any): any {
  const { photos } = parameters;
  const [fields, setFields] = useState([""]);

  useEffect(() => {
    if (photos) setFields(photos);
  }, [photos]);

  const addField = () => {
    const newFields = [...fields, ""];
    setFields(newFields);
  };

  const removeField = (key: number) => {
    const _fields = [...fields].filter((f, k) => k != key);
    console.log(key, _fields);
    setFields(_fields);
  };

  return (
    <Fragment>
      {fields.map((f, k) => {
        return (
          <div key={k} className="flex gap-1 items-end">
            <InputField
              // key={k}
              value={f}
              className="flex-1"
              name={`photo_gallery`}
              label={`ფოტო ${k + 1}`}
            />
            {f.length ? (
              <div>
                <button
                  className="btn btn-error"
                  type="button"
                  onClick={() => removeField(k)}
                >
                  <TrashSimple size={22} />
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
      <div className="py-4">
        <button
          onClick={addField}
          type="button"
          className="btn btn-block btn-sm"
        >
          ფოტოს დამატება
        </button>
      </div>
    </Fragment>
  );
}

// let Inline = Quill.import('blots/inline');
// class BoldBlot extends Inline {}
// BoldBlot.blotName = 'bold';
// BoldBlot.tagName = 'strong';
// Quill.register('formats/bold', BoldBlot);

// var BackgroundClass = Quill.import('attributors/class/background');
// var ColorClass = Quill.import('attributors/class/color');
// var SizeStyle = Quill.import('attributors/style/size');
// Quill.register(BackgroundClass, false);
// Quill.register(ColorClass, false);
// Quill.register(SizeStyle, false);

const formats = ["bold"]; // add custom format name + any built-in formats you need

const initialFormState = {
  [FormFieldsEnum.name]: "",
  [FormFieldsEnum.price]: "",
  [FormFieldsEnum.newPrice]: "",
  [FormFieldsEnum.categoryId]: "",
  [FormFieldsEnum.descriptions]: "",
  [FormFieldsEnum.timer]: false,
  [FormFieldsEnum.endDate]: "",
  [FormFieldsEnum.show]: true,
  [FormFieldsEnum.photo_main]: "",
  [FormFieldsEnum.photo_gallery]: [""],
};

export function ProductsPage(props: any) {
  const { list = [], categories = [] } = props;
  const [itemList, setItems] = useState(list);
  const [value, setValue] = useState("");
  const formRef = createRef<FormRef>();
  const quilRef = useRef(null);

  const [formRefState] = useForm();
  
  console.log("list", list);

  const [formState, setFormState] = useState<any>({ ...initialFormState });
  const [formMode, setFormMode] = useState<ListActions | null>(null);
  const activeItemRef = useRef<ProductModel | null>(null);

  const fetchItems = async () => {
    return fetch("/api/product")
      .then((r) => r.json())
      .then((r) => {
        setItems(r);
      });
  };

  useEffect(() => {
    if (formMode == null) {
      activeItemRef.current = null;
    }
  }, [formMode]);

  useEffect(() => {
    // if (!window) {return}
    window.modalform.addEventListener("close", (e) => {
      setFormMode(null);
      setFormState({ ...initialFormState });
      formRef.current?.reset();
    });
  }, []);

  const updateForm = (value) => {};

  const onCategorySubmit = (data: ProductModel) => {
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
      timer,
    } = data;

    console.log(data);

    const desc = [value];
    let METHOD = "POST";
    const payload = {};

    if (formMode == "EDIT") {
      METHOD = "PUT";
      Object.assign(payload, {
        id: activeItemRef.current?.id,
        categoryId: categoryId,
        descriptions: value,
      });
      console.log("-quilRef.current", quilRef.current);
      console.log("-formState", formState);
      // return;
    } else {
      Object.assign(payload, data);
    }


    formRef.current?.setLoading(true);

    fetch("/api/product", {
      method: METHOD,
      body: JSON.stringify(
        Object.assign(payload, {
          name: data.name,
          price: data.price,
          newPrice: data.newPrice || "",
          descriptions: desc,
          timer: data.timer,
          endDate: data.endDate ? new Date(data.endDate) : null,
          show: data.show,
          photo_main: data.photo_main,
          photo_gallery:
            typeof photo_gallery === "string"
              ? [photo_gallery]
              : photo_gallery.filter((i) => i.length),
        })
      ),
    })
      .then((r) => {
        return r.json();
      })
      .then((r: any) => {
        if (formMode == "EDIT") {
          setFormState(r);
          activeItemRef.current = r;
        }

        const _formRef = formRef.current;

        fetchItems().then((r) => {
          _formRef?.setLoading(false);
        });
      })
      .catch((e) => {
        formRef.current?.setLoading(false);
      });
  };

  const onListAction = (e: OnListAction<ListActions, ProductModel>) => {
    const { id, categoryId, slug, ...formData } = e.data;

    // console.log("E - Date", e.data);
    // console.log("E - formRefState", formRefState);
    // formRefState.setFieldsValue({

    // })




    // return;
    switch (e.action) {
      case "DELETE":
        setFormState({ ...formData, endDate: getDateValue(formData.endDate) });
        setFormMode(e.action);
        activeItemRef.current = e.data;
        window.modalConfirm.showModal();
        break;
      case "EDIT":
        setFormState({
          ...formData,
          categoryId: e.data.categoryId,
          endDate: getDateValue(formData.endDate),
        });
        setFormMode(e.action);
        // setValue(e.data.descriptions[0])
        quilRef.current.setEditorContents(
          quilRef.current.editor,
          e.data.descriptions[0]
        );
        console.log("quill", quilRef.current);
        activeItemRef.current = e.data;
        window.modalform.showModal();
        break;
      case "VIEW":
        window.open(
          window.location.origin +
            "/view/" +
            e.data?.categories?.name +
            "/" +
            e.data.id,
          "blank"
        );
        // activeRef.current = item.data;
        break;
      case "COPY":
        if (e.ref.current) {
          e.ref.current.select();
          document.execCommand("copy");
        }
        break;
      default:
        break;
    }
  };

  const getDateValue = (date) => {
    if (!date) return "";

    const dateObj = typeof date == "string" ? new Date(date) : date;

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  const onModalConfirmAction = (value: ModalConfirmation) => {
    switch (value) {
      case "YES":
        if (formMode == "DELETE") {
          if (!activeItemRef.current) {
            return;
          }
          formRef.current?.setLoading(true);
          fetch("/api/product", {
            method: "DELETE",
            body: JSON.stringify(activeItemRef.current.id),
          }).then(() => {
            fetchItems().then((e) => {
              formRef.current?.setLoading(false);
              window.modalConfirm.close();
            });
          });
        }
        break;
      case "NO":
        setFormMode(null);
        setFormState(initialFormState);
        window.modalConfirm.close();
        activeItemRef.current = null;
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      {/* <div className="toast toast-bottom z-10 toast-center">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div> */}
      <dialog id="modalform" className="modal">
        <div className="modal-box">
          <FormContainer
            ref={formRef}
            title={
              formMode == "EDIT"
                ? "პროდუქტის რედაქტირება"
                : "პროდუქტის დამატება"
            }
            onSubmit={(e) => {
              onCategorySubmit(e);
            }}
          >
            <InputField
              name={FormFieldsEnum.name}
              label={"სახელი"}
              value={formState[FormFieldsEnum.name]}
            />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">კატეგორია</span>
              </label>
              <select
                name={FormFieldsEnum.categoryId}
                className="select select-bordered"
                defaultValue={formState[FormFieldsEnum.categoryId]}
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
            <InputField
              name={FormFieldsEnum.price}
              label={"ფასი"}
              value={formState[FormFieldsEnum.price]}
            />
            {/* <InputField name={FormFieldsEnum.descriptions} label={"აღწერა"} /> */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">აღწერა</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <ReactQuill
                ref={quilRef}
                theme="snow"
                defaultValue={formState[FormFieldsEnum.descriptions]}
                // name={FormFieldsEnum.descriptions}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    [{ align: [] }],
                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ list: "ordered" }, { list: "bullet" }],

                    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],

                    // ['clean']                                         // remove formatting button
                  ],
                }}
                // formats={formats}
                onChange={setValue}
              />
              {/* <textarea
                className="textarea textarea-bordered h-24"
                // placeholder="აღწერა"
                defaultValue={formState[FormFieldsEnum.descriptions]}
              ></textarea> */}
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">აქცია:</span>
                <input
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      timer: e.target.checked,
                    });
                  }}
                  type="checkbox"
                  className="toggle"
                  name={FormFieldsEnum.timer}
                  checked={formState[FormFieldsEnum.timer]}
                />
              </label>
            </div>
            {formState[FormFieldsEnum.timer] ? (
              <div>
                <div className="divider"></div>
                <InputField
                  name={FormFieldsEnum.newPrice}
                  label={"აქციის ფასი"}
                  type={"text"}
                  value={formState[FormFieldsEnum.newPrice]}
                />
                <InputField
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      endDate: getDateValue(e.target.value),
                    });
                  }}
                  name={FormFieldsEnum.endDate}
                  label={"აქციის დასრულების თარიღი"}
                  type={"date"}
                  value={formState[FormFieldsEnum.endDate]}
                />
                <div className="divider"></div>
              </div>
            ) : null}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">გამოჩენა:</span>
                <input
                  type="checkbox"
                  className="toggle"
                  name={FormFieldsEnum.show}
                  defaultChecked={formState[FormFieldsEnum.show]}
                />
              </label>
            </div>
            <div className="divider"></div>
            <InputField
              name={FormFieldsEnum.photo_main}
              value={formState[FormFieldsEnum.photo_main]}
              label={"მთავარი ფოტო"}
            />
            <DynamicPhoto
              photos={formState[FormFieldsEnum.photo_gallery]}
            ></DynamicPhoto>
            {/* <InputField name={FormFieldsEnum.photo_2} label={"ფოტო 2"} /> */}
            {/* <InputField name="photo_3" label={"ფოტო 3"} /> */}
            {/* <InputField name="photo_4" label={"ფოტო 4"} /> */}
          </FormContainer>
        </div>
      </dialog>
      <dialog id="modalConfirm" className="modal">
        <div className="modal-box">
          <h2 className="card-title mb-4">დარწმუნებული ხართ?</h2>
          {formMode == "DELETE" ? (
            <div>
              <p className="mb-4">წაშლა:</p>
              <div className="flex flex-col gap-3">
                <div>
                  <img
                    className="w-max-md"
                    src={
                      activeItemRef.current?.photo_main ||
                      "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=1024x1024&w=is&k=20&c=UQ4nLSvmPcDRCU45WTvex8V39_wHHZBZdJSXe9o_BRs="
                    }
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
                <div>
                  პროდუქტი:{" "}
                  <span className="font-bold">
                    {activeItemRef.current?.name}
                  </span>
                </div>
              </div>
            </div>
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
      <div className="flex px-4 py-8 ">
        <div className="flex-1 m-auto">
          <h1 className="text-xl">პროდუქცია - ({itemList.length})</h1>
        </div>
        <div className="div">
          <button
            className="btn"
            onClick={() => {
              formRef.current?.reset();
              window.modalform.showModal();
            }}
          >
            პროდუქტის დამატება
          </button>
        </div>
      </div>
      <br />
      {/* <Form
      initialValues={{
        username: 'some',
        password: 'somePass',
        select: '3'
      }}
      onFinish={(values) => {
        console.log("Finish:", values);
      }}
    >
      <Field name="username">
        <InputField placeholder="Username" />
      </Field>
      <Field name="password">
        <InputField placeholder="Password" />
      </Field>
      <Field name='select'>
        <FormSelect fields={[{id: 1, name: 'some'},{id: 2, name: 'some 2'},{id: 3, name: 'some 3'}]} />
        </Field>
      <button>Submit</button>
    </Form> */}
      <CategoryList
        categories={categories}
        list={itemList}
        onAction={onListAction}
      />
    </Fragment>
  );
}
