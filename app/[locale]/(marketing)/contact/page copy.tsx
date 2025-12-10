import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ContactPage = () => {
    return (
        <div className='min-h-screen bg-[#eee9ed] pb-20 pt-36'>
            <section className='max-w-7xl bg-[#ebefff] rounded-2xl h-screen mx-auto relative'
                style={{
                    backgroundImage: 'url(/contact/bg-contact.PNG)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundOrigin: 'border-box',
                }}
            >
                <div className='max-w-7xl  px-10 py-8 mx-auto relative'>

                    <div className='flex justify-between w-full'>
                        <div className='space-y-2 pt-8'>
                            <h1 className='text-2xl'>
                                Entrons en contact !
                            </h1>
                            <p className='text-xs'>
                                Vous avez une question ou besoin d’aide ?<br />Contactez-nous par email, téléphone ou via le formulaire ci-dessous.<br />Nous serons ravis de vous accompagner.
                            </p>
                            <p className='font-bold text-sm'>
                                Nous serons ravis de<br />vous accompagner.
                            </p>
                        </div>
                        <div className='max-w-1/2'>
                            <form action="" className='space-y-4'>
                                <div>
                                    <Label className='text-black'> Nom & prénom</Label>
                                    <Input className='border-1 border-gray-700 rounded-3xl p-2' />
                                </div>
                                <div>
                                    <Label className='text-black'> Email</Label>
                                    <Input className='border-1 border-gray-700 rounded-3xl p-2' />
                                </div>
                                <div>
                                    <Label className='text-black '> Votre message</Label>
                                    <Textarea cols={10} className='border-1 border-gray-700' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='inline-flex space-x-4 absolute bottom-6 left-16'>
                    <Image src="/contact/fb.svg" alt='fb icon' width={20} height={20} />
                    <Image src="/contact/whatsapp.svg" alt='fb icon' width={20} height={20} />
                    <Image src="/contact/telegram.svg" alt='fb icon' width={20} height={20} />
                </div>
                <div className='flex flex-col space-y-3 absolute bottom-6 right-16'>
                    <h1 className='text-lg font-semibold'>Contact</h1>
                    <p className='inline-flex space-x-4 text-sm'><Image className='mr-2' src="/contact/phone.svg" alt='phone icon' width={20} height={20} /> + 262 2 62 28 26 25</p>
                    <p className='inline-flex space-x-2 text-sm'><Image className='mr-2' src="/contact/mail.svg" alt='phone icon' width={20} height={20} /> gnsbtp@gmail.com</p>
                    <p className='inline-flex space-x-2 text-sm'><Image className='mr-2' src="/contact/localisation.svg" alt='phone icon' width={20} height={20} />La Réunion</p>
                </div>
            </section>
        </div>
    )
}

export default ContactPage