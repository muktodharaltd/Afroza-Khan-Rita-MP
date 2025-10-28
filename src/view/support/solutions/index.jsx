'use client'

import { useForm } from 'react-hook-form'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'

export default function SolutionForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Solution Data:', data)
    alert('✅ Solution Created Successfully!')
  }

  return (
    <div className="p-10 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        {/* Solution Information */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-800 pb-2 border-b">
            Solution Information
          </h3>

          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Solution Number :</label>
                <Input type="text" {...register('solutionNumber')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Solution Title :</label>
                <Input type="text" {...register('solutionTitle')} />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Status :</label>
                <Select
                  {...register('status')}
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' },
                    { value: 'review', label: 'Under Review' },
                  ]}
                  defaultValue="draft"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Solution Owner :</label>
                <Input defaultValue="rouf" {...register('solutionOwner')} readOnly />
              </div>

              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Product Name :</label>
                <Input placeholder="Search / Select Product" {...register('productName')} />
              </div>
            </div>
          </div>
        </div>

        {/* Description Information */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-800 pb-2 border-b">
            Description Information
          </h3>

          <div className="space-y-5">
            <div className="flex">
              <label className="w-40 text-sm text-gray-600 mt-1">Question :</label>
              <textarea
                {...register('question')}
                rows={2}
                placeholder="Write the question here..."
                className="w-full border p-3 mx-2 rounded-lg"
              />
            </div>

            <div className="flex">
              <label className="w-40 text-sm text-gray-600 mt-1">Answer :</label>
              <textarea
                {...register('answer')}
                rows={3}
                placeholder="Write the answer or solution here..."
                className="w-full border p-3 mx-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <Button text="Save Solution" type="submit" />
        </div>
      </form>
    </div>
  )
}
