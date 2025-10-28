"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

export default function MeetingForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    // 🕓 নির্দিষ্ট সময় সেট করা (5:00 PM এবং 6:00 PM)
    now.setHours(17, 0, 0, 0); // ৫:০০ PM
    tomorrow.setHours(18, 0, 0, 0); // ৬:০০ PM

    //  শুধু date দেখাবে UI তে, কিন্তু টাইম সহ value থাকবে
    const formatDateTime = (date) => date.toISOString().slice(0, 16);

    setValue("from", formatDateTime(now));
    setValue("to", formatDateTime(tomorrow));
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Meeting Info:", data);
    alert("✅ Meeting Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white w-full  p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Meeting Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[70%]">

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Title</label>
            <Input type="text" {...register("title")} defaultValue="New Meeting" />            
          </div>
          
          <div className="flex items-center">
            <label className="w-40 text-gray-600">Meeting Venue</label>
            <Select
              {...register("meetingVenue")}
              options={[
                { value: "Client location", label: "Client location" },
                { value: "In-Office", label: "In-Office" },
                { value: "Online", label: "Online" },
              ]}
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-gray-600">Location</label>
            <Input type="text" {...register("location")} placeholder="Enter location" />
          </div>

          {/*  All Day */}
          <div className="flex items-center">
            <label className="w-40 text-gray-600">All day</label>
            <input
              type="checkbox"
              {...register("allDay")}
              checked={allDay}
              onChange={() => setAllDay(!allDay)}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          {/* 🗓 From */}
          <div className="flex items-center">
            <label className="w-40 text-gray-600">From</label>
            <div className="flex gap-3 w-full">
              <Input
                type="date"
                {...register("fromDate")}
                value={new Date().toISOString().split("T")[0]}
                readOnly
              />
              {!allDay && (
                <Input
                  type="time"
                  {...register("fromTime")}
                  defaultValue="17:00"
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">To</label>
            <div className="flex gap-3 w-full">
              <Input
                type="date"
                {...register("toDate")}
                value={
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                readOnly
              />
              {!allDay && (
                <Input
                  type="time"
                  {...register("toTime")}
                  defaultValue="18:00"
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Host</label>
            <Input type="text" {...register("host")} placeholder="Enter host name" />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Participants</label>
            <Input
              type="text"
              {...register("participants")}
              placeholder="None"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Related To</label>
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
            <label className="w-40 text-gray-600">Repeat</label>
            <Select
              {...register("repeat")}
              options={[
                { value: "None", label: "None" },
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-gray-600">Participants Reminder</label>
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

          {/*  Submit */}
          <div className="text-center mt-8">
            <Button text="Save Meeting" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
