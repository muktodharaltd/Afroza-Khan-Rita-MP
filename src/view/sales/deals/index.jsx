'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import { GoPersonFill } from 'react-icons/go'


export default function ContactCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [preview, setPreview] = useState(null)

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = (data) => {
    console.log('Contact Data:', data)
    alert('Contact Created Successfully ✅')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Create New Contact
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Image */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Contact Image
            </h3>

            <div className="flex items-center gap-6">
              {/* Hidden Input */}
              <input
                id="dealprofile"
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Profile Preview */}
              <label
                htmlFor="dealprofile"
                className="relative w-15 h-15 cursor-pointer group"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Deal Profile"
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

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Deal Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Deal Owner :
                  </label>
                  <Input type="text" {...register('dealOwner')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Deal Name :
                  </label>
                  <Input
                    type="text"
                    {...register('dealName')}
                    placeholder="-None-"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Account Name :
                  </label>
                  <Input
                    type="text"
                    {...register('accountName')}
                    placeholder="spin"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Type :</label>
                  <Select
                    {...register('type')}
                    placeholder="--None--"
                    options={[
                      {
                        value: 'Existing Business',
                        label: 'Existing Business',
                      },
                      { value: 'New Business', label: 'New Business' },
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Next Step :
                  </label>
                  <Input type="text" {...register('nextStep')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Lead Source :
                  </label>
                  <Select
                    {...register('leadSource')}
                    placeholder="--None--"
                    options={[
                      {
                        value: 'Sales Email Alias',
                        label: 'Sales Email Alias',
                      },
                      {
                        value: 'Employee Referral',
                        label: 'Employee Referral',
                      },
                      {
                        value: 'External Referral',
                        label: 'External Referral',
                      },
                      { value: 'Public Relations', label: 'Public Relations' },
                      { value: 'Internal Seminar', label: 'Internal Seminar' },
                      { value: 'Seminar Partner', label: 'Seminar Partner' },
                      { value: 'Advertisement', label: 'Advertisement' },
                      { value: 'Online Store', label: 'Online Store' },
                      { value: 'Web Download', label: 'Web Download' },
                      { value: 'Web Research', label: 'Web Research' },
                      { value: 'X (Twitter)', label: 'X (Twitter)' },
                      { value: 'Trade Show', label: 'Trade Show' },
                      { value: 'Cold Call', label: 'Cold Call' },
                      { value: 'Facebook', label: 'Facebook' },
                      { value: 'Partner', label: 'Partner' },
                      { value: 'Chat', label: 'Chat' },
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Contact Name :</label>
                  <Input type="text" {...register('contactName')} />
                </div>

              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Amount :
                  </label>
                  <Input
                    type="text"
                    {...register('amount')}
                    defaultValue="$"
                   
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Closing Date :
                  </label>
                  <Input type="date" {...register('closingDate')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    pipeline :
                  </label>
                  <Input
                    type="text"
                    {...register('pipeline')}
                    placeholder="pipeline"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Stage :</label>
                  <Input type="text" {...register('stage')} 
                  placeholder="Needs Analysis"/>
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Probability (%):
                  </label>
                  <Input type="text" {...register('probability')} />
                </div>

                
                  <div className="flex items-center">
                    <label className="w-40 text-sm text-gray-600">
                      Expected Revenue :
                    </label>
                    <Input
                      type="text"
                      {...register('expectedRevenue')}
                      
                    />
                  </div>
             

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Campaign Source :
                  </label>
                  <Input type="text" {...register('campaignSource')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Forecast Category :</label>
                  <Input type="text" {...register('forecastCategory')} />
                </div>

               
              </div>
            </div>
          </div>

          

          {/* Description Information */}
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Description Information
          </h3>
          <div className="flex mt-5 text-right">
            <label className="w-40 text-sm text-gray-700">Description :</label>
            <textarea
              {...register('description')}
              rows="2"
              placeholder="Description"
              className="w-full border p-3 mx-2 rounded-lg"
            ></textarea>
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
