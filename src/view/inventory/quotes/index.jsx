'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import { FaRegTrashCan } from 'react-icons/fa6'

export default function QuoteFormDynamicTable() {
  const { register, handleSubmit, watch, setValue } = useForm()

  const onSubmit = (data) => {
    console.log('Quote Data:', data)
    alert('✅ Quote Created Successfully!')
  }

  const defaultRow = {
    productName: '',
    quantity: 1,
    listPrice: 0,
    discount: 0,
    tax: 0,
  }
  const [items, setItems] = useState([defaultRow])
  const [adjustment, setAdjustment] = useState(0)

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] =
      field === 'productName' ? value : Number(value) || 0
    setItems(newItems)
  }

  const addRow = () => setItems([...items, { ...defaultRow }])
  const removeRow = (index) => {
    if (items.length === 1) return
    setItems(items.filter((_, i) => i !== index))
  }

  const subTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.listPrice,
    0
  )

  const totalTax = items.reduce((sum, item) => {
    const itemTotal = item.quantity * item.listPrice - item.discount
    const itemTaxAmount = (itemTotal * item.tax) / 100 // tax শতাংশে
    return sum + itemTaxAmount
  }, 0)
  const totalDiscount = items.reduce((sum, item) => {
    const amount = item.quantity * item.listPrice
    const discountAmount = (amount * item.discount) / 100 // discount percentage
    return sum + discountAmount
  }, 0)

  const grandTotal = subTotal - totalDiscount + totalTax + Number(adjustment)

  //  Copy Billing Logic
  const copyBilling = () => {
    setValue('shippingStreet', watch('billingStreet'))
    setValue('shippingCity', watch('billingCity'))
    setValue('shippingState', watch('billingState'))
    setValue('shippingCode', watch('billingCode'))
    setValue('shippingCountry', watch('billingCountry'))
  }

  return (
    <div className=" p-10 bg-white ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Quote Information */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-800  pb-2">
            Quote Information
          </h3>
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Quote Owner :
                </label>
                <Input type="text" {...register('quoteOwner')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Subject :</label>
                <Input type="text" {...register('subject')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Quote Stage :
                </label>
                <Select
                  {...register('quoteStage')}
                  options={[
                    { value: 'Draft', label: 'Draft' },
                    { value: 'On Hold', label: 'On Hold' },
                    { value: 'Delivered', label: 'Delivered' },
                    { value: 'Confirmed', label: 'Confirmed' },
                    { value: 'Closed Won', label: 'Closed Won' },
                    { value: 'Negotiation', label: 'Negotiation' },
                    { value: 'Closed Lost', label: 'Closed Lost' },
                  ]}
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Team :</label>
                <Input type="text" {...register('team')} />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">Carrier :</label>
                <Select
                  {...register('carrier')}
                  options={[
                    { value: 'DHL', label: 'DHL' },
                    { value: 'UPS', label: 'UPS' },
                    { value: 'USPS', label: 'USPS' },
                    { value: 'FedEX', label: 'FedEX' },
                    { value: 'BlueDart', label: 'BlueDart' },
                  ]}
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Deal Name :
                </label>
                <Input
                  type="text"
                  {...register('dealName')}
                  defaultValue="spin"
                />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Valid Until :
                </label>
                <Input type="date" {...register('validUntil')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Contact Name :
                </label>
                <Input type="text" {...register('contactName')} />
              </div>
              <div className="flex items-center">
                <label className="w-40 text-sm text-gray-600">
                  Account Name :
                </label>
                <Input type="text" {...register('accountName')} />
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
            <div className="flex-1 space-y-3">
              <h4 className="font-semibold text-gray-700 mb-5 pt-2">
                Billing Address
              </h4>
              <Input
                placeholder="Billing Street"
                {...register('billingStreet')}
              />
              <Input placeholder="Billing City" {...register('billingCity')} />
              <Input
                placeholder="Billing State"
                {...register('billingState')}
              />
              <Input placeholder="Billing Code" {...register('billingCode')} />
              <Input
                placeholder="Billing Country"
                {...register('billingCountry')}
              />
            </div>

            {/* Shipping */}
            <div className="flex-1 space-y-3">
              <div className="flex  ">
                <h4 className="font-semibold text-gray-700 mb-2 mr-2 pt-2 ">
                  Shipping Address
                </h4>
                {/* ✅ Copy Checkbox */}
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    onChange={(e) => e.target.checked && copyBilling()}
                  />
                  Copy Billing Address
                </label>
              </div>
              <Input
                placeholder="Shipping Street"
                {...register('shippingStreet')}
              />
              <Input
                placeholder="Shipping City"
                {...register('shippingCity')}
              />
              <Input
                placeholder="Shipping State"
                {...register('shippingState')}
              />
              <Input
                placeholder="Shipping Code"
                {...register('shippingCode')}
              />
              <Input
                placeholder="Shipping Country"
                {...register('shippingCountry')}
              />
            </div>
          </div>
        </div>

        {/* Quoted Items Table */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-800  pb-2">
            Quoted Items
          </h2>
          <table className="w-full border-collapse border table-fixed">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="border p-1 w-10">S.NO</th>
                <th className="border p-1 w-40">Product Name</th>
                <th className="border p-1 w-20">Quantity</th>
                <th className="border p-1 w-24">List Price (৳)</th>
                <th className="border p-1 w-24">Amount (৳)</th>
                <th className="border p-1 w-24">Discount (%)</th>
                <th className="border p-1 w-24">Tax (%)</th>
                <th className="border p-1 w-24">Total (৳)</th>
                <th className="border p-1 w-12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const amount = item.quantity * item.listPrice

                const discountAmount = (amount * item.discount) / 100
                const taxableAmount = amount - discountAmount
                const taxAmount = (taxableAmount * item.tax) / 100
                const total = taxableAmount + taxAmount
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <input
                        value={item.productName}
                        onChange={(e) =>
                          handleItemChange(index, 'productName', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, 'quantity', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={item.listPrice}
                        onChange={(e) =>
                          handleItemChange(index, 'listPrice', e.target.value)
                        }
                        className="w-full border p-1 rounded text-right"
                      />
                    </td>
                    <td className="border p-2 text-right">
                      {amount.toFixed(2)}
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(index, 'discount', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={item.tax}
                        onChange={(e) =>
                          handleItemChange(index, 'tax', e.target.value)
                        }
                        className="w-full border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2 text-right">
                      {total.toFixed(2)}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className=" text-red-500  py-1 rounded hover:text-red-600 transition"
                        disabled={items.length === 1}
                      >
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addRow}
            className="mt-4 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Row
          </button>
        </section>

        {/* Totals Section */}
        <section className="flex justify-end mt-10">
          <div className="space-y-4 w-[40%] bg-gray-50 p-6 rounded-lg shadow">
            {[
              { label: 'Sub Total (৳):', value: subTotal.toFixed(2) },
              { label: 'Discount (৳):', value: totalDiscount.toFixed(2) },
              { label: 'Tax (৳):', value: totalTax.toFixed(2) },
            ].map((tot, idx) => (
              <div key={idx} className="flex items-center">
                <label className="w-44 text-sm text-gray-600">
                  {tot.label}
                </label>
                <input
                  value={tot.value}
                  readOnly
                  className="w-full border p-2 rounded bg-white"
                />
              </div>
            ))}

            <div className="flex items-center">
              <label className="w-44 text-sm text-gray-600">
                Adjustment (৳):
              </label>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center font-bold text-lg">
              <label className="w-44 text-sm text-gray-600">
                Grand Total (৳):
              </label>
              <input
                value={grandTotal.toFixed(2)}
                readOnly
                className="w-full border p-2 rounded bg-yellow-50"
              />
            </div>
          </div>
        </section>

        {/* Terms & Description */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700  pb-2">
            Terms and Description
          </h3>
          <div className="flex mb-6">
            <label className="w-40 text-sm text-gray-600 mt-1">
              Terms & Conditions :
            </label>
            <textarea
              {...register('terms')}
              rows={1}
              className="w-full border p-3 mx-2 rounded-lg"
            />
          </div>
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
        </div>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <Button text=" Save Quote" type="submit" />
        </div>
      </form>
    </div>
  )
}
