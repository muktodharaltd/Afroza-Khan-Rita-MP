'use client'
import {useState} from "react"
import { useForm } from 'react-hook-form'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'

export default function QuoteFormDynamicTable() {

    const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    console.log('Quote Data:', data)
    alert('✅ Quote Created Successfully!')
  }

  const defaultRow = { productName: '', quantity: 1, listPrice: 0, discount: 0, tax: 0 }
  const [items, setItems] = useState([defaultRow])
  const [adjustment, setAdjustment] = useState(0)

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = field === 'productName' ? value : Number(value) || 0
    setItems(newItems)
  }

  const addRow = () => {
    setItems([...items, { ...defaultRow }])
  }

  const removeRow = (index) => {
    if (items.length === 1) return // always keep at least 1 row
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const subTotal = items.reduce((sum, item) => sum + item.quantity * item.listPrice, 0)
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0)
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0)
  const grandTotal = subTotal - totalDiscount + totalTax + Number(adjustment)

  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Quote Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Quote Information</h3>
            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Quote Owner :</label>
                  <Input type="text" {...register('quoteOwner')} defaultValue="rouf" />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Subject :</label>
                  <Input type="text" {...register('subject')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Quote Stage :</label>
                  <Select
                    {...register('quoteStage')}
                    options={[
                      { value: 'Draft', label: 'Draft' },
                      { value: 'Delivered', label: 'Delivered' },
                      { value: 'Confirmed', label: 'Confirmed' },
                      { value: 'Closed', label: 'Closed' },
                    ]}
                    placeholder="Draft"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Team :</label>
                  <Input type="text" {...register('team')} />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Carrier :</label>
                  <Select
                    {...register('carrier')}
                    options={[
                      { value: 'FedEX', label: 'FedEX' },
                      { value: 'DHL', label: 'DHL' },
                      { value: 'UPS', label: 'UPS' },
                    ]}
                    placeholder="FedEX"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Deal Name :</label>
                  <Input type="text" {...register('dealName')} defaultValue="spin" />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Valid Until :</label>
                  <Input type="date" {...register('validUntil')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Contact Name :</label>
                  <Input type="text" {...register('contactName')} />
                </div>
                <div className="flex items-center">
                  <label className="w-40 text-sm text-gray-600">Account Name :</label>
                  <Input type="text" {...register('accountName')} />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Address Information</h3>
            <div className="flex flex-wrap md:flex-nowrap gap-6 text-right">
              {/* Billing */}
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Billing Address</h4>
                <Input placeholder="Billing Street" {...register('billingStreet')} />
                <Input placeholder="Billing City" {...register('billingCity')} />
                <Input placeholder="Billing State" {...register('billingState')} />
                <Input placeholder="Billing Code" {...register('billingCode')} />
                <Input placeholder="Billing Country" {...register('billingCountry')} />
              </div>

              {/* Shipping */}
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                <Input placeholder="Shipping Street" {...register('shippingStreet')} />
                <Input placeholder="Shipping City" {...register('shippingCity')} />
                <Input placeholder="Shipping State" {...register('shippingState')} />
                <Input placeholder="Shipping Code" {...register('shippingCode')} />
                <Input placeholder="Shipping Country" {...register('shippingCountry')} />
              </div>
            </div>
          </div>
   
      {/* Quoted Items Table */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Quoted Items</h2>
        <table className="w-full border-collapse border table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-10">S.NO</th>
              <th className="border p-2 w-40">Product Name</th>
              <th className="border p-2 w-20">Quantity</th>
              <th className="border p-2 w-24">List Price ($)</th>
              <th className="border p-2 w-24">Amount ($)</th>
              <th className="border p-2 w-24">Discount ($)</th>
              <th className="border p-2 w-24">Tax ($)</th>
              <th className="border p-2 w-24">Total ($)</th>
              <th className="border p-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const amount = item.quantity * item.listPrice
              const total = amount - item.discount + item.tax
              return (
                <tr key={index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      value={item.productName}
                      onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                      className="w-full border p-1 rounded box-border"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full border p-1 rounded box-border"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.listPrice}
                      onChange={(e) => handleItemChange(index, 'listPrice', e.target.value)}
                      className="w-full border p-1 rounded box-border"
                    />
                  </td>
                  <td className="border p-2 text-right">{amount.toFixed(2)}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                      className="w-full border p-1 rounded box-border"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.tax}
                      onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
                      className="w-full border p-1 rounded box-border"
                    />
                  </td>
                  <td className="border p-2 text-right">{total.toFixed(2)}</td>
                  <td className="border p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                      disabled={items.length === 1}
                    >
                      Remove
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
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Row
        </button>
      </section>

      {/* Totals Section */}
      <section className="flex justify-end mt-6">
        <div className="space-y-3 w-[70%] bg-gray-100 p-4 rounded-lg shadow">
          {[
            { label: 'Sub Total ($):', value: subTotal.toFixed(2) },
            { label: 'Discount ($):', value: totalDiscount.toFixed(2) },
            { label: 'Tax ($):', value: totalTax.toFixed(2) },
          ].map((tot, idx) => (
            <div key={idx} className="flex items-center">
              <label className="w-40 text-sm text-gray-600">{tot.label}</label>
              <input
                value={tot.value}
                readOnly
                className="w-full border p-2 rounded bg-white box-border"
              />
            </div>
          ))}

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Adjustment ($):</label>
            <input
              type="number"
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              className="w-full border p-2 rounded box-border"
            />
          </div>

          <div className="flex items-center font-bold text-lg">
            <label className="w-40 text-sm text-gray-600">Grand Total ($):</label>
            <input
              value={grandTotal.toFixed(2)}
              readOnly
              className="w-full border p-2 rounded bg-yellow-50 box-border"
            />
          </div>
        </div>
      </section>

          {/* Submit */}
          <div className="text-center">
            <Button text="Save Quote" type="submit" />
          </div>
    </form>
    </div>
  )
}