"use client";

import Image from "next/image";
import { AddModalAction } from "..";
import InputField from "@/components/InputField";
import { FormEvent } from "react";

const AddNewModal = () => {
	return (
		<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
			<form method="dialog" className="modal-box">
				<h3 className="font-bold text-lg">Hello!</h3>
				<p className="py-4">Press ESC key or click the button below to close</p>
				<div className="modal-action">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn">Close</button>
				</div>
			</form>
		</dialog>
	);
};

export default function Home() {
	const onAddClick = () => {
		// window.my_modal_5.showModal()
	};
	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("e", e);
		const element = e.currentTarget.elements.namedItem(
			"title"
		) as HTMLInputElement;
		console.log("element", element.value);
		fetch("/api/save", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: true
      })
		});
	};
	return (
		<main>
			<form
				onSubmit={handleForm}
				action="/api/save"
				method="post"
				className="shadow-xl p-12 max-w-lg mx-auto"
			>
				<h3 className="font-bold text-lg">Add new Category</h3>
				<InputField name="title" label={"Name"} />
				{/* <InputField label={''} /> */}
				<div className="modal-action">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn" type="submit">
						Save
					</button>
				</div>
			</form>
		</main>
	);
}
