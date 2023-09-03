import { ProductItem } from "@/app/api/product/route";
import {
	FormEvent,
	ForwardRefRenderFunction,
	PropsWithChildren,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

export interface FormRef {
	isLoading: boolean;
	loading: any;
	reset: any;
	toggleCheckmark: any;
	ref: HTMLFormElement | null;
}

export interface ComponentProps {
	onSubmit: (a: ProductItem) => void;
	loading?: boolean;
	title: string;
}

const Form: ForwardRefRenderFunction<
	FormRef,
	PropsWithChildren<ComponentProps>
> = (props, ref) => {
	const { loading = false, children, title } = props;
	const [isLoading, setLoading] = useState(loading);
	const inputRef = useRef<HTMLFormElement>(null);
	const [isCheckmark, setMark] = useState(false);

	useEffect(() => {
		// inputRef.current?.elements[0].setAttribute('pattern', '[A-Za-z]+');
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				ref: inputRef.current,
				loading: (value: boolean) => {
					setLoading(value);
				},
				isLoading: isLoading,
				toggleCheckmark: () => {
					setMark(!isCheckmark);

					const timeoutID = setTimeout(() => {
						setMark(false);
					}, 1000);
				},
				reset: () => {
					inputRef.current?.reset();
				},
			};
		},
		[isLoading, isCheckmark]
	);

	const handleForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const elements: HTMLFormControlsCollection = e.currentTarget.elements;
		const formFileds: any = {};

		const elementNames = new Set(
			Array.from(elements)
				.filter((i: HTMLInputElement) => i.name.length)
				.map((i: HTMLInputElement) => String(i.name))
		);

		for (const key of Array.from(elementNames)) {
			if (Object.prototype.hasOwnProperty.call(elements, key)) {
				const element = elements.namedItem(
					key
				) as HTMLInputElement;

				if (element instanceof RadioNodeList) {
					for (const i of Array.from(element) as HTMLInputElement[]) {
						if (i.type === "radio") {
							Object.assign(formFileds, {
								[key]: element.value,
							});
							continue;
						}

						if (i.type == "checkbox") {
							if (!formFileds[key]) {
								Object.assign(formFileds, {
									[key]: [],
								});
							}

							if (i.checked) {
								Object.assign(formFileds, {
									[key]: formFileds[key].concat(i.value),
								});
							}
							continue;
						}

						if (!formFileds[key]) {
							Object.assign(formFileds, {
								[key]: [i.value],
							});
						} else {
							Object.assign(formFileds, {
								[key]: formFileds[key].concat(i.value),
							});
						}
						continue;
					}
					continue;
				}

				if (element.type == "checkbox") {
					Object.assign(formFileds, {
						[element.name]: element.checked,
					});
					continue;
				}

				Object.assign(formFileds, {
					[element.name]: element.value,
				});
			}
		}
		// console.log("element", formFileds);

		props.onSubmit(formFileds);
	};
	return (
		<form onSubmit={handleForm} ref={inputRef} method="POST">
			<h3 className="font-bold text-lg">{title}</h3>
			<div className="divider"></div>
			{children}
			{/* <InputField label={''} /> */}
			<div className="modal-action">
				{isCheckmark && !isLoading ? (
					<div
						className="flex justify-center align-middle"
						style={{ width: 24 }}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none" />
							<polyline
								points="40 144 96 200 224 72"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="16"
							/>
						</svg>
					</div>
				) : null}
				{isLoading ? (
					<span className="loading loading-spinner text-primary"></span>
				) : null}
				{/* if there is a button in form, it will close the modal */}
				<button
					type="button"
					onClick={() => {
						window.formmodal.close();
					}}
					className="btn"
				>
					დახურვა
				</button>
				<button
					className={["btn btn-success", isLoading ? "disabled" : ""]
						.join()
						.replace(",", "")}
					disabled={isLoading}
					type="submit"
				>
					შენახვა
				</button>
			</div>
		</form>
	);
};

export const FormContainer = forwardRef(Form);
export default FormContainer;
