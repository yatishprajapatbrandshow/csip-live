import React from 'react'
import Card from './Card'

const Activities = ({ cardData, title }) => {
    return (
        <>
            <section>
                <div className='ml-20 p-6 '>
                    <h2 className='text-3xl font-gilBold'>{title}</h2>
                    <div className='mt-8 flex gap-6 w-full'>
                        {cardData?.map((activity) => (
                            <Card key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Activities