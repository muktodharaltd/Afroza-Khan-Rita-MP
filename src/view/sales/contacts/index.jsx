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
                id="contactprofile"
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Profile Preview */}
              <label
                htmlFor="contactprofile"
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

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Contact Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Contact Owner :
                  </label>
                  <Input type="text" {...register('contactOwner')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    First Name :
                  </label>
                  <Input
                    type="text"
                    {...register('firstName')}
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
                  <label className="w-40 text-sm text-gray-600">Email :</label>
                  <Input type="email" {...register('email')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Phone :</label>
                  <Input type="text" {...register('phone')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Other Phone :
                  </label>
                  <Input type="text" {...register('otherPhone')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Mobile :</label>
                  <Input type="text" {...register('mobile')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Assistant :
                  </label>
                  <Input type="text" {...register('assistant')} />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Lead Source :
                  </label>
                  <Select
                    {...register('leadSource')}
                    placeholder="--None--"
                    options={[
                      { value: 'Advertisement', label: 'Advertisement' },
                      { value: 'Partner', label: 'Partner' },
                      { value: 'Chat', label: 'Chat' },
                      { value: 'Facebook', label: 'Facebook' },
                      { value: 'Cold Call', label: 'Cold Call' },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Last Name :
                  </label>
                  <Input type="text" {...register('lastName')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Vendor Name :
                  </label>
                  <Input
                    type="text"
                    {...register('vendorName')}
                    placeholder="spin"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Title :</label>
                  <Input type="text" {...register('title')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Department :
                  </label>
                  <Input type="text" {...register('department')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Home Phone :
                  </label>
                  <Input type="text" {...register('homePhone')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Fax :</label>
                  <Input type="text" {...register('fax')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Date of Birth :
                  </label>
                  <Input type="date" {...register('dob')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Asst Phone :
                  </label>
                  <Input type="text" {...register('asstPhone')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Skype ID :
                  </label>
                  <Input type="text" {...register('skype')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Secondary Email :
                  </label>
                  <Input type="email" {...register('secondaryEmail')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Twitter :
                  </label>
                  <Input type="text" {...register('twitter')} placeholder="@" />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Reporting To :
                  </label>
                  <Input
                    type="text"
                    {...register('reportingTo')}
                    placeholder="spin"
                  />
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
                <label className="w-40 text-sm text-gray-600">
                  Mailing Street :
                </label>
                <Input type="text" {...register('mailingStreet')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Mailing City :
                </label>
                <Input type="text" {...register('mailingCity')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Mailing State :
                </label>
                <Input type="text" {...register('mailingState')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Mailing Zip :
                </label>
                <Input type="text" {...register('mailingZip')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Mailing Country :
                </label>
                <Input type="text" {...register('mailingCountry')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Other Street :
                </label>
                <Input type="text" {...register('otherStreet')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Other City :
                </label>
                <Input type="text" {...register('otherCity')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Other State :
                </label>
                <Input type="text" {...register('otherState')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Other Zip :
                </label>
                <Input type="text" {...register('otherZip')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Other Country :
                </label>
                <Input type="text" {...register('otherCountry')} />
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
