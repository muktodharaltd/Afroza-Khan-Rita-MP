"use client";

import { useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

export default function ScheduleCallForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(" Scheduled Call Info:", data);
    alert(" Call Scheduled Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-2xl w-full  p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Schedule a Call
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[70%] text-right">

          <h2 className="font-semibold text-gray-700 text-left">Call Information </h2>
          <div className="flex items-center">
            <label className="w-48 text-gray-600">Call For:</label>
            <Input type="text" {...register("callFor")} placeholder="Enter person or account" />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Related To:</label>
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
            <label className="w-48 text-gray-600">Call Type:</label>
            <Select
              {...register("callType")}
              options={[
                { value: "Outgoing", label: "Outgoing" },
                { value: "Incoming", label: "Incoming" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Outgoing Call Status:</label>
            <Select
              {...register("callStatus")}
              options={[
                { value: "Scheduled", label: "Scheduled" },
                { value: "Pending", label: "Pending" },
              ]}
            />
          </div>

        
          <div className="flex items-center">
            <label className="w-48 text-gray-600">Call Owner:</label>
            <Input type="text" {...register("owner")}  />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Subject:</label>
            <Input type="text" {...register("subject")} placeholder="Enter subject" />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Reminder:</label>
            <Select
              {...register("reminder")}
              options={[
                { value: "None", label: "None" },
                { value: "15 min before", label: "15 min before" },
                { value: "30 min before", label: "30 min before" },
                { value: "1 hour before", label: "1 hour before" },
              ]}
            />
          </div>

          <h2 className="font-semibold text-gray-700 text-left">Purpose Of Outgoing Call</h2>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Call Purpose:</label>
            <Input type="text" {...register("purpose")} placeholder="Purpose of call" />
          </div>

          <div className="flex items-center">
            <label className="w-48 text-gray-600">Call Agenda:</label>
            <Input type="text" {...register("agenda")} placeholder="Call agenda details" />
          </div>

          <div className="text-center mt-8">
            <Button text="Schedule Call" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
