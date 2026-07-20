import { Check, Camera } from '@gravity-ui/icons';
import { Form, Button } from "@heroui/react";
import React from 'react';

const PetForm = ({ handleSubmit, handleImageUpload, imageLoading, imageUrl, loading, ownerEmail }) => {
  
  const inputClass = "w-full bg-[#fdfbf9] dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 hover:border-rose-200 dark:hover:border-zinc-600 rounded-xl h-11 px-3 outline-none text-slate-700 dark:text-zinc-300 text-sm appearance-none transition-all focus:border-rose-300 dark:focus:border-zinc-500 focus:ring-0";
  const labelClass = "text-slate-600 dark:text-zinc-300 font-semibold mb-1 text-sm";
  const optionClass = "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300";

  return (
    <Form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full">
        
        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Pet Name *</label>
          <input 
            type="text"
            name="petName" 
            placeholder="Pet's name" 
            required 
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1 w-full justify-end">
          <label className={labelClass}>Upload Photo *</label>
          <div className="flex items-center gap-3 w-full bg-[#fdfbf9] dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 h-11 px-4 rounded-xl relative group transition-all hover:border-rose-200 dark:hover:border-zinc-600">
            <label className="flex items-center gap-2 cursor-pointer w-full h-full">
              <Camera className="text-slate-500 group-hover:text-rose-400 transition-colors" />
              <span className="text-sm font-medium text-slate-500 dark:text-zinc-400 group-hover:text-rose-500 transition-colors truncate">
                {imageLoading ? "Uploading..." : imageUrl ? "Image loaded successfully" : "Upload a photo"}
              </span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={imageLoading} required /> 
            </label>
            {imageUrl && (
              <span className="text-emerald-500 flex items-center absolute right-3">
                <Check height={18} width={18}/>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <label className={labelClass}>Species *</label>
          <select name="species" defaultValue="" required className={inputClass}>
            <option value="" disabled hidden className={optionClass}>Select species</option>
            <option value="Dog" className={optionClass}>Dog</option>
            <option value="Cat" className={optionClass}>Cat</option>
            <option value="Bird" className={optionClass}>Bird</option>
            <option value="Rabbit" className={optionClass}>Rabbit</option>
            <option value="Other" className={optionClass}>Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Breed *</label>
          <input 
            type="text"
            name="breed" 
            placeholder="Pet's breed" 
            required 
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Age *</label>
          <input 
            type="text"
            name="age" 
            placeholder="e.g. 2 years or 3 months" 
            required 
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <label className={labelClass}>Gender *</label>
          <select name="gender" defaultValue="" required className={inputClass}>
            <option value="" disabled hidden className={optionClass}>Select gender</option>
            <option value="Male" className={optionClass}>Male</option>
            <option value="Female" className={optionClass}>Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Health Status *</label>
          <input 
            type="text"
            name="healthStatus" 
            placeholder="e.g. Healthy / Active" 
            required 
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <label className={labelClass}>Vaccination Status *</label>
          <select name="vaccinationStatus" defaultValue="" required className={inputClass}>
            <option value="" disabled hidden className={optionClass}>Select status</option>
            <option value="Fully Vaccinated" className={optionClass}>Fully Vaccinated</option>
            <option value="Partially Vaccinated" className={optionClass}>Partially Vaccinated</option>
            <option value="Not Vaccinated" className={optionClass}>Not Vaccinated</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Location *</label>
          <input 
            type="text"
            name="location" 
            placeholder="e.g. Dhaka, Bangladesh" 
            required 
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className={labelClass}>Adoption Fee *</label>
          <input 
            type="number"
            name="adoptionFee" 
            placeholder="0 (Leave 0 if free)" 
            required 
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1 w-full">
          <label className={labelClass}>Owner Email</label>
          <input 
            type="email"
            name="ownerEmail" 
            value={ownerEmail || ""} 
            readOnly 
            className="w-full bg-slate-200/40 dark:bg-zinc-950 border-none rounded-xl h-11 px-3 outline-none text-slate-400 opacity-80 cursor-not-allowed text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className={labelClass}>Description *</label>
        <textarea 
          name="description" 
          placeholder="Tell us about the pet's story, temperament, medical needs..." 
          required 
          rows={4}
          className="w-full bg-[#fdfbf9] dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 hover:border-rose-200 dark:hover:border-zinc-600 rounded-xl p-3 outline-none text-slate-700 dark:text-zinc-300 text-sm transition-all focus:border-rose-300 dark:focus:border-zinc-500 focus:ring-0 min-h-[100px]"
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4 border-t border-slate-200/60 dark:border-zinc-800 pt-6">
        <Button 
          type="button"
          variant="bordered"
          className="rounded-full px-8 py-5 border-slate-300 text-slate-600 hover:bg-slate-50 font-bold transition-all"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="rounded-full px-10 py-5 bg-[#3c4856] dark:bg-zinc-100 text-white dark:text-black font-bold transition-all shadow-md hover:opacity-90" 
          disabled={imageLoading || loading}
          isLoading={loading}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default PetForm;