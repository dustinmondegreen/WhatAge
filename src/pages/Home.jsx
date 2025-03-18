import { useState } from "react";
import Button from "../components/Button";
import "../index.css";


export default function Home() {
  const [step, setStep] = useState(1);
  const [biodata, setBiodata] = useState({ nama: "", umur: "", gender: "" });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleChange = (e) => setBiodata({ ...biodata, [e.target.name]: e.target.value });

  return (
    <div className="flex items-center justify-center bg-blue-100 h-screen overflow-hidden">
    <div className="max-h-[90vh] bg-white shadow-lg rounded-2xl w-full m-12">
    
    {step === 1 && (
        <div className="flex items-center justify-center text-center w-full h-full p-64">
            <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome to WhatAge</h1>
            <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Sed euismod, nulla a feugiat fermentum, augue erat venenatis nunc, ac dignissim ex elit at justo.
            </p>
            <Button onClick={nextStep}>Mulai</Button>
            </div>
        </div>
    )}


    {step === 2 && (
        <div className="flex items-center justify-center text-center w-full h-full p-64">
            <div className="w-full">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Isi Biodata</h2>
            
            <div className="flex w-full">
                <div className="w-2/5 flex flex-col items-center justify-center bg-blue-50 p-6 rounded-lg shadow">
                <img src="/biodata-3d.png" alt="Biodata" className="w-32 mb-4" />
                <h2 className="text-xl font-bold text-blue-800 mb-2">Isi Biodata</h2>
                <p className="text-center text-gray-700">
                    Masukkan informasi pribadi agar hasil survei lebih akurat.
                </p>
                </div>

                <div className="w-3/5 p-6">
                <label className="block font-semibold">Nama</label>
                <input type="text" name="nama" value={biodata.nama} onChange={handleChange} className="w-full border p-2 rounded-md mb-3" />
                
                <label className="block font-semibold">Umur</label>
                <input type="number" name="umur" value={biodata.umur} onChange={handleChange} className="w-full border p-2 rounded-md mb-3" />

                <label className="block font-semibold">Jenis Kelamin</label>
                <select name="gender" value={biodata.gender} onChange={handleChange} className="w-full border p-2 rounded-md mb-4">
                    <option value="">Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>

                <div className="flex justify-between">
                    <Button onClick={prevStep}>Kembali</Button>
                    <Button onClick={nextStep}>Lanjut</Button>
                </div>
                </div>
            </div>
            </div>
        </div>
        )}

      </div>
    </div>
  );
}
