'use client'

import InputField from "@/components/InputField"
import Link from "next/link"

const AddModalAction = () => {
  return (
    <div>
      {/* <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <InputField
        />
        <div className="modal-action">
          <button className="btn">Save</button>
        </div>

      </form> */}
      <Link href={'/dashboard/category/create'} className="btn btn-success join-item">კატეგორიის დამატება</Link>
    </div>
  )
}
export { AddModalAction }