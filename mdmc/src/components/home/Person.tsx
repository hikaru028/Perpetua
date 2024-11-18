import React, { FC } from 'react'
import Image from 'next/image'
import PersonImage from '../../../public/images/person.png'

const Person: FC = () => {
    return (
        <div className="bg-custom-background w-full h-auto p-0">
            <Image src={PersonImage} alt='person' />
        </div>
    )
}

export default Person



