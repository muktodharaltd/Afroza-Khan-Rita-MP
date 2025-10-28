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
          

          {/* Campaign Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Campaign Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Campaign Owner :
                  </label>
                  <Input type="text" {...register('campaignOwner')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Campaign Name :
                  </label>
                  <Input
                    type="text"
                    {...register('campaignName')}
                    placeholder="-None-"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Start Date :
                  </label>
                  <Input
                    type="date"
                    {...register('startDate')}                    
                  />
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
                  <label className="w-40 text-sm text-gray-600">Actual Cost :</label>
                  <Input type="text" {...register('actualCost')} placeholder="$" />                  
                </div>


                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Numbers Sent :
                  </label>
                  <Input type="text" {...register('numbersSent')} />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Type :
                  </label>
                 <Select
                    {...register('type')}
                    options={[
                      { value: '', label: '-None-' },
                      { value: 'Public Relations', label: 'Public Relations' },
                      { value: 'Referral Program', label: 'Referral Program' },
                      { value: 'Advertisement', label: 'Advertisement' },
                      { value: 'Telemarketing', label: 'Telemarketing' },
                      { value: 'Direct Mail', label: 'Direct Mail' },
                      { value: 'Conference', label: 'Conference' },
                      { value: 'Banner Ads', label: 'Banner Ads' },
                      { value: 'Trade Show', label: 'Trade Show' },
                      { value: 'Partners', label: 'Partners' },
                      { value: 'Webinar', label: 'Webinar' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Status :</label>
                  <Select
                    {...register('status')}
                    options={[
                      { value: '', label: '-None-' },
                      { value: 'Planning', label: 'Planning' },
                      { value: 'active', label: 'Active' },
                      { value: 'Inactive', label: 'Inactive' },
                      { value: 'Completed', label: 'Completed' },
                    ]}
                  />
                  
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    End Date :
                  </label>
                  <Input type="date" {...register('endDate')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Budgeted Cost :
                  </label>
                  <Input
                    type="text"
                    {...register('budgetedCost')}
                    placeholder="$"
                  />
                </div>


                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Expected Response :
                  </label>
                  <Input type="text" {...register('expectedResponse')} />
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
