import { useEffect, useRef, useState } from "react";

const ProjectSlider = ({ closeProject, currentIndex }) => {
    const currentImage = useRef();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // get div size and position from the screen 
        const basePicture = document.querySelector(`[data-project-id="${currentIndex - 1}"] [data-item-img]`);
        const basePitureRect = basePicture && basePicture.getBoundingClientRect();
        const currentImageRect = currentImage.current.getBoundingClientRect();

        const animatePicture = () => {
            const keyframes = [
                { height: basePitureRect.height + 'px', width: basePitureRect.width + "px", transform: `translate(${(basePitureRect.left - currentImageRect.left) + 'px'}, ${(basePitureRect.top - currentImageRect.top) + 'px'})` },
                { height: currentImageRect.height + 'px', width: currentImageRect.width + "px", transform: `translate(0px, 0px)` }
            ]

            currentImage.current.animate(keyframes, { duration: 300, iterations: 1, fill: "forwards", easing: 'ease-in-out' })
        }
        basePitureRect && animatePicture();

        // block global scroll
        window?.lenis.stop();
    }, []);

    return (
        <section className="fixed top-0 left-0 h-screen w-screen flex flex-col bg-main justify-center content-center items-center p-16">
            <div className=" aspect-ratio[4/3] max-w-screen-lg max-h-[calc(100vh-300px)] h-full w-full">
                <div ref={currentImage} className="bg-orange-800 aspect-ratio[4/3] max-w-screen-lg h-full w-full">
                    <picture>
                        <img src="https://source.unsplash.com/random/664x778/?louisiana" className="w-full h-full object-cover" />
                    </picture>
                </div>
            </div>
            <div className=" after:content-[' '] m-4 after:block after:h-full after:aspect-[4/3] after:absolute after:top-0 after:left-0 after:outline after:outline-1 after:outline-lime-100 after:outline-offset-8 after:pointer-events-none" style={{ transform: "translate(50%, 0px)" }}>
                <ul className="h-32 grid grid-flow-col gap-2 w-fit  ease-in-out duration-300" style={{ transform: `translateX(-${currentStep * (100 / (5.95))}%)` }}>
                    {[...new Array(6)].map((el, index) => {
                        return (
                            <li className="group delay-0  ease-in-out duration-300 bg-blue-700 aspect-[4/3] h-auto w-full cursor-pointer flex justify-center content-center items-center overflow-hidden" onClick={() => {
                                currentStep === index && closeProject(0);
                                setCurrentStep(index)
                            }}>
                                {currentStep === index && (<svg className="group-hover:opacity-100 ease-in-out duration-300 transition-opacity opacity-0 delay-100" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16.0482" cy="16.0482" r="16.0482" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7558 22.8568C20.8351 22.9362 20.9293 22.9992 21.0329 23.0423C21.1366 23.0853 21.2478 23.1075 21.36 23.1075C21.4723 23.1076 21.5834 23.0856 21.6872 23.0427C21.7909 22.9998 21.8851 22.9369 21.9646 22.8575C22.044 22.7782 22.107 22.684 22.15 22.5804C22.193 22.4767 22.2152 22.3655 22.2153 22.2533C22.2154 22.141 22.1933 22.0299 22.1504 21.9262C22.1075 21.8224 22.0446 21.7282 21.9653 21.6487L16.8106 16.494L21.9653 11.3407C22.1257 11.1803 22.2158 10.9628 22.2158 10.736C22.2158 10.5091 22.1257 10.2916 21.9653 10.1312C21.8049 9.97079 21.5874 9.88068 21.3605 9.88068C21.1337 9.88068 20.9162 9.97079 20.7558 10.1312L15.6025 15.2859L10.4492 10.1312C10.3698 10.0518 10.2755 9.98876 10.1718 9.94578C10.068 9.9028 9.95679 9.88068 9.84447 9.88068C9.73215 9.88068 9.62094 9.9028 9.51717 9.94578C9.4134 9.98876 9.31911 10.0518 9.23969 10.1312C9.07929 10.2916 8.98918 10.5091 8.98918 10.736C8.98918 10.8483 9.01131 10.9595 9.05429 11.0633C9.09727 11.167 9.16027 11.2613 9.23969 11.3407L14.3944 16.494L9.23969 21.6487C9.07949 21.8091 8.98957 22.0266 8.98971 22.2533C8.98985 22.48 9.08004 22.6973 9.24043 22.8575C9.40083 23.0177 9.6183 23.1077 9.84499 23.1075C10.0717 23.1074 10.289 23.0172 10.4492 22.8568L15.6025 17.7021L20.7558 22.8568Z" fill="#92978A" />
                                </svg>)}
                            </li>
                        )
                    })}
                </ul>
            </div>

        </section>
    )
}

export default ProjectSlider;