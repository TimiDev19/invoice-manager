import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firestore'
import { useEffect, useState } from 'react';
import AddEmployeeModal from '../modals/AddEmployeeModal';
import { Link } from 'react-router-dom';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import emptyInvoice from '../assets/Email campaign_Flatline.png'

const Home = () => {
    const [invoices, setInvoices] = useState([]); // Initialize with an empty array
    const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false)
    const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

    const getInvoices = async () => {
        const querySnapshot = await getDocs(collection(db, "invoices"));
        const invoices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setInvoices(invoices)

    }
    console.log(`there are ${invoices.length} invoices`)

    useEffect(() => {
        getInvoices()
    }, [])

    if (invoices.length == 0) {
        return (
            <div className='flex flex-col items-center h-[100vh] w-full bg-[#F8F8FB] dark:bg-[#0C0E16]'>
                <div className=' w-full'>
                    <div className=' w-[80%] m-auto flex my-6 justify-between items-center'>
                        <div className=' text-left'>
                            <h1 className=' text-3xl font-bold dark:text-white'>Invoices</h1>
                            <p className=' text-slate-400'>No Invoices</p>
                        </div>
                        <div className=' flex items-center justify-end'>
                            <select className=' mx-5 bg-transparent dark:text-white'>
                                <option className=''>Filter by status</option>
                            </select>
                            <button onClick={() => setAddEmployeeModalOpen(true)} className=' bg-[#7C5DFA] px-3 py-2 rounded-full text-white font-semibold flex items-center justify-center'><div className=' mr-3 h-6 w-6 flex items-center justify-center text-[#7C5DFA] bg-white rounded-full'>+</div>New Invoice</button>
                        </div>
                    </div>

                </div>
                <div>
                    <img className=' w-full mt-24' src={emptyInvoice} />
                    <h1 className=' font-bold dark:text-white text-center mt-8 text-2xl'>There is nothing here</h1>
                    <h1 className=' text-[#888EB0] text-sm'>Create a new invoice by clicking the <br /> <span className=' font-bold'>New Invoice</span> button and get started</h1>
                </div>
                {
                    addEmployeeModalOpen && <AddEmployeeModal invoices={invoices} getInvoices={getInvoices} setAddEmployeeModalOpen={setAddEmployeeModalOpen} setInvoices={setInvoices} />
                }
            </div>
        )



    }
    // else if (!invoices) {
    //     return (<div className=' h-[100vh] w-[100vw] flex items-center justify-center'>
    //         <button type="button" class="bg-indigo-500 flex items-center justify-center p-2 text-white rounded-lg" disabled>
    //             <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    //                 <RefreshOutlinedIcon />
    //             </svg>
    //             Processing...
    //         </button>
    //     </div>)
    // }
    else {
        return (
            <div className='flex h-[100vh] w-full bg-[#F8F8FB] dark:bg-[#0C0E16]'>
                <div className=' w-full'>
                    <div className=' w-[80%] m-auto flex my-6 justify-between items-center'>
                        <div className=' text-left'>
                            <h1 className=' text-3xl font-bold dark:text-white'>Invoices</h1>
                            <p className=' text-slate-400 font-semibold'><span className='hidden sm:inline'>There are</span> {invoices.length} <span className=' hidden sm:inline'>total</span> invoices</p>
                        </div>
                        <div className=' flex items-center justify-end'>
                            <select className=' mx-5 bg-transparent hidden sm:block dark:text-white'>
                                <option className=''>Filter by status</option>
                            </select>
                            <select className=' mx-5 bg-transparent sm:hidden dark:text-white'>
                                <option className=''>Filter</option>
                            </select>

                            <button onClick={() => setAddEmployeeModalOpen(true)} className=' bg-[#7C5DFA] w-fit px-1 py-1 sm:px-3 sm:py-2 text-sm rounded-full text-white font-semibold flex items-center justify-center'><div className=' mr-1 sm:mr-3 h-6 w-6 flex items-center justify-center text-[#7C5DFA] bg-white rounded-full'>+</div>New <span className='hidden sm:block'>Invoice</span></button>
                        </div>
                    </div>
                    <ul className=' md:w-[80%] max-w-[90%] overflow-hidden m-auto'>
                        {invoices.map((invoice) => (
                            <>
                                <li key={invoice.id} className='hidden sm:flex items-center justify-between bg-white dark:bg-[#1E2139] dark:shadow-none dark:text-white px-4 py-6 shadow shadow-slate-200 mb-4 rounded-xl cursor-pointer duration-300 hover:shadow-md'>
                                    <p className=' block sm:text-sm text-center md:text-base'>{invoice.id}</p>
                                    <p className=' w-[15%] sm:text-sm text-center  md:text-base'>{invoice.billToClientName}</p>
                                    <p className=' w-[15%] sm:text-sm text-center md:text-base'>{invoice.billToCity}</p>
                                    <p className=' w-[15%] sm:text-sm text-center md:text-base'>{invoice.billToCountry}</p>
                                    {
                                        invoice.status === "Paid" ? (
                                            <p className='w-[10%] text-center text-sm md:text-base sm:w-fit  bg-green-200 text-green-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                        ) : invoice.status === "Pending" ? (
                                            <p className='w-[10%] text-center text-sm md:text-base sm:w-fit bg-amber-200 text-amber-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                        ) : (
                                            <p className='w-[10%] text-center text-sm md:text-base sm:w-fit bg-gray-200 text-gray-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                        )
                                    }
                                    <Link to={`/invoice/${invoice.id}`}><p className=' w-fit text-left'>&gt;</p></Link>
                                </li>

                                <Link to={`/invoice/${invoice.id}`}>
                                    <li key={invoice.id} className=' sm:hidden flex flex-col items-center justify-between bg-white dark:bg-[#1E2139] dark:shadow-none dark:text-white px-4 py-6 shadow shadow-slate-200 mb-4 rounded-xl cursor-pointer duration-300 hover:shadow-md'>
                                        <div className=' flex w-full items-center justify-between mb-5'>
                                            <p className=' block text-sm text-center font-bold'>{invoice.id}</p>
                                            <p className=' text-sm text-left text-[#858BB2]'>{invoice.billToClientName}</p>
                                        </div>
                                        <div className='flex w-full items-center justify-between'>
                                            <div>
                                                <p className='text-sm sm:text-sm text-left md:text-base'>{invoice.billToCity}</p>
                                                <p className='text-sm sm:text-sm text-left md:text-base'>{invoice.billToCountry}</p>
                                            </div>
                                            {
                                                invoice.status === "Paid" ? (
                                                    <p className=' text-center text-sm md:text-base sm:w-fit  bg-green-200 text-green-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                                ) : invoice.status === "Pending" ? (
                                                    <p className=' text-center text-sm md:text-base sm:w-fit bg-amber-200 text-amber-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                                ) : (
                                                    <p className=' text-center text-sm md:text-base sm:w-fit bg-gray-200 text-gray-500 font-bold capitalize rounded-sm py-2 px-2'>{invoice.status}</p>
                                                )
                                            }
                                        </div>
                                        {/* <Link to={`/invoice/${invoice.id}`}><p className=' w-fit text-left'>&gt;</p></Link> */}
                                    </li>
                                </Link>

                            </>

                        ))}
                    </ul>
                    {
                        addEmployeeModalOpen && <AddEmployeeModal invoices={invoices} getInvoices={getInvoices} setAddEmployeeModalOpen={setAddEmployeeModalOpen} setInvoices={setInvoices} />
                    }
                </div>

            </div>
        )
    }
}

export default Home
