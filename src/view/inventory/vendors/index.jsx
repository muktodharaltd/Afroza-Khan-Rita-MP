'use client'


import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'



export default function QuoteFormDynamicTable() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Quote Data:', data)
    alert('✅ Quote Created Successfully!')
  }


  

 

  return (
    <div className=" p-10 bg-white ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  
                    
        {/* Quote Information */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-800  pb-2">
            Vendor Information
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Vendor Owner :
                </label>
                <Input type="text" {...register('vendorOwner')} />
              </div>
              
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Phone :</label>
                <Input type="text" {...register('phone')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Website :
                </label>
                <Input type="text" {...register('website')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Category :
                </label>
                <Input type="text" {...register('category')} />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Vandor Name :
                </label>
                <Input type="text" {...register('vandorName')} />
              </div>
              
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Email  :
                </label>
                <Input type="email" {...register('email')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">GL Account :</label>
                <Select
                  {...register('glAccount')}
                  options={[
                    { value:'Sales-Software', label:'Sales-Software'},
                    { value: "Sales-Hardware", label:'Sales-Hardware'},
                    { value: "Rental Income", label:'Rental Income'},
                    { value: "Interest Income", label:'Interest Income'},
                    { value: "Sales Software Support", label:'Sales Software Support'},
                    { value: "Sales Other", label:'Sales Other'},
                    { value: "Interest Sales", label:'Interest Sales'},
                    { value: "Labor Hardware Service ", label:'Labor Hardware Service '},
                    
                  ]}
                  />
              </div>
              <div className="flex items-center">
                <label className="w-31 text-sm mr-5 text-gray-600 ">
                  Email Opt Out :
                </label>
                <input type="checkbox" {...register('emailOptOut')} />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-xl font-semibold mb-2   text-gray-800 pb-2">
            Address Information
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Billing */}
            <div className="flex-1 space-y-3 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600 ">Street :</label> 

              <Input
                placeholder=" Street"
                {...register('street')}
                />
                </div>
                <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600 ">State :</label> 

              <Input placeholder="State" {...register('state')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600 ">Country :</label> 

              <Input
                placeholder="Country"
                {...register('Country')}
              />
              </div>
              
            </div>

            {/* Shipping */}
            <div className="flex-1 space-y-3 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600 ">City :</label> 

              <Input
                placeholder="City"
                {...register('city')}
              />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600 ">Zip Code : </label> 

              <Input
                placeholder="Zip Code "
                {...register('zipCode')}
              />
              </div>
              
            </div>
          </div>
        </div>

        {/* Quoted Items Table */}
       

        

        {/* Terms & Description */}
          <div className="flex">
            <label className="w-40 text-sm text-gray-600 mt-1">
              Description :
            </label>
            <textarea
              {...register('description')}
              rows={1}
              className="w-full border p-3 mx-2 rounded-lg"
            />
          </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <Button text=" Save Invoice" type="submit" />
        </div>
      </form>
    </div>
  )
}
