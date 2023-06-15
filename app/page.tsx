'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react';
import {collection, addDoc, getDoc, onSnapshot, query, deleteDoc, doc} from "firebase/firestore";

import {ItemsType} from '@/types/types';
import {dataBase} from '@/app/firebase';

export default function Home() {
    const [items, setItems] = useState<ItemsType>([
/*        {name: 'Coffee', price: 4.95},
        {name: 'Movie', price: 26.34},
        {name: 'Sweets', price: 3.95},*/
    ]);
    const [newItem, setNewItem] = useState({name: '', price: ''});

    const [total, setTotal] = useState(0);

    //Add data to database
    const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newItem.name !== '' && newItem.price !== '') {
            let correctTypeItems = {price: +newItem.price, name: newItem.name}

            await addDoc(collection(dataBase, 'items'), {
                name: correctTypeItems.name,
                price: correctTypeItems.price
            })
            setItems([...items, correctTypeItems])
        }
    }

    //Read data from database
    useEffect(() => {
        const q = query(collection(dataBase,'items'))
        const unsunscribe = onSnapshot(q,(querySnapshot) => {
            let itemArr =[]
            querySnapshot.forEach((doc) => {
                itemArr.push({...doc.data(),id:doc.id})
            })
            setItems(itemArr)

            //Read total from itemArr
            const calculateTotal = () => {
                const totalPrice = itemArr.reduce((sum,item) =>  sum+ parseFloat(item.price),0)
                setTotal(totalPrice)
            }
            calculateTotal()
            return () => unsunscribe()
        })
    }, []);


    //Delete item from database
    const deleteItem = async (id:any) => {
        await deleteDoc(doc(dataBase,'items',id))
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
                <h1 className={'text-4xl p-4'}>Expense Tracker</h1>
                <div className={'bg-slate-400 p-4 rounded-lg'}>
                    <form className={'grid grid-cols-6 items-center text-black'} onSubmit={addItem}>
                        <input className={'col-span-3 p-3 border '} type="text" placeholder={'Entire item'}
                               value={newItem.name}
                               onChange={(e) => setNewItem({...newItem, name: e.target.value})}/>
                        <input className={'col-span-2 p-3 border mx-3 '} type="text" placeholder={'Entire $'}
                               value={newItem.price}
                               onChange={(e) => setNewItem({...newItem, price: e.target.value})}/>
                        <button type={'submit'}
                                className={'text-white bg-slate-500 hover:bg-slate-700 p-3 text-xl'}>+
                        </button>
                    </form>
                    <ul>
                        {items.map((item, id) => (
                            <li key={id} className={'my-4 w-full flex justify-between bg-slate-500 '}>
                                <div className={'p-4 w-full flex justify-between'}>
                                    <span className={'capitalize'}>{item.name}</span>
                                    <span>{item.price}</span>
                                </div>
                                <button className={'ml-8 p-4 border-l-2 border-slate-500 hover:bg-slate-700 w-16'}
                                onClick={()=>deleteItem(item.id)}>x
                                </button>
                            </li>))}
                    </ul>
                    {items.length < 1 ? ('') : (
                        <div className={'flex justify-between p-3'}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
