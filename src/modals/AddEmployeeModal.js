import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firestore'

const AddEmployeeModal = ({ invoices, setInvoice, setAddEmployeeModalOpen, getInvoices }) => {
    const [billFromCity, setbillFromCity] = useState("")
    const [billFromCountry, setbillFromCountry] = useState("")
    const [billFromPostcode, setbillFromPostcode] = useState("")
    const [billFromStreetAddress, setbillFromStreetAddress] = useState("")
    const [billToCity, setbillToCity] = useState("")
    const [billToClientEmail, setbillToClientEmail] = useState("")
    const [billToClientName, setbillToClientName] = useState("")
    const [billToCountry, setbillToCountry] = useState("")
    const [billToPostcode, setbillToPostcode] = useState("")
    const [billToStreetAddress, setbillToStreetAddress] = useState("")
    const [invoiceDate, setinvoiceDate] = useState("")
    const [paymentTerms, setpaymentTerms] = useState("")
    const [description, setdescription] = useState("")
    const [status, setstatus] = useState("")

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!billFromCity ||
            !billFromCountry ||
            !billFromPostcode ||
            !billFromStreetAddress ||
            !billToCity ||
            !billToClientEmail ||
            !billToClientName ||
            !billToCountry ||
            !billToPostcode ||
            !billToStreetAddress ||
            !status ||
            !invoiceDate ||
            !paymentTerms ||
            !description) {
            window.alert("Fill all fields")
        } else {
            const newInvoice = {
                billFromCity,
                billFromCountry,
                billFromPostcode,
                billFromStreetAddress,
                billToCity,
                billToClientEmail,
                billToClientName,
                billToCountry,
                billToPostcode,
                billToStreetAddress,
                status,
                invoiceDate,
                paymentTerms,
                description,

            }

            try {
                await addDoc(collection(db, "invoices"), {
                    ...newInvoice
                });
            } catch (error) {
                console.log(error)
            }


            invoices.push(newInvoice);
            setAddEmployeeModalOpen(false);
            getInvoices()

        }


    }
    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return
            }
            setAddEmployeeModalOpen(false)
        }} className='absolute z-50 w-full max-h-[100vh] top-0 left-0 bottom-0 right-0 bg-[#00000080]'>
            <div className=' bg-white sm:ml-[4%] w-full sm:w-2/3 md:w-1/3 h-[100vh] rounded-r-lg overflow-y-scroll text-left p-9 pb-0'>
                <h1 className=' font-bold text-xl mb-8'>New Invoice</h1>
                <form onSubmit={handleAdd} className=' flex flex-col h-full'>
                    <h1 className=' text-[#7C5DFA] text-sm font-semibold mb-4'>Bill From</h1>
                    <label className=' text-sm mb-2 text-[#7E88C3]'>Street Address</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromStreetAddress} onChange={e => setbillFromStreetAddress(e.target.value)} />

                    <div className=' flex items-center justify-between mb-8'>
                        <div className=' flex flex-col md:w-[30%] w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>City</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromCity} onChange={e => setbillFromCity(e.target.value)} />
                        </div>

                        <div className=' flex flex-col md:w-[30%] w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Post Code</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromPostcode} onChange={e => setbillFromPostcode(e.target.value)} />
                        </div>

                        <div className=' md:flex hidden flex-col w-[30%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Country</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromCountry} onChange={e => setbillFromCountry(e.target.value)} />
                        </div>
                    </div>
                    <div className=' md:hidden flex flex-col'>
                        <label className=' text-sm mb-2 text-[#7E88C3]'>Country</label>
                        <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromCountry} onChange={e => setbillFromCountry(e.target.value)} />
                    </div>


                    <h1 className=' text-[#7C5DFA] text-sm font-semibold mb-4'>Bill To</h1>
                    <label className=' text-sm mb-2 text-[#7E88C3]'>Client Name</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billToClientName} onChange={e => setbillToClientName(e.target.value)} />
                    <label className=' text-sm mb-2 text-[#7E88C3]'>Client Email</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='email' value={billToClientEmail} onChange={e => setbillToClientEmail(e.target.value)} />
                    <label className=' text-sm mb-2 text-[#7E88C3]'>Street Address</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billToStreetAddress} onChange={e => setbillToStreetAddress(e.target.value)} />

                    <div className=' flex items-center justify-between mb-8'>
                        <div className=' flex flex-col w-[30%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>City</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billToCity} onChange={e => setbillToCity(e.target.value)} />
                        </div>

                        <div className=' flex flex-col w-[30%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Post Code</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billToPostcode} onChange={e => setbillToPostcode(e.target.value)} />
                        </div>

                        <div className=' flex flex-col w-[30%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Country</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billToCountry} onChange={e => setbillToCountry(e.target.value)} />
                        </div>
                    </div>

                    <label className=' text-sm mb-2 text-[#7E88C3]'>Status</label>
                    <select className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' value={status} onChange={e => setstatus(e.target.value)}>
                        <option value={"Pending "}>Select Status</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Paid"}>Paid</option>
                    </select>

                    <div className=' flex items-center justify-between mb-8'>
                        <div className=' flex flex-col w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Invoice Date</label>
                            <input type="date" className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' value={invoiceDate} onChange={e => setinvoiceDate(e.target.value)} />
                        </div>

                        <div className=' flex flex-col w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Payment Terms</label>
                            <select className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' value={paymentTerms} onChange={e => setpaymentTerms(e.target.value)}>
                                <option value={"1 day from draft"}>Next 1 day</option>
                                <option value={"7 days from draft"}>Next 7 days</option>
                                <option value={"30 days from draft"}>Next 30 days</option>
                            </select>
                        </div>
                    </div>

                    <label className=' text-sm mb-2 text-[#7E88C3]'>Project Description</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={description} onChange={e => setdescription(e.target.value)} />
                    <div className=' flex items-center justify-between'>
                        <button className=' p-2 bg-[#7C5DFA] text-white rounded-full'>Add</button>
                        <button onClick={() => setAddEmployeeModalOpen(false)} className=' p-2 bg-red-500 text-white rounded-full sm:hidden'>Cancel</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AddEmployeeModal
