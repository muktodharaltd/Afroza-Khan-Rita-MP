"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";




export default function LogCallForm() {
  const { register, handleSubmit } = useForm();
 // const today = new Date().toISOString().split('T')[0]

  const now = new Date();
  now.setHours(17, 30, 0, 0);
  const formattedDateTime = now.toISOString().slice(0, 16);
  
  const onSubmit = (data) => {
    console.log(" Logged Call Info:", data);
    alert(" Call Logged Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-2xl w-full  p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Log a Call
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[70%] text-right">

          <h2 className="text-left font-semibold text-gray-700">Call Information</h2>
          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call For:</label>
            <Input type="text" {...register("callFor")} placeholder="Enter person or account" />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Related To:</label>
            <Select
              {...register("relatedTo")}
              options={[
                { value: "Lead", label: "Lead" },
                { value: "Contact", label: "Contact" },
                { value: "Deal", label: "Deal" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Type:</label>
            <Select
              {...register("callType")}
              options={[
                { value: "Outgoing", label: "Outgoing" },
                { value: "Incoming", label: "Incoming" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Status:</label>
            <Select
              {...register("callStatus")}
              options={[
                { value: "Completed", label: "Completed" },
                { value: "Missed", label: "Missed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Start Time:</label>
            <Input type="datetime-local" value={formattedDateTime} {...register("startTime")} />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Subject:</label>
            <Input type="text" {...register("subject")} placeholder="Enter subject" />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Voice Recording:</label>
            <Input type="file" {...register("voice")} />
          </div>

            <h3 className=" font-semibold mb-3 mt-10 text-gray-700 text-left">
              Purpose Of Outgoing Call
            </h3>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Purpose :</label>
            <Input type="text" {...register("purpose")} placeholder="Purpose of call" />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Agenda:</label>
            <Input type="text" {...register("agenda")} placeholder="Agenda details" />
          </div>

   <h3 className=" font-semibold mb-3 mt-10 text-gray-700 text-left">
              Outcome Of Outgoing Call
            </h3>
          <div className="flex items-center">
            <label className="w-40 text-gray-600">Call Result:</label>
            <Input type="text" {...register("result")} placeholder="Outcome or remarks" />
          </div>


          <div className="flex">
            <label className="text-gray-600 w-40">Description:</label>
            <textarea
              {...register("description")}
              rows={1}
              className="border rounded-lg p-2 w-full"
              placeholder="Enter additional details..."
            />
          </div>

          <div className="text-center mt-8">
            <Button text="Log Call" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
