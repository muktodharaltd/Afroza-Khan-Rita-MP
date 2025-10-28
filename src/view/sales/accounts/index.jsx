'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import { GoPersonFill } from 'react-icons/go'

export default function AccountCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = (data) => {
    console.log('Account Data:', data)
    alert('Account Created Successfully ✅')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-2xl w-full  p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Create New Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Account Image */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Account Image
            </h3>
            <div className="flex items-center gap-6">
              {/* Hidden Input */}
              <input
                id="accountprofile"
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Profile Preview */}
              <label
                htmlFor="accountprofile"
                className="relative w-15 h-15 cursor-pointer group"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Contact Profile"
                    fill
                    className="object-cover rounded-full border border-gray-300 group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-15 h-15 rounded-full overflow-hidden border  border-gray-400 flex items-center justify-center text-gray-400 text-sm group-hover:bg-gray-50 transition">
                    <GoPersonFill className="h-72 w-40 pt-5 " />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Account Information */}
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Account Information
            </h3>
          <div className="text-right">
            <div className="flex flex-wrap md:flex-nowrap gap-6">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Owner:
                  </label>
                  <Input
                    type="text"
                    {...register('accountOwner')}
                    defaultValue="rouf"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Name:
                  </label>
                  <Input type="text" {...register('accountName')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Site:
                  </label>
                  <Input type="text" {...register('accountSite')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Parent Account:
                  </label>
                  <Input type="text" {...register('parentAccount')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Number:
                  </label>
                  <Input type="text" {...register('accountNumber')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Type:
                  </label>
                  <Select
                    {...register('accountType')}
                    placeholder="--None--"
                    options={[
                      { value: 'Customer', label: 'Customer' },
                      { value: 'Partner', label: 'Partner' },
                      { value: 'Prospect', label: 'Prospect' },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Industry:
                  </label>
                  <Select
                    {...register('industry')}
                    placeholder="--None--"
                    options={[
                      { value: 'IT', label: 'IT' },
                      { value: 'Finance', label: 'Finance' },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Annual Revenue:
                  </label>
                  <Input
                    type="number"
                    {...register('annualRevenue')}
                    placeholder="$"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Rating:</label>
                  <Select
                    {...register('rating')}
                    placeholder="--None--"
                    options={[
                      { value: 'Hot', label: 'Hot' },
                      { value: 'Warm', label: 'Warm' },
                      { value: 'Cold', label: 'Cold' },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Phone:</label>
                  <Input type="text" {...register('phone')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Fax:</label>
                  <Input type="text" {...register('fax')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Website:</label>
                  <Input type="text" {...register('website')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Ticker Symbol:
                  </label>
                  <Input type="text" {...register('tickerSymbol')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Ownership:
                  </label>
                  <Select
                    {...register('ownership')}
                    placeholder="--None--"
                    options={[
                      { value: 'Private', label: 'Private' },
                      { value: 'Public', label: 'Public' },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Employees:
                  </label>
                  <Input type="number" {...register('employees')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    SIC Code:
                  </label>
                  <Input type="text" {...register('sicCode')} />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Address Information
            </h3>
          <div className='text-right'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Billing Street:
                </label>
                <Input type="text" {...register('billingStreet')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Billing City:
                </label>
                <Input type="text" {...register('billingCity')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Billing State:
                </label>
                <Input type="text" {...register('billingState')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Billing Code:
                </label>
                <Input type="text" {...register('billingCode')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Billing Country:
                </label>
                <Input type="text" {...register('billingCountry')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Shipping Street:
                </label>
                <Input type="text" {...register('shippingStreet')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Shipping City:
                </label>
                <Input type="text" {...register('shippingCity')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Shipping State:
                </label>
                <Input type="text" {...register('shippingState')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Shipping Code:
                </label>
                <Input type="text" {...register('shippingCode')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Shipping Country:
                </label>
                <Input type="text" {...register('shippingCountry')} />
              </div>
            </div>
          </div>

          {/* Description Information */}
          <div className="flex mt-5 text-right">
            <label className="w-40 text-sm text-gray-700">Description:</label>
            <textarea
              {...register('description')}
              rows="3"
              placeholder="Description"
              className="w-full border p-3 mx-2 rounded-lg"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
