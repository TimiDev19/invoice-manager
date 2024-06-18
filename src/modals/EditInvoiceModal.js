import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../config/firestore'
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const EditInvoiceModal = ({ setisEditInvoiceModalOpen, invoices, id }) => {
    const [editedInvoices, setInvoices] = useState([]);
    const navigate = useNavigate()
    const invoice = invoices.find((invoice) => {
        return invoice.id === id
    })

    const getInvoices = async () => {
        const querySnapshot = await getDocs(collection(db, "invoices"));
        const invoices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setInvoices(invoices)
    }

    const [billFromCity, setbillFromCity] = useState(invoice.billFromCity)
    const [billFromCountry, setbillFromCountry] = useState(invoice.billFromCountry)
    const [billFromPostcode, setbillFromPostcode] = useState(invoice.billFromPostcode)
    const [billFromStreetAddress, setbillFromStreetAddress] = useState(invoice.billFromStreetAddress)
    const [billToCity, setbillToCity] = useState(invoice.billToCity)
    const [billToClientEmail, setbillToClientEmail] = useState(invoice.billToClientEmail)
    const [billToClientName, setbillToClientName] = useState(invoice.billToClientName)
    const [billToCountry, setbillToCountry] = useState(invoice.billToCountry)
    const [billToPostcode, setbillToPostcode] = useState(invoice.billToPostcode)
    const [billToStreetAddress, setbillToStreetAddress] = useState(invoice.billToStreetAddress)
    const [invoiceDate, setinvoiceDate] = useState(invoice.invoiceDate)
    const [paymentTerms, setpaymentTerms] = useState(invoice.paymentTerms)
    const [description, setdescription] = useState(invoice.description)
    const [status, setstatus] = useState(invoice.status)


    const handleUpdate = async (e) => {
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
                await setDoc(doc(db, "invoices", id), {
                    ...newInvoice
                });

            } catch (error) {
                console.log(error)
            }



            invoices.push(newInvoice);
            setisEditInvoiceModalOpen(false);
            getInvoices()
            navigate("/")

        }


    }



    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return
            }
            setisEditInvoiceModalOpen(false)
        }} className='absolute z-50 w-full h-[100vh] top-0 left-0 bottom-0 right-0 bg-[#00000080]'>
            <div className=' bg-white sm:ml-[4%] sm:w-1/3 w-full h-[100vh] rounded-r-lg overflow-y-scroll text-left p-9'>
                <h1 className=' font-bold text-xl mb-8'> Edit <span className=' text-[#7E88C3]'>#</span>{invoice.id}</h1>
                <form className=' flex flex-col h-full' onSubmit={handleUpdate}>
                    <h1 className=' text-[#7C5DFA] text-sm font-semibold mb-4'>Bill From</h1>
                    <label className=' text-sm mb-2 text-[#7E88C3]'>Street Address</label>
                    <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromStreetAddress} onChange={e => setbillFromStreetAddress(e.target.value)} />

                    <div className=' flex items-center justify-between mb-8'>
                        <div className=' flex flex-col w-[30%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>City</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromCity} onChange={e => setbillFromCity(e.target.value)} />
                        </div>

                        <div className=' flex flex-col md:w-[30%] w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Post Code</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromPostcode} onChange={e => setbillFromPostcode(e.target.value)} />
                        </div>

                        <div className=' hidden md:flex flex-col md:w-[30%] w-[45%]'>
                            <label className=' text-sm mb-2 text-[#7E88C3]'>Country</label>
                            <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={billFromCountry} onChange={e => setbillFromCountry(e.target.value)} />
                        </div>
                    </div>

                    <div className='md:hidden flex flex-col w-full'>
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
                        <option value={"Pending"}>Select Status</option>
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
                    {/* <input className='border border-[#7E88C3] px-4 py-2 rounded-md focus:outline-none focus:border-[#9277FF] mb-4' type='text' value={status} onChange={e => setstatus(e.target.value)} /> */}
                    <button>Submit</button>
                </form>
            </div>


        </div>
    )
}

export default EditInvoiceModal
