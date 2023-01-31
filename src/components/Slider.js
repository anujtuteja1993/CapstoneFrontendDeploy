import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

//variants for Framer Motion
const variants = {
    initial: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: direction => {
        return {
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }
    },
}

//Re-usable Slider component
const Slider = (imagesProp) => {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const images = imagesProp.games;

    function nextStep() {
        setDirection(1)
        if (index === images.length - 1) {
            setIndex(0)
            return
        }
        setIndex(index + 1)
    }

    function prevStep() {
        setDirection(-1)
        if (index === 0) {
            setIndex(images.length - 1)
            return
        }
        setIndex(index - 1)
    }

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    variants={variants}
                    animate='animate'
                    initial='initial'
                    exit='exit'
                    src={images[index]}
                    alt='games'
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    key={images[index]}
                    custom={direction}
                />
            </AnimatePresence>
            <button className='lg:p-5 sm:p-2 aspect-square rounded-full bg-[#28313B] border-none cursor-pointer text-center text-white lg:text-xl absolute top-[45%] left-[5px] opacity-20 hover:opacity-75 outline-none' onClick={prevStep}>
                <MdOutlineKeyboardArrowLeft size={25} />
            </button>
            <button className='lg:p-5 sm:p-2 aspect-square rounded-full bg-[#28313B] border-none cursor-pointer text-center text-white lg:text-xl absolute top-[45%] right-[5px] opacity-20 hover:opacity-75 outline-none' onClick={nextStep}>
                <MdOutlineKeyboardArrowRight size={25} />
            </button>
        </>
    )
}

export default Slider;