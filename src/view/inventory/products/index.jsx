'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import { BsImageAlt } from "react-icons/bs";
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'

export default function ProductCreateForm() {
  const { register, handleSubmit } = useForm()
  const [preview, setPreview] = useState(null)

  // Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data) => {
    console.log('Product Data:', data)
    alert('✅ Product Created Successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Image */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Product Image
            </h3>

            <div className="flex items-center gap-6">
              {/* Hidden Input */}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Profile Preview */}
              <label
                htmlFor="imageUpload"
                className="relative w-15 h-15 cursor-pointer group"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Lead Profile"
                    fill
                    className="object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-15 h-15 rounded-full overflow-hidden border  border-gray-400 flex items-center justify-center text-gray-400 text-sm group-hover:bg-gray-50 transition">
                    <BsImageAlt className="h-13 w-13 mt-3 " />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Product Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Product Owner :
                  </label>
                  <Input
                    type="text"
                    {...register('productOwner')}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Product Code :
                  </label>
                  <Input type="text" {...register('productCode')} />
                </div>

                <div className="flex items-center">
                  <label className="w-32 mr-5 text-sm text-gray-600">
                    Product Active :
                  </label>
                  <input
                    {...register('productActive')}
                    type="checkbox"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Product Category :
                  </label>
                  <Select
                    {...register('category')}
                    options={[
                      { value: 'Electronics', label: 'Electronics' },
                      { value: 'Clothing', label: 'Clothing' },
                      { value: 'Software', label: 'Software' },
                      { value: 'Accessories', label: 'Accessories' },
                      { value: 'Other', label: 'Other' },
                    ]}
                    placeholder="-None-"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Sales End Date :
                  </label>
                  <Input type="date" {...register('salesEndDate')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Support End Date :
                  </label>
                  <Input type="date" {...register('supportEndDate')} />
                </div>
              </div>



              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Product Name :
                  </label>
                  <Input type="text" {...register('productName')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Vendor Name :
                  </label>
                  <Input type="text" {...register('vendorName')}  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Manufacturer :
                  </label>
                  <Select
                    {...register('manufacturer')}
                    options={[
                      { value: 'Samsung', label: 'Samsung' },
                      { value: 'Apple', label: 'Apple' },
                      { value: 'Sony', label: 'Sony' },
                      { value: 'Dell', label: 'Dell' },
                      { value: 'Other', label: 'Other' },
                    ]}
                    placeholder="-None-"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Sales Start Date :
                  </label>
                  <Input type="date" {...register('salesStartDate')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Support Start Date :
                  </label>
                  <Input type="date" {...register('supportStartDate')} />
                </div>
              </div>
            </div>
          </div>

          {/* Price Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Price Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Unit Price :</label>
                <Input type="text" {...register('unitPrice')} placeholder="$" />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Commission Rate :
                </label>
                <Input type="text" {...register('commissionRate')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Tax :</label>
                <Input type="text" {...register('tax')} />
              </div>


              <div className="flex items-center">
                <label className="w-32 mr-5 text-sm text-gray-600">Taxable :</label>
                <input
                  {...register('taxable')}
                  type="checkbox"
                />
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Stock Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Usage Unit :</label>
                <Select 
                type="text" 
                {...register('usageUnit')}
                options={[
                  { value: "Spiral Binder", label: "Spiral Binder"},
                  { value: "Square Feet", label: "Square Feet "},
                  { value: "Impressions", label: "Impressions"},
                  { value: "Quantity", label: "Quantity"},
                  { value: "Hour(s)", label: "Hour(s)"},
                  { value: "Pieces", label: "Pieces"},
                  { value: "Box", label: "Box"},
                  { value: "M", label: "M"},
                  { value: "Lb", label: "Lb"},  
                  { value: "Each", label: "Each"},
                  { value: "Pack", label: "Pack"},
                  { value: "Pages", label: "Pages"},
                  { value: "Reams", label: "Reams"},
                  { value: "Sheet", label: "Sheet"},
                  { value: "Dozen", label: "Dozen"},
                  { value: "Carton", label: "Carton"}
                  
                ]}
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Qty Ordered :
                </label>
                <Input type="number" {...register('qtyOrdered')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Quantity in Stock :
                </label>
                <Input type="number" {...register('quantityInStock')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Reorder Level :
                </label>
                <Input type="number" {...register('reorderLevel')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Handler :</label>
                <Select
                  {...register('handler')}
                  options={[
                    { value: 'None', label: 'None' },
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Warehouse', label: 'Warehouse' },
                  ]}
                />
              </div>



              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Quantity in Demand :
                </label>
                <Input type="number" {...register('quantityInDemand')} />
              </div>
            </div>
          </div>

          {/* Description Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Description Information
            </h3>
            <div className="flex mt-5 text-right">
              <h3 className="w-40 text-sm text-gray-700">Description :</h3>
              <textarea
                {...register('description')}
                rows={1}
                placeholder="Description"
                className="w-full border p-3 mx-2 rounded-lg"
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button text="Save Product" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
