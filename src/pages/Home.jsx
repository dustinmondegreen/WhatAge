import { useState } from "react";
import Button from "../components/Button";
import "../index.css";


export default function Home() {
    const [step, setStep] = useState(1);
    const [biodata, setBiodata] = useState({
        nama: "",
        umur: "",
        gender: "",
        tinggibadan: "",
        beratbadan: "",
    });
    
    const [errors, setErrors] = useState({
        tinggibadan: false,
        beratbadan: false,
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        setBiodata({ ...biodata, [e.target.name]: e.target.value });
    };

    const handleMaxValue = (e, name, max) => {
        const value = e.target.value;
        if (value > max) {
            setErrors({ ...errors, [name]: true });
            e.target.value = max;
        } else {
            setErrors({ ...errors, [name]: false });
        }
        setBiodata({ ...biodata, [name]: e.target.value });
    };
  

  return (
    <div className="items-center justify-center bg-blue-200 h-screen">
        <form className="flex items-center justify-center rounded-2xl bg-white h-full" >
            
            {step === 1 && (
                <div className="flex items-center justify-center text-center w-full h-full p-64" >
                    <div className="">
                    <h1 className="text-5xl font-medium text-blue-700 mb-4">Welcome to <span className="font-bold text-blue-800">WhatAge</span></h1>
                    <p className="text-gray-700 my-12 mx-32">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse potenti. Sed euismod, nulla a feugiat fermentum, augue erat venenatis nunc, ac dignissim ex elit at justo.
                    </p>
                    <Button onClick={nextStep}>Mulai</Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex items-center w-full h-full">
                    <div className="w-full">
                    
                    <div className="flex w-full">
                        <div className="w-2/5 bg-cover h-screen" style={{ backgroundImage: 'url(/view.jpg)' }}></div>

                        <div className="w-3/5 p-16">
                            <div>
                                <h1 className="text-5xl">Biodata</h1>
                                <h2>Masukkan biodata terlebih dahulu untuk memulai</h2>
                            </div>

                            <div className="grid grid-cols-2 mt-12 gap-x-8 gap-y-6">
                                <div>
                                    <label className="border-black text-lg block font-medium">Nama</label>
                                    <input type="text" name="nama" placeholder="Masukkan nama" value={biodata.nama} onChange={handleChange} className="w-full border p-3 px-4 border-black p-2 mb-3 mt-1 hover:border-2 focus:border-2" />
                                </div>
                                
                                <div>
                                    <label className="border-black text-lg block font-medium">Umur</label>
                                    <input type="number" name="umur" placeholder="Masukkan umur" value={biodata.umur} onChange={handleChange} className="w-full border p-3 px-4 border-black p-2 mb-3 mt-1 hover:border-2 focus:border-2" />
                                </div>

                                <div>
                                    <label className="border-black text-lg block font-medium">Tinggi Badan</label>
                                    <div className="flex items-center border p-3 px-4 border-black p-2 mb-3 mt-1">
                                        <input
                                            type="number"
                                            name="tinggibadan"
                                            placeholder="Masukkan tinggi badan"
                                            value={biodata.tinggibadan}
                                            onChange={handleChange}
                                            onInput={e => handleMaxValue(e, 'tinggibadan', 250)}
                                            className="w-full border-0 focus:ring-0"
                                        />
                                        <span className="ml-2">cm</span>
                                    </div>
                                    {errors.tinggibadan && (
                                        <p className="text-red-500 text-sm">Tinggi badan tidak boleh lebih dari 250 cm</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="border-black text-lg block font-medium">Berat Badan</label>
                                    <div className="flex items-center border p-3 px-4 border-black p-2 mb-3 mt-1">
                                        <input
                                            type="number"
                                            name="beratbadan"
                                            placeholder="Masukkan berat badan"
                                            value={biodata.beratbadan}
                                            onChange={handleChange}
                                            onInput={e => handleMaxValue(e, 'beratbadan', 200)}
                                            className="w-full border-0 focus:bor-0"
                                        />
                                        <span className="ml-2">kg</span>
                                    </div>
                                    {errors.beratbadan && (
                                        <p className="text-red-500 text-sm">Berat badan tidak boleh lebih dari 300 kg</p>
                                    )}
                                </div>

                                <div>
                                    <label className="border-black text-lg block font-medium">Jenis Kelamin</label>
                                    <div className="flex items-center mb-3 mt-1">
                                        <label className="mr-4">
                                            <input
                                            type="radio"
                                            name="jenisKelamin"
                                            value="Laki-laki"
                                            checked={biodata.jenisKelamin === 'Laki-laki'}
                                            onChange={handleChange}
                                            className="mr-2 text-xl"
                                            />
                                            Laki-laki
                                        </label>
                                        
                                        <label>
                                            <input
                                            type="radio"
                                            name="jenisKelamin"
                                            value="Perempuan"
                                            checked={biodata.jenisKelamin === 'Perempuan'}
                                            onChange={handleChange}
                                            className="mr-2"
                                            />
                                            Perempuan
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button onClick={prevStep}>Kembali</Button>
                                <Button onClick={nextStep}>Lanjut</Button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                
            )}

            {step === 3 && (
                <div>asdsad

                    <div className="flex justify-between">
                        <Button onClick={prevStep}>Kembali</Button>
                        <Button onClick={nextStep}>Lanjut</Button>
                    </div>
                </div>
            )}

        </form>

        <div className="fixed bottom-0 left-0 w-full bg-gray-200 h-2">
            <div 
                className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step - 1) * 33.33}%` }} 
            />
        </div>
    </div>

  );
}
