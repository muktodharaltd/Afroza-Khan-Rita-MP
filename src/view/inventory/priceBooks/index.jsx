'use client'

import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'

export default function PriceBookCreateForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Price Book Data:', data)
    alert(' Price Book Created Successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className=" w-full p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Create Price Book
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Price Book Information */}
          <div>
            <h3 className=" font-semibold mb-3 text-gray-700">
              Price Book Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
           
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Price Book Owner :
                  </label>
                  <Input
                    type="text"
                    {...register('priceBookOwner')}
                    defaultValue="rouf"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-31 mr-5 text-sm text-gray-600">Active :</label>
                  <input
                    {...register('active')}
                    type="checkbox"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">               
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Price Book Name :
                  </label>
                  <Input type="text" {...register('priceBookName')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Pricing Model :
                  </label>
                  <Select
                    {...register('pricingModel')}
                    placeholder="-None-"
                    options={[
                      { value: 'Flat ', label: 'Flat ' },
                      { value: "Differential" , label: "differential"}
                     
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description Information */}
          <div>
            <h3 className=" font-semibold mb-3 text-gray-700">
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

          {/* Submit Button */}
          <div className="text-center">
            <Button text="Save Price Book" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
