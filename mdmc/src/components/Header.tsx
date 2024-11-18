import React from 'react'
import Image from 'next/image'
import Logo from '../../public/images/mdmc-logo.png'

const Header = () => {
    return (
        <div className="bg-custom-background sticky top-0 left-0 w-full h-auto py-12 px-40 row-start-1 flex gap-6 flex-wrap items-center justify-between">
            <Image src={Logo} alt='mdmc-logo' width={150} />
            <menu>
                <ul className="flex gap-24 flex-wrap items-center justify-center text-white">
                    <li className="font-light text-2xl">About</li>
                    <li className="font-light text-2xl">Work</li>
                    <li className="font-light text-2xl">News</li>
                    <li className="font-light text-2xl">Contact</li>
                </ul>
            </menu>
        </div>
    )
}

export default Header