import { useState } from "react";
import Button from "../components/Button";
import "../index.css";

import { useEffect } from 'react';


export default function Home() {
    const [step, setStep] = useState(1);
    const [biodata, setBiodata] = useState({
        nama: "",
        umur: "",
        jeniskelamin: "",
        tinggibadan: "",
        beratbadan: "",
    });

    const [answers, setAnswers] = useState({
        activityLevel: '',
        smokingStatus: '',
        alcoholConsumption: '',
        diet: '',
        chronicDiseases: '',
        medicationUse: '',
        familyHistory: '',
        mentalHealthStatus: '',
        sleepPatterns: ''
    });
    
    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value
        }));
    };
    
    
    const [errors, setErrors] = useState({
        nama: false,
        umur: false,
        jeniskelamin: false,
        tinggibadan: false,
        beratbadan: false,
    });

    const [progress, setProgress] = useState(0);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        let value = e.target.value;
    
        if (value.length > 3) {
            value = value.slice(0, 3);
        }
    
        setBiodata({ ...biodata, [e.target.name]: e.target.value });
    };
    
    useEffect(() => {
        const filledFields = Object.values(biodata).filter((field) => field !== "").length;

        let stepProgress = 0;
        if (step === 2) {
            stepProgress = 100 / 5; 
        } else if (step === 3) {
            stepProgress = 100 / 5;
        }
    
        const percentage = (filledFields * stepProgress);
        setProgress(percentage);
    }, [biodata, step]);
    
    

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

    const RadioQuestion = ({ question, options, name, number, value, onChange }) => (
        <div className="flex justify-star my-6">
            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-black text-white text-lg font-medium p-5 m-3">
                {number}
            </div>

            <div className="mt-3 ml-2">
                <h1 className="text-2xl font-medium">{question}</h1>

                <div className="flex flex-wrap gap-2 mt-2">
                    {options.map((option) => (
                        <label key={option} className="cursor-pointer">
                            <input
                                type="radio"
                                name={name}
                                value={option}
                                checked={value === option}
                                onChange={onChange}
                                className="hidden"
                            />
                            <span
                                className={`p-3 px-4 flex justify-center border w-40 border-black cursor-pointer hover:bg-black hover:text-white ${
                                    value === option ? 'bg-black text-white' : 'bg-white text-black'
                                }`}
                            >
                                {option}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="items-center justify-center bg-blue-200 h-screen">
            <form className="flex items-center justify-center bg-white h-full" >
                
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

                            <div className="flex flex-col justify-between w-3/5 px-16 pt-16 pb-8">
                                <div>
                                    <h1 className="text-5xl">Biodata</h1>
                                    <h2 className="font-light mt-2">Masukkan biodata terlebih dahulu untuk memulai</h2>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <label className="border-black text-lg block font-medium">Nama</label>
                                        <input type="text" name="nama" placeholder="Masukkan nama" value={biodata.nama} onChange={handleChange} className="w-full border p-3 px-4 border-black p-2 mb-3 mt-1 hover:border-2 focus:border-2" />
                                    </div>
                                    
                                    <div>
                                        <label className="border-black text-lg block font-medium">Umur</label>
                                        <input
                                            type="number"
                                            name="umur"
                                            placeholder="Masukkan umur"
                                            value={biodata.umur}
                                            onChange={handleChange}
                                            onInput={e => handleMaxValue(e, 'umur', 300)}
                                            className="w-full border p-3 px-4 border-black p-2 mb-3 mt-1 hover:border-2 focus:border-2" />
                                            {errors.umur && (
                                            <p className="text-red-500 text-sm">Umur tidak boleh lebih dari 300</p>
                                        )}
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

                                    <div className="col-start-1 col-end-3">
                                        <label className="border-black text-lg font-medium">Jenis Kelamin</label>
                                        <div className="flex items-center mb-3 mt-1">
                                            <label className="mr-6">
                                                <input
                                                    type="radio"
                                                    name="jenisKelamin"
                                                    value="Laki-laki"
                                                    checked={biodata.jenisKelamin === 'Laki-laki'}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span
                                                    className={`p-3 px-4 flex justify-center border w-40 border-black cursor-pointer hover:bg-black hover:text-white ${
                                                        biodata.jenisKelamin === 'Laki-laki' ? 'bg-black text-white' : 'bg-white text-black'
                                                    }`}
                                                >
                                                    Laki-laki
                                                </span>
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="jenisKelamin"
                                                    value="Perempuan"
                                                    checked={biodata.jenisKelamin === 'Perempuan'}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span
                                                    className={`p-3 px-4 flex justify-center border w-40 border-black cursor-pointer hover:bg-black hover:text-white ${
                                                        biodata.jenisKelamin === 'Perempuan' ? 'bg-black text-white' : 'bg-white text-black'
                                                    }`}
                                                >
                                                    Perempuan
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <Button onClick={prevStep}>Back</Button>
                                        <Button onClick={nextStep}>Next</Button>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-xs font-light mb-0">{Math.round(progress)}% Complete</div>
                                        <div className="w-full h-1.5 bg-gray-300 mt-1">
                                            <div
                                                className="h-full bg-black transition-all duration-300 ease-in-out"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    
                )}

                {step === 3 && (
                    <div className="h-screen w-screen mx-32 mt-32 bg-red-100 border-2 border-black">
                        <RadioQuestion
                            question="Physical Activity Level"
                            number="1"
                            name="activityLevel"
                            options={['Moderate', 'Low', 'High']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Smoking Status"
                            number="2"
                            name="smokingStatus"
                            options={['Former', 'Current', 'Never']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Alcohol Consumption"
                            number="3"
                            name="alcoholConsumption"
                            options={['Occasional', 'Frequent', 'None']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Diet"
                            number="4"
                            name="diet"
                            options={['Low-carb', 'Balanced', 'Vegetarian', 'High-fat']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Chronic Diseases"
                            number="5"
                            name="chronicDiseases"
                            options={['Hypertension', 'Diabetes', 'Heart Disease', 'None']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="h-screen w-screen mx-32 mt-32 bg-red-100 border-2 border-black">
                        <RadioQuestion
                            question="Medication Use"
                            number="6"
                            name="medicationUse"
                            options={['Regular', 'Occasional', 'None']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Family History"
                            number="7"
                            name="familyHistory"
                            options={['Heart Disease', 'Hypertension', 'Diabetes', 'None']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Mental Health Status"
                            number="8"
                            name="mentalHealthStatus"
                            options={['Good', 'Poor', 'Fair', 'Excellent']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <RadioQuestion
                            question="Sleep Patterns"
                            number="9"
                            name="sleepPatterns"
                            options={['Insomnia', 'Normal', 'Excessive']}
                            onChange={(e) => handleAnswerChange(e)}
                        />

                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={nextStep}>Next</Button>
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