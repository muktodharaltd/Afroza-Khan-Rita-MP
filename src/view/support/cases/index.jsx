

'use client'

import { useForm } from 'react-hook-form'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'

export default function CaseForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Case Data:', data)
    alert('✅ Case Created Successfully!')
  }

  return (
    <div className="p-10 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        {/* Case Information */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-800 pb-2 border-b">
            Case Information
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Case Number :</label>
                <Input type="text" {...register('caseNumber')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Product Name :</label>
                <Input type="text" {...register('productName')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Type :</label>
                <Select
                  {...register('type')}
                  options={[
                    { value: 'none', label: '-None-' },
                    { value: 'problem', label: 'Problem' },
                    { value: 'question', label: 'Question' },
                    { value: 'feature_request', label: 'Feature Request' },
                  ]}
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Case Origin :</label>
                <Select
                  {...register('caseOrigin')}
                  options={[
                    { value: 'none', label: '-None-' },
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'web', label: 'Web' },
                  ]}
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Related To :</label>
                <Input placeholder="Search / Select" {...register('relatedTo')} />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-5 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Account Name :</label>
                <Input placeholder="Search / Select" {...register('accountName')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Deal Name :</label>
                <Input placeholder="Search / Select" {...register('dealName')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Phone :</label>
                <Input type="text" {...register('phone')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Case Owner :</label>
                <Input defaultValue="rouf" {...register('caseOwner')} readOnly />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Status :</label>
                <Select
                  {...register('status')}
                  options={[
                    { value: 'new', label: 'New' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'on_hold', label: 'On Hold' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8 mt-6">
            <div className="flex-1 space-y-4 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Priority :</label>
                <Select
                  {...register('priority')}
                  options={[
                    { value: 'none', label: '-None-' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1 space-y-4 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Case Reason :</label>
                <Select
                  {...register('caseReason')}
                  options={[
                    { value: 'none', label: '-None-' },
                    { value: 'installation', label: 'Installation' },
                    { value: 'billing', label: 'Billing' },
                    { value: 'software_bug', label: 'Software Bug' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Subject, Reported By, Email */}
          <div className="flex flex-wrap md:flex-nowrap gap-8 mt-6">
            <div className="flex-1 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Subject :</label>
                <Input type="text" {...register('subject')} />
              </div>
            </div>
            <div className="flex-1 space-y-3 text-right">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Reported By :</label>
                <Input type="text" {...register('reportedBy')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Email :</label>
                <Input type="email" {...register('email')} />
              </div>
            </div>
          </div>
        </div>

        {/* Description Information */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 pb-2 border-b">
            Description Information
          </h3>
          <div className="space-y-4">
            <div className="flex">
              <label className="w-40 text-sm text-gray-600 mt-1">Description :</label>
              <textarea
                {...register('description')}
                rows={2}
                className="w-full border p-3 mx-2 rounded-lg"
              />
            </div>
            <div className="flex">
              <label className="w-40 text-sm text-gray-600 mt-1">Internal Comments :</label>
              <textarea
                {...register('internalComments')}
                rows={2}
                className="w-full border p-3 mx-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Solution Information */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 pb-2 border-b">
            Solution Information
          </h3>
          <div className="flex">
            <label className="w-40 text-sm text-gray-600 mt-1">Solution :</label>
            <textarea
              {...register('solution')}
              rows={2}
              className="w-full border p-3 mx-2 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <Button text="Save Case" type="submit" />
        </div>
      </form>
    </div>
  )
}
