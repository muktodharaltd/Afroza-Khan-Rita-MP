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
          Create Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
          {/* Campaign Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Task Information
            </h3>

            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
             
              <div className="w-[70%] space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Task Owner :
                  </label>
                  <Input type="text" {...register('taskOwner')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Subject :
                  </label>
                  <Select
                    type="text"
                    {...register('subject')}
                    placeholder="-None-"
                    options={[
                      { value: '', label: '-None-' },
                      { value: 'Email', label: 'Email' },
                      { value: 'Call', label: 'Call' },
                      { value: 'Meeting', label: 'Meeting' },
                      { value: 'Sent Letter', label: 'Sent Letter' },
                      { value: 'Poduct Demo', label: 'Product Demo' },
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Due Date :
                  </label>
                  <Input type="date" {...register('dueDate')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Contact :
                  </label>
                  <Input type="text" {...register('contact')} />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Status :</label>
                  <Select
                    {...register('status')}
                    options={[
                      { value: '', label: '-None-' },
                      { value: 'Not Started', label: 'Not Started' },
                      { value: 'In Progress', label: 'In Progress' },
                      { value: 'Completed', label: 'Completed' },
                      { value: 'Pending Input', label: 'Pending Input' },
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">
                    Priority :
                  </label>
                  <Select
                    {...register('priority')}
                    options={[
                      { value: '', label: '-None-' },
                      { value: 'Normal', label: 'Normal' },
                      { value: 'High', label: 'High' },
                      { value: 'Highest', label: 'Highest' },
                      { value: 'Lowest', label: 'Lowest' },
                      { value: 'Low', label: 'Low' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description Information */}
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Description Information
          </h3>
          <div className="flex mt-5 text-right">
            <label className="w-30 text-sm text-gray-700">Description :</label>
            <textarea
              {...register('description')}
              rows="2"
              placeholder="Description"
              className="w-[50%] border p-3 mx-2 rounded-lg"
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
