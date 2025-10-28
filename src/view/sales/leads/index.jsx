'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'

import { GoPersonFill } from 'react-icons/go'

export default function LeadCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [preview, setPreview] = useState(null)

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file)) // show preview
    }
  }

  const onSubmit = (data) => {
    console.log('Lead Data:', data)
    alert('Lead Created Successfully ✅')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-2xl w-full  p-8 ">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Create New Lead
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Lead Image */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Lead Image
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
                    <GoPersonFill className="h-72 w-40 pt-5 " />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Lead Information */}
          <div className="">
            <h3 className="text-xl font-semibold mb-3 text-gray-700 ">
              Lead Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                {/* Lead Owner */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Lead Owner* :{' '}
                  </label>
                  <Input
                    required
                    type="text"
                    {...register('leadOwner')}
                    placeholder="Your first name"
                  />
                </div>

                {/* First Name */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    First Name* :{' '}
                  </label>
                  <Input
                    required
                    type="text"
                    {...register('firstName')}
                    placeholder="-None-"
                  />
                </div>

                {/* Title */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">Title: </label>
                  <Input
                    type="text"
                    {...register('title')}
                    placeholder="Title"
                  />
                </div>

                {/* Phone */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">Phone : </label>
                  <Input type="text" {...register('phone')} />
                </div>

                {/* Mobile */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Mobile :{' '}
                  </label>
                  <Input type="text" {...register('mobile')} />
                </div>

                {/* Lead Source */}
                <div className=" flex">
                  <label className="w-40 text-sm text-gray-600">
                    Lead Source* :{' '}
                  </label>
                  <Select
                    {...register('leadSource')}
                    error={errors.leadSource?.message}
                    required
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

                {/* Industry */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Industry :{' '}
                  </label>
                  <Select
                    {...register('industry')}
                    options={[
                      {
                        value: 'ASP (Application Service Provider)',
                        label: 'ASP (Application Service Provider)',
                      },
                      {
                        value: 'ERP (Enterprise Resource Planning)',
                        label: 'ERP (Enterprise Resource Planning)',
                      },
                      {
                        value: 'MSP (Management Service Provider)',
                        label: 'MSP (Management Service Provider)',
                      },
                      {
                        value: 'Network Equipment Enterprise',
                        label: 'Network Equipment Enterprise',
                      },
                      {
                        value: 'Storage Service Provider',
                        label: 'Storage Service Provider',
                      },
                      {
                        value: 'Small/Medium Enterprise',
                        label: 'Small/Medium Enterprise',
                      },
                      {
                        value: 'Government/Military',
                        label: 'Government/Military',
                      },
                      {
                        value: 'Non-management ISV',
                        label: 'Non-management ISV',
                      },
                      {
                        value: 'Optical Networking',
                        label: 'Optical Networking',
                      },
                      {
                        value: 'Systems Integrator',
                        label: 'Systems Integrator',
                      },
                      {
                        value: 'Storage Equipment',
                        label: 'Storage Equipment',
                      },
                      {
                        value: 'Wireless Industry',
                        label: 'Wireless Industry',
                      },
                      { value: 'Data/Telecom OEM', label: 'Data/Telecom OEM' },
                      { value: 'Large Enterprise', label: 'Large Enterprise' },
                      { value: 'Service Provider', label: 'Service Provider' },
                      { value: 'Management ISV', label: 'Management ISV' },
                      { value: 'ManagementISV', label: 'ManagementISV' },
                      { value: 'ERP', label: 'ERP' },
                    ]}
                  />
                </div>

                {/* Annual Revenue */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Annual Revenue :{' '}
                  </label>
                  <Input type="text" {...register('revenue')} placeholder="$" />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                {/* Company */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Company :{' '}
                  </label>
                  <Input type="text" {...register('company')} />
                </div>

                {/* Last Name */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Last Name :{' '}
                  </label>
                  <Input type="text" {...register('lastName')} />
                </div>

                {/* Email */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">Email : </label>
                  <Input type="email" {...register('email')} />
                </div>

                {/* Fax */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">Fax : </label>
                  <Input type="text" {...register('fax')} />
                </div>

                {/* Website */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Website :{' '}
                  </label>
                  <Input type="text" {...register('website')} />
                </div>

                {/* Lead Status */}
                <div className=" flex">
                  <label className="w-40 text-sm text-gray-600">
                    Lead Status*{' '}
                  </label>
                  <Select
                    {...register('leadStatus')}
                    error={errors.gender?.message}
                    required
                    placeholder="--None--"
                    options={[
                      {
                        value: 'Attempted to Contact',
                        label: 'Attempted to Contact',
                      },
                      {
                        value: 'Contact in Future',
                        label: 'Contact in Future',
                      },
                      { value: 'Not Contacted', label: 'Not Contacted' },
                      { value: 'Pre-Qualified', label: 'Pre-Qualified' },
                      { value: 'Not Qualified', label: 'Not Qualified' },
                      { value: 'Contacted', label: 'Contacted' },
                      { value: 'Junk Lead', label: 'Junk Lead' },
                      { value: 'Lost Lead', label: 'Lost Lead' },
                      { value: 'nww', label: 'nww' },
                    ]}
                  />
                </div>

                {/* No. of Employees */}
                <div className="flex items-center ">
                  <label className="w-40 text-sm text-gray-600">
                    No. of Employees :
                  </label>
                  <Input type="number" {...register('employees')} />
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Rating :{' '}
                  </label>
                  <Select
                    {...register('rating')}
                    options={[
                      {
                        value: 'Project Cancelled',
                        label: 'Project Cancelled',
                      },
                      { value: 'Market Failed', label: 'Market Failed' },
                      { value: 'Shut Down', label: 'Shut Down' },
                      { value: 'Acquired', label: 'Acquired' },
                      { value: 'Active', label: 'Active' },
                    ]}
                  />
                </div>

                {/* Skype ID */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Skype ID :{' '}
                  </label>
                  <Input type="text" {...register('skype')} />
                </div>

                {/* Secondary Email */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Secondary Email :{' '}
                  </label>
                  <Input type="email" {...register('secondaryEmail')} />
                </div>

                {/* Twitter */}
                <div className="flex items-center  ">
                  <label className="w-40 text-sm text-gray-600">
                    Twitter :{' '}
                  </label>
                  <Input type="text" {...register('twitter')} placeholder="@" />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600"> Street :</label>
                <Input
                  type="text"
                  {...register('street')}
                  placeholder="Street"
                />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">City :</label>
                <Input type="text" {...register('city')} placeholder="City" />
              </div>

              <div className=" flex items-center">
                <label className="w-40 text-sm text-gray-600">State :</label>
                <Input type="text" {...register('state')} placeholder="State" />
              </div>

              <div className=" flex items-center">
                <label className="w-40 text-sm text-gray-600">Country :</label>
                <Input
                  type="text"
                  {...register('country')}
                  placeholder="Country"
                />
              </div>

              <div className=" flex items-center">
                <label className="w-40 text-sm text-gray-600">Zip Code :</label>
                <Input
                  type="text"
                  {...register('zip')}
                  placeholder="Zip Code"
                />
              </div>
            </div>
          </div>

          {/* Description Information */}
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Description Information
          </h3>
          <div className="flex mt-5 text-right">
            <h3 className="w-40 text-sm text-gray-700">Description : </h3>
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
