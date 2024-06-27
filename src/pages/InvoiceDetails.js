import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firestore'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import EditInvoiceModal from '../modals/EditInvoiceModal';



const InvoiceDetails = () => {
    const [invoices, setInvoices] = useState([]);
    const [isEditInvoiceModalOpen, setisEditInvoiceModalOpen] = useState(false)
    const navigate = useNavigate()
    const getInvoices = async () => {
        const querySnapshot = await getDocs(collection(db, "invoices"));
        const invoices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setInvoices(invoices)
    }

    useEffect(() => {
        getInvoices()
    }, [])


    const { id } = useParams()
    console.log(id)

    const invoice = invoices.find((invoice) => {
        return invoice.id === id
    })

    console.log(invoice)

    const handleDelete = () => {
        const filteredInvoices = invoices.filter(invoice => invoice.id = id)
        deleteDoc(doc(db, "invoices", id));
        const [invoicesCopy] = filteredInvoices.filter(invoice => invoice.id !== id)
        setInvoices(invoicesCopy)
        navigate("/")

    }



    if (!invoice) {
        return <div className=' h-[100vh] w-[100vw] flex items-center justify-center'>
            <button type="button" class="bg-indigo-500 flex items-center justify-center p-2 text-white rounded-lg" disabled>
                <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <RefreshOutlinedIcon />
                </svg>
                Processing...
            </button>
        </div>
    } else {

        return <div className=' bg-[#F8F8FB] dark:bg-[#0C0E16] h-[100vh] w-[100vw] py-7'>
            <div className=' max-w-[90%] md:w-[65%] flex flex-col items-center justify-start m-auto'>
                <div className=' w-full items-start'><Link to='/' className='flex items-center justify-center w-fit text-[#7C5DFA] font-bold'>&lt; <h1 className=' ml-3 font-bold text-black dark:text-white'>Go back</h1></Link></div>

                <div className=' bg-white cursor-pointer dark:bg-[#1E2139] dark:shadow-none w-full py-4 px-6 mt-5 shadow shadow-slate-200 mb-4 rounded-xl hidden sm:flex items-center justify-between'>
                    <div className=' flex items-center justify-center'>
                        <h1 className=' text-sm text-[#858BB2] mr-5'>Status</h1>
                        {
                            invoice.status === "Paid" ? (
                                <p className=' px-5 text-center bg-green-200 text-green-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                            ) : invoice.status === "Pending" ? (
                                <p className=' px-5 text-center bg-amber-200 text-amber-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                            ) : (
                                <p className=' px-5 text-center bg-gray-200 text-gray-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                            )
                        }
                    </div>

                    <div className=' flex'>
                        <div onClick={() => setisEditInvoiceModalOpen(true)} className=' py-2 px-4 mx-2 bg-[#F9FAFE] w-[80px] rounded-full text-center text-sm font-bold text-[#7E88C3] dark:bg-[#252945]'>Edit</div>
                        <div onClick={handleDelete} className=' py-2 px-4 mx-2 bg-[#EC5757] w-fit rounded-full text-center text-sm font-bold text-white'>Delete</div>
                        <div className=' py-2 px-4 mx-2 bg-[#7C5DFA] w-fit rounded-full text-center text-sm font-bold text-white'>Mark as Paid</div>
                    </div>
                </div>


                {/* The Phone view status bar */}
                <div className=' sm:hidden bg-white cursor-pointer dark:bg-[#1E2139] dark:shadow-none w-full py-4 px-6 mt-5 shadow shadow-slate-200 mb-4 rounded-xl flex items-center justify-between'>
                    <h1 className=' text-sm text-[#858BB2] mr-5'>Status</h1>
                    {
                        invoice.status === "Paid" ? (
                            <p className=' px-5 text-center bg-green-200 text-green-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                        ) : invoice.status === "Pending" ? (
                            <p className=' px-5 text-center bg-amber-200 text-amber-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                        ) : (
                            <p className=' px-5 text-center bg-gray-200 text-gray-500 font-bold capitalize rounded-full py-2'>{invoice.status}</p>
                        )
                    }
                </div>

                <div className=' hidden sm:block bg-white dark:bg-[#1E2139] dark:shadow-none w-full py-8 px-8 mt-5 shadow shadow-slate-200 mb-4 rounded-xl'>
                    <div className=' w-full flex items-start justify-between'>
                        <div>
                            <h1 className=' font-bold dark:text-white'>{invoice.id}</h1>
                            <h1 className=' text-sm text-[#7E88C3] mb-6 dark:text-[#DFE3FA]'>{invoice.description}</h1>
                        </div>

                        <div className=' text-[#7E88C3] dark:text-[#DFE3FA] text-right'>
                            <h1>{invoice.billFromStreetAddress}</h1>
                            <h1>{invoice.billFromCity}</h1>
                            <h1>{invoice.billFromPostcode}</h1>
                            <h1>{invoice.billFromCountry}</h1>
                        </div>
                    </div>

                    <div className=' w-full flex items-start'>
                        <div className=' w-[30%]'>
                            <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-semibold mb-6'>Invoice Date</h1>
                            <h1 className=' font-bold mb-6 dark:text-white'>{invoice.invoiceDate}</h1>
                            <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-semibold mb-6'>Payment Terms</h1>
                            <h1 className=' font-bold dark:text-white'>{invoice.paymentTerms}</h1>
                        </div>
                        <div className=' w-[30%]'>
                            <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-semibold mb-6'>Bill To</h1>
                            <h1 className=' font-bold mb-4 dark:text-white'>{invoice.billToClientName}</h1>
                            <div className=' text-[#7E88C3] dark:text-[#DFE3FA]'>
                                <h1>{invoice.billToStreetAddress}</h1>
                                <h1>{invoice.billToCity}</h1>
                                <h1>{invoice.billToPostcode}</h1>
                                <h1>{invoice.billToCountry}</h1>
                            </div>
                        </div>
                        <div className=' w-[30%]'>
                            <h1 className=' text-sm text-[#7E88C3] font-semibold mb-6 dark:text-[#DFE3FA]'>Sent To</h1>
                            <h1 className=' font-bold dark:text-white'>{invoice.billToClientEmail}</h1>
                        </div>
                    </div>
                </div>

                <div className=' sm:hidden bg-white dark:bg-[#1E2139] dark:shadow-none w-full py-8 px-8 mt-5 shadow shadow-slate-200 mb-4 rounded-xl'>

                    <div>
                        <h1 className=' font-bold dark:text-white'>{invoice.id}</h1>
                        <h1 className=' text-sm text-[#7E88C3] mb-6 dark:text-[#DFE3FA]'>{invoice.description}</h1>
                    </div>

                    <div className=' text-[#7E88C3] dark:text-[#DFE3FA] text-left'>
                        <h1>{invoice.billFromStreetAddress}</h1>
                        <h1>{invoice.billFromCity}</h1>
                        <h1>{invoice.billFromPostcode}</h1>
                        <h1>{invoice.billFromCountry}</h1>
                    </div>


                    <div className=' w-full'>

                        <div className=' flex items-center justify-between'>
                            <div>
                                <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] mt-6'>Invoice Date</h1>
                                <h1 className=' font-bold mb-4 dark:text-white'>{invoice.invoiceDate}</h1>
                            </div>
                            <div>
                                <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] mt-6'>Bill To</h1>
                                <h1 className=' font-bold mb-4 dark:text-white'>{invoice.billToClientName}</h1>
                            </div>
                        </div>


                        <div className=' flex items-center justify-between'>
                            <div className=' flex flex-col items-start justify-center'>
                                <h1 className=' text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-semibold mt-6'>Payment Terms</h1>
                                <h1 className=' font-bold dark:text-white'>{invoice.paymentTerms}</h1>
                            </div>


                            <div className=' text-[#7E88C3] dark:text-[#DFE3FA] text-right'>
                                <h1>{invoice.billToStreetAddress}</h1>
                                <h1>{invoice.billToCity}</h1>
                                <h1>{invoice.billToPostcode}</h1>
                                <h1>{invoice.billToCountry}</h1>
                            </div>
                        </div>






                        <h1 className=' text-sm text-[#7E88C3] font-semibold mt-6 dark:text-[#DFE3FA]'>Sent To</h1>
                        <h1 className=' font-bold dark:text-white'>{invoice.billToClientEmail}</h1>



                    </div>

                    <div className=' grid grid-cols-2 sm:flex items-center justify-center mt-6'>
                        <div onClick={() => setisEditInvoiceModalOpen(true)} className=' py-2 px-4 mx-2 bg-[#F9FAFE] w-[80px] rounded-full text-center text-sm font-bold text-[#7E88C3] dark:bg-[#252945]'>Edit</div>
                        <div onClick={handleDelete} className=' py-2 px-4 mx-2 bg-[#EC5757] w-fit rounded-full text-center text-sm font-bold text-white'>Delete</div>
                        <div className=' mt-4 sm:mt-0 py-2 px-1 mx-2 bg-[#7C5DFA] w-fit rounded-full text-center text-sm font-bold text-white'>Mark as Paid</div>
                    </div>
                </div>
            </div>
            {
                isEditInvoiceModalOpen && <EditInvoiceModal setisEditInvoiceModalOpen={setisEditInvoiceModalOpen} invoices={invoices} id={invoice.id} />
            }
        </div>
    }
}

export default InvoiceDetails
