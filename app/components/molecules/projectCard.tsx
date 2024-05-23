import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger, spring } from 'motion';

const ProjectCard = (props: { id: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const project = useRef(null);

    useEffect(() => {
        if (isHovered && project.current) {
            // animate list apparition 
            const listElements = project.current?.querySelectorAll('ul  li');
            listElements && animate(listElements,
                { opacity: 1, transform: "translateY(0px)" },
                {
                    delay: (index) => {
                        return index * 0.05;
                    }, duration: 0.3, easing: spring({mass: 8})
                });
        } else {
            const listElements = [...project.current?.querySelectorAll('ul  li')].reverse();
            listElements && animate(listElements,
                { opacity: 0, transform: "translateY(-8px)" },
                {
                    delay: (index) => {
                        return index * 0.05;
                    }, duration: 0.3
                }).finished
                .then(() => {
                    listElements && animate(listElements,
                        { transform: "translateY(8px)" },
                        { duration: 0 });
                })

        }
    }, [isHovered])

    return (
        <div ref={project} className="group/item grid grid-cols-8 gap-2 cursor-pointer" onMouseEnter={() => {
            setIsHovered(true)
        }} onMouseLeave={() => {
            setIsHovered(false)
        }}>
            <div data-item-img className="project-card aspect-[3/4] bg-orange-800 h-auto col-start-1 col-end-7 relative">
                <div className=" bg-red-500 absolute w-auto h-full">
                    <picture className="w-full h-full object-cover relative before:content-[' '] before:absolute before:top-0 before:left-0 before:bg-gradient-to-b from-transparent via-transparent to-[#0000007d] before:h-full before:w-full">
                        <img src="https://source.unsplash.com/random/664x778/?louisiana" className="w-full h-full object-cover" alt='' />
                    </picture>
                </div>
                <div className="group-hover/item:opacity-100 opacity-0 ease-in-out duration-300 flex justify-between content-center absolute bottom-0 w-full p-2">
                    <h3 className=" text-white">
                        Ceci est mon titre
                    </h3>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className='group-hover/item:translate-x-0 ease-in-out duration-300  -translate-x-2'>
                        <circle cx="16.9525" cy="16.0482" r="16.0482" fill="white" />
                        <path d="M23.9365 16.4937C23.9365 16.74 23.8386 16.9762 23.6644 17.1503L18.0921 22.7226C17.917 22.8918 17.6824 22.9854 17.4389 22.9833C17.1954 22.9812 16.9624 22.8835 16.7902 22.7113C16.618 22.5391 16.5204 22.3062 16.5183 22.0627C16.5161 21.8192 16.6097 21.5846 16.7789 21.4094L20.7659 17.4225L10.0058 17.4225C9.75949 17.4225 9.52327 17.3246 9.3491 17.1504C9.17493 16.9763 9.07708 16.7401 9.07708 16.4937C9.07708 16.2474 9.17493 16.0112 9.3491 15.837C9.52327 15.6629 9.75949 15.565 10.0058 15.565L20.7659 15.565L16.7789 11.5781C16.6097 11.4029 16.5161 11.1683 16.5183 10.9248C16.5204 10.6813 16.618 10.4484 16.7902 10.2762C16.9624 10.104 17.1954 10.0063 17.4389 10.0042C17.6824 10.0021 17.917 10.0957 18.0921 10.2649L23.6644 15.8371C23.8386 16.0113 23.9365 16.2475 23.9365 16.4937Z" fill="#92978A" />
                    </svg>
                </div>
            </div>
            <ul className=" h-full w-auto flex flex-col gap-2 col-start-7">
                {
                    [...new Array(6)].map((el, index) => {
                        return (
                            <li className={"delay-[" + (index > 4 ? index / 2 * 100 : index * 50) + "ms] group-hover/item:opacity-100 opacity-0 transform translate-y-8 ease-in-out duration-300 bg-blue-700 aspect-[4/3] h-auto w-full" + (index === 0 && " outline-1 outline-lime-300 outline outline-offset-4")}></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ProjectCard;