
import React, { useEffect, useRef } from "react";
import eventBus from "../../scripts/eventBus";

const Loader = () => {
    const loaderSection = useRef<HTMLBaseElement>(null);

    const loadAnimation = () => {
        const counterWrapper = loaderSection.current?.querySelector('#counterWrapper > span');
        const layers = loaderSection.current?.querySelectorAll('div.absolute');

        const animation1 = counterWrapper?.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-5940px)' }, 
            { transform: 'translateY(-5940px)', opacity: 1 }, 
            { transform: 'translateY(-100%)', opacity: 0 }
        ], {
            duration: 2000,
            iterations: 1,
            easing: 'ease-in-out',
            delay: 300,
            fill: 'forwards'
        });
        animation1?.cancel();

        const animation2 = layers && [...layers]?.reverse()?.map((element, index) => {
            return element.animate([
                { height: '100vh'},
                { height: '0vh' }
            ], {
                duration: 1000,
                iterations: 1,
                easing: 'ease-in-out',
                fill: 'forwards', 
                delay: index * 100
            }); 
        });
        animation2?.forEach(el => el.cancel());

        animation1 && animation1.play()
        animation1 && animation2 && animation1.finished.then(()=>{
            animation2 && animation2.forEach((element) => {
                element.play()
            });
        })

        animation2 && animation2[animation2?.length - 1].finished.then(() => {
            let contentEl = document.getElementById('content');
            contentEl?.animate([
                { opacity: 0, transform: 'translateY(60px)' },
                { opacity: 1, transform: 'translateY(0px)' }
            ], {
                duration: 500,
                iterations: 1,
                easing: 'ease-in-out',
                fill: 'forwards'
            }).finished.then(el => {
                el.cancel();
                contentEl && contentEl.setAttribute('style', 'opacity: 1; translateY(0px);');
                eventBus.dispatch('loadingFinished');
            });
        })
        console.log(counterWrapper, layers);
    }

    useEffect(() => {
        loadAnimation();
    }, [])
    return (
        <section ref={loaderSection} className='block z-[100] fixed top-0 left-0 h-screen w-screen  text-white pointer-events-none'>
            {[...new Array(6)].map((el, index) => {
                return (
                    <div key={index} className={`absolute top-0 left-0 h-[100vh] w-screen bg-orange-${index+1 +'00'} flex content-center items-center justify-center`}>
                        {index === 5 && (<>
                            <div id="counterWrapper" className=" overflow-hidden h-[60px] w-[200px]">
                                <span className="flex flex-col">{[...new Array(100)].map((el, id) => <span className='font-["Shrikhand"] text-6xl' key={id}>{id + 1}%</span>)}</span>
                            </div>
                            <svg className="absolute bottom-8 left-8" width="151" height="28" viewBox="0 0 151 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.644 11L1.948 11.012C2.344 10.952 2.584 10.676 2.68 10.196C2.776 9.716 2.824 8.588 2.824 6.812C2.824 5.036 2.776 3.908 2.68 3.428C2.584 2.948 2.344 2.672 1.948 2.612H5.308C6.76 2.612 7.9 2.996 8.716 3.776C9.532 4.556 9.94 5.564 9.94 6.8C9.94 8 9.568 8.996 8.824 9.8C8.08 10.604 7.024 11 5.644 11ZM5.632 10.844L5.62 10.856C6.484 10.856 7.204 10.508 7.78 9.812C8.356 9.116 8.644 8.12 8.644 6.812C8.644 6.14 8.5 5.504 8.212 4.904C7.924 4.304 7.492 3.8 6.916 3.404C6.34 3.008 5.68 2.804 4.948 2.804C4.648 2.804 4.372 2.84 4.12 2.924C3.952 3.572 3.868 4.88 3.868 6.836C3.868 8.72 3.916 9.92 4 10.436C4.144 10.568 4.384 10.664 4.708 10.736C5.032 10.808 5.344 10.844 5.632 10.844ZM15.1379 2.432L15.1139 2.456C15.9899 2.456 16.7579 2.672 17.4179 3.104C18.0779 3.536 18.5699 4.076 18.8819 4.724C19.1939 5.372 19.3499 6.068 19.3499 6.824C19.3499 7.58 19.1939 8.276 18.8819 8.924C18.5699 9.572 18.0899 10.112 17.4299 10.544C16.7699 10.976 16.0019 11.192 15.1259 11.192C14.2499 11.192 13.4819 10.976 12.8219 10.544C12.1619 10.112 11.6819 9.572 11.3699 8.924C11.0579 8.276 10.9019 7.568 10.9019 6.812C10.9019 6.056 11.0579 5.348 11.3699 4.7C11.6819 4.052 12.1739 3.512 12.8339 3.08C13.4939 2.648 14.2619 2.432 15.1379 2.432ZM15.1139 11.048C15.7499 11.048 16.2899 10.856 16.7459 10.46C17.2019 10.064 17.5379 9.56 17.7539 8.936C17.9699 8.312 18.0779 7.616 18.0779 6.836C18.0779 6.056 17.9699 5.36 17.7539 4.736C17.5379 4.112 17.2019 3.608 16.7459 3.212C16.2899 2.816 15.7499 2.624 15.1139 2.624C14.4779 2.624 13.9379 2.816 13.4819 3.212C13.0259 3.608 12.6899 4.112 12.4739 4.736C12.2579 5.36 12.1499 6.056 12.1499 6.836C12.1499 7.616 12.2579 8.312 12.4739 8.936C12.6899 9.56 13.0259 10.064 13.4819 10.46C13.9379 10.856 14.4779 11.048 15.1139 11.048ZM27.7543 11.384L27.7423 11.42C26.3383 9.62 24.2623 7.232 21.5023 4.268V7.856C21.5023 8.948 21.6583 9.752 21.9583 10.268C22.2583 10.784 22.7503 11.036 23.4343 11.036H20.3863C20.8303 11.036 21.1063 10.856 21.2023 10.508C21.2983 10.16 21.3463 9.332 21.3463 8.024V7.844V5.396C21.3463 3.548 20.7463 2.624 19.5583 2.624H21.8983C22.0423 2.852 22.2463 3.116 22.5223 3.416C24.7903 6.008 26.4583 7.868 27.5143 8.996V6.8C27.5143 4.976 27.4903 3.872 27.4303 3.5C27.3463 3.02 27.1663 2.732 26.8903 2.648C26.8063 2.624 26.6983 2.612 26.5663 2.612H28.9903C28.7743 2.612 28.5943 2.648 28.4383 2.72C28.2823 2.792 28.1623 2.924 28.0663 3.128C27.9703 3.332 27.8983 3.512 27.8383 3.68C27.7783 3.848 27.7423 4.124 27.7183 4.508C27.6943 4.892 27.6823 5.216 27.6823 5.468C27.6823 5.72 27.6823 6.116 27.6823 6.656V6.788V9.272C27.6823 10.22 27.7063 10.928 27.7543 11.384ZM34.2789 8.576L30.6909 8.6L30.4149 9.296C30.2109 9.824 30.2109 10.244 30.4269 10.556C30.6429 10.868 31.0749 11.024 31.7109 11.024H28.4229C28.8189 11.024 29.1549 10.892 29.4189 10.628C29.6829 10.364 29.9349 9.92 30.1869 9.296L30.5349 8.432V8.42L32.3229 3.98C32.0949 3.512 31.8549 3.164 31.6029 2.936C31.3509 2.708 31.0509 2.6 30.6909 2.6H33.0669C33.8229 4.664 34.6869 6.776 35.6589 8.924C35.7909 9.224 35.9109 9.464 36.0189 9.656C36.1269 9.848 36.2589 10.064 36.4149 10.292C36.5709 10.52 36.7389 10.688 36.9309 10.808C37.1229 10.928 37.3269 10.988 37.5309 10.988H35.0349C34.9509 10.52 34.6989 9.716 34.2789 8.576ZM32.4069 4.196L30.7389 8.432H34.1709C33.8469 7.604 33.6189 7.052 33.4989 6.776C33.3909 6.512 33.2109 6.08 32.9589 5.48C32.7069 4.88 32.5269 4.448 32.4069 4.196ZM40.2029 1.304L40.1909 1.328C40.0109 1.328 39.8669 1.268 39.7589 1.148C39.6509 1.028 39.6029 0.883999 39.6029 0.727999C39.6029 0.572 39.6629 0.427999 39.7709 0.308C39.8789 0.188 40.0229 0.128 40.2029 0.128C40.3589 0.128 40.4909 0.188 40.5989 0.308C40.7069 0.427999 40.7669 0.559999 40.7669 0.715999C40.7669 0.872 40.7069 1.004 40.5989 1.124C40.4909 1.244 40.3589 1.304 40.2029 1.304ZM42.1589 1.328L42.1469 1.352C41.9669 1.352 41.8229 1.292 41.7149 1.172C41.6069 1.052 41.5589 0.908 41.5589 0.752C41.5589 0.595999 41.6189 0.451999 41.7269 0.331999C41.8349 0.211999 41.9789 0.151999 42.1589 0.151999C42.3149 0.151999 42.4469 0.211999 42.5549 0.331999C42.6629 0.451999 42.7229 0.584 42.7229 0.74C42.7229 0.895999 42.6629 1.028 42.5549 1.148C42.4469 1.268 42.3149 1.328 42.1589 1.328ZM37.9829 11.048V11.06C38.3789 11 38.6189 10.724 38.7149 10.244C38.8109 9.764 38.8589 8.636 38.8589 6.86C38.8589 5.084 38.8109 3.956 38.7149 3.476C38.6189 2.996 38.3789 2.72 37.9829 2.66H43.5029L43.8869 5.108C43.6349 3.584 42.6389 2.828 40.8869 2.828H40.0829C39.9629 3.44 39.9029 4.7 39.9029 6.608H41.4749C41.9309 6.608 42.2549 6.44 42.4469 6.104C42.6389 5.768 42.7349 5.264 42.7349 4.604V8.708C42.7349 8.072 42.6269 7.592 42.4109 7.256C42.1949 6.92 41.8829 6.752 41.4749 6.752H39.9029C39.9029 8.9 39.9869 10.256 40.1549 10.832H40.5509C42.8429 10.832 44.0789 9.92 44.2589 8.096L43.9949 11.048H37.9829ZM51.5646 11H45.5766C45.9726 10.94 46.2126 10.664 46.3086 10.184C46.4046 9.704 46.4526 8.576 46.4526 6.8C46.4526 5.024 46.4046 3.896 46.3086 3.416C46.2126 2.936 45.9726 2.66 45.5766 2.6H48.0006C47.7486 2.708 47.6046 2.984 47.5566 3.44C47.5086 3.896 47.4846 5.012 47.4966 6.8C47.4966 8.324 47.5206 9.26 47.5806 9.608C47.6646 10.196 47.8926 10.556 48.2526 10.7C48.4326 10.76 48.6486 10.796 48.9126 10.796C49.4166 10.796 49.8726 10.7 50.2686 10.52C50.6646 10.34 50.9886 10.1 51.2406 9.788C51.4926 9.476 51.6966 9.152 51.8406 8.816C51.9846 8.48 52.1046 8.108 52.1886 7.712L51.5646 11ZM64.4632 2.6L67.8592 2.636C67.3192 2.636 66.9112 2.744 66.6232 2.96C66.3352 3.176 66.1072 3.524 65.9272 3.992C65.5552 4.976 65.0632 6.392 64.4512 8.252C63.8392 10.112 63.4912 11.168 63.4072 11.42C62.7832 9.728 62.0392 7.568 61.1872 4.94C60.5632 6.86 59.7952 9.02 58.8952 11.408C58.6192 10.652 58.3552 9.908 58.1032 9.164C57.8512 8.42 57.5512 7.484 57.1912 6.356C56.8312 5.228 56.5912 4.484 56.4712 4.112C56.3752 3.812 56.3032 3.596 56.2432 3.464C56.1832 3.332 56.0872 3.188 55.9552 3.032C55.8232 2.876 55.6552 2.768 55.4392 2.708C55.2232 2.648 54.9472 2.612 54.6112 2.612H57.4192C57.7792 4.256 58.4632 6.548 59.4592 9.5C60.4192 6.728 60.9592 5.072 61.0792 4.532C60.9832 4.256 60.8992 4.016 60.8392 3.8C60.7072 3.404 60.5032 3.104 60.2272 2.9C59.9512 2.696 59.5552 2.6 59.0392 2.6H61.8472C62.0272 3.668 62.7112 5.96 63.8992 9.488C64.7272 6.908 65.1952 5.408 65.3032 4.988C65.5792 3.92 65.6032 3.224 65.3752 2.912C65.2072 2.708 64.9072 2.6 64.4632 2.6ZM71.7203 8.576L68.1323 8.6L67.8563 9.296C67.6523 9.824 67.6523 10.244 67.8683 10.556C68.0843 10.868 68.5163 11.024 69.1523 11.024H65.8643C66.2603 11.024 66.5963 10.892 66.8603 10.628C67.1243 10.364 67.3763 9.92 67.6283 9.296L67.9763 8.432V8.42L69.7643 3.98C69.5363 3.512 69.2963 3.164 69.0443 2.936C68.7923 2.708 68.4923 2.6 68.1323 2.6H70.5083C71.2643 4.664 72.1283 6.776 73.1003 8.924C73.2323 9.224 73.3523 9.464 73.4603 9.656C73.5683 9.848 73.7003 10.064 73.8563 10.292C74.0123 10.52 74.1803 10.688 74.3723 10.808C74.5643 10.928 74.7683 10.988 74.9723 10.988H72.4763C72.3923 10.52 72.1403 9.716 71.7203 8.576ZM69.8483 4.196L68.1803 8.432H71.6123C71.2883 7.604 71.0603 7.052 70.9403 6.776C70.8323 6.512 70.6523 6.08 70.4003 5.48C70.1483 4.88 69.9683 4.448 69.8483 4.196ZM81.4123 11H75.4243C75.8203 10.94 76.0603 10.664 76.1563 10.184C76.2523 9.704 76.3003 8.576 76.3003 6.8C76.3003 5.024 76.2523 3.896 76.1563 3.416C76.0603 2.936 75.8203 2.66 75.4243 2.6H77.8483C77.5963 2.708 77.4523 2.984 77.4043 3.44C77.3563 3.896 77.3323 5.012 77.3443 6.8C77.3443 8.324 77.3683 9.26 77.4283 9.608C77.5123 10.196 77.7403 10.556 78.1003 10.7C78.2803 10.76 78.4963 10.796 78.7603 10.796C79.2643 10.796 79.7203 10.7 80.1163 10.52C80.5123 10.34 80.8363 10.1 81.0883 9.788C81.3403 9.476 81.5443 9.152 81.6883 8.816C81.8323 8.48 81.9523 8.108 82.0363 7.712L81.4123 11ZM88.817 2.6L88.685 5.54C88.709 4.712 88.469 4.04 87.977 3.536C87.485 3.032 86.681 2.78 85.565 2.78H85.553V6.812C85.553 8.528 85.589 9.596 85.673 10.004C85.769 10.496 85.985 10.796 86.321 10.916C86.501 10.976 86.765 11.012 87.101 11.012H83.417C83.945 11.012 84.269 10.82 84.377 10.448C84.485 10.076 84.533 9.176 84.521 7.76V6.8V2.768H84.509C82.589 2.768 81.545 3.728 81.377 5.66L81.629 2.6H88.817ZM90.2022 11V11.012C90.5982 10.952 90.8382 10.676 90.9342 10.196C91.0302 9.716 91.0782 8.588 91.0782 6.812C91.0782 5.036 91.0302 3.908 90.9342 3.428C90.8382 2.948 90.5982 2.672 90.2022 2.612H95.7222L96.1062 5.06C95.8542 3.536 94.8582 2.78 93.1062 2.78H92.3022C92.1822 3.392 92.1222 4.652 92.1222 6.56H93.6942C94.1502 6.56 94.4742 6.392 94.6662 6.056C94.8582 5.72 94.9542 5.216 94.9542 4.556V8.66C94.9542 8.024 94.8462 7.544 94.6302 7.208C94.4142 6.872 94.1022 6.704 93.6942 6.704H92.1222C92.1222 8.852 92.2062 10.208 92.3742 10.784H92.7702C95.0622 10.784 96.2982 9.872 96.4782 8.048L96.2142 11H90.2022ZM101.084 11L97.7479 11.036C98.1439 10.976 98.3839 10.7 98.4799 10.22C98.5759 9.74 98.6239 8.612 98.6239 6.836C98.6239 5.06 98.5759 3.932 98.4799 3.452C98.3839 2.972 98.1439 2.696 97.7479 2.636H101.048C101.924 2.636 102.632 2.852 103.16 3.296C103.688 3.74 103.952 4.256 103.952 4.844C103.952 5.528 103.664 6.092 103.076 6.548C102.488 7.004 101.804 7.232 101.024 7.232C101.444 7.232 101.864 7.364 102.272 7.628C102.68 7.892 103.016 8.204 103.292 8.564C103.412 8.72 103.568 8.924 103.76 9.176C103.952 9.428 104.084 9.608 104.156 9.704C104.228 9.8 104.336 9.932 104.48 10.1C104.624 10.268 104.732 10.376 104.792 10.424C104.852 10.472 104.948 10.544 105.08 10.64C105.212 10.736 105.32 10.796 105.416 10.82C105.512 10.844 105.632 10.868 105.788 10.904C105.944 10.94 106.1 10.964 106.256 10.976C106.412 10.988 106.604 10.988 106.832 10.988H103.376C102.164 8.48 101.012 7.22 99.9199 7.22C100.772 7.208 101.456 6.98 101.972 6.548C102.488 6.116 102.74 5.516 102.74 4.748C102.74 4.196 102.56 3.728 102.2 3.344C101.84 2.96 101.348 2.768 100.712 2.768C100.388 2.768 100.1 2.84 99.8479 2.984C99.7639 3.38 99.7159 4.208 99.7159 5.456V6.8C99.7159 8.588 99.7879 9.74 99.9319 10.244C100.076 10.748 100.46 11 101.084 11ZM10.168 22.872C10.4667 22.872 10.6907 22.936 10.84 23.064C11 23.1813 11.08 23.352 11.08 23.576C11.08 23.672 11.064 23.7787 11.032 23.896L10.504 25.768C10.3653 26.2267 10.168 26.5467 9.912 26.728C9.66667 26.9093 9.29867 27 8.808 27H1.288C1.064 27 0.893333 26.9627 0.776 26.888C0.648 26.8133 0.584 26.712 0.584 26.584C0.584 26.52 0.6 26.4507 0.632 26.376C0.664 26.2907 0.717333 26.2213 0.792 26.168C0.866667 26.104 0.946667 26.0453 1.032 25.992C1.20267 25.8853 1.34133 25.7787 1.448 25.672C1.55467 25.5547 1.64533 25.368 1.72 25.112L3.672 18.216C3.71467 18.0773 3.736 17.944 3.736 17.816C3.736 17.6987 3.71467 17.6027 3.672 17.528C3.64 17.4427 3.592 17.3467 3.528 17.24C3.432 17.1013 3.384 16.9893 3.384 16.904C3.384 16.872 3.39467 16.8133 3.416 16.728C3.45867 16.5893 3.54933 16.4933 3.688 16.44C3.83733 16.376 4.06133 16.344 4.36 16.344H8.12C8.344 16.344 8.51467 16.3813 8.632 16.456C8.76 16.52 8.824 16.616 8.824 16.744C8.824 16.7973 8.808 16.8667 8.776 16.952C8.744 17.0267 8.696 17.096 8.632 17.16C8.57867 17.2133 8.52533 17.256 8.472 17.288C8.42933 17.3093 8.39733 17.3307 8.376 17.352C8.20533 17.448 8.06667 17.5547 7.96 17.672C7.85333 17.7893 7.76267 17.9707 7.688 18.216L5.624 25.464H6.616C6.86133 25.464 7.06933 25.4213 7.24 25.336C7.42133 25.2507 7.608 25.0907 7.8 24.856L8.904 23.544C9.10667 23.3093 9.29867 23.1387 9.48 23.032C9.672 22.9253 9.90133 22.872 10.168 22.872ZM18.9014 16.104C20.2454 16.104 21.296 16.424 22.0534 17.064C22.8107 17.6933 23.1894 18.6053 23.1894 19.8C23.1894 20.3653 23.104 20.9733 22.9334 21.624C22.6134 22.8187 22.1174 23.832 21.4454 24.664C20.7734 25.496 19.9734 26.1253 19.0454 26.552C18.1174 26.9787 17.1094 27.192 16.0214 27.192C14.688 27.192 13.6427 26.8773 12.8854 26.248C12.128 25.608 11.7494 24.6907 11.7494 23.496C11.7494 22.952 11.84 22.328 12.0214 21.624C12.3307 20.44 12.816 19.4373 13.4774 18.616C14.1494 17.784 14.944 17.16 15.8614 16.744C16.7894 16.3173 17.8027 16.104 18.9014 16.104ZM18.6134 17.672C18.2934 17.672 18.0054 17.8 17.7494 18.056C17.4934 18.312 17.2374 18.7333 16.9814 19.32C16.736 19.896 16.4694 20.7013 16.1814 21.736C15.7547 23.2293 15.5414 24.2587 15.5414 24.824C15.5414 25.1547 15.6 25.3947 15.7174 25.544C15.8347 25.6933 16.0214 25.768 16.2774 25.768C16.5974 25.768 16.8854 25.64 17.1414 25.384C17.3974 25.1173 17.648 24.696 17.8934 24.12C18.1387 23.544 18.4107 22.7493 18.7094 21.736C19.1254 20.264 19.3334 19.2293 19.3334 18.632C19.3334 18.2907 19.2747 18.0453 19.1574 17.896C19.04 17.7467 18.8587 17.672 18.6134 17.672ZM32.6198 18.504C32.8224 17.768 33.1051 17.2133 33.4678 16.84C33.8411 16.4667 34.3531 16.28 35.0038 16.28C35.5158 16.28 35.9264 16.4453 36.2358 16.776C36.5451 17.096 36.6998 17.496 36.6998 17.976C36.6998 18.136 36.6731 18.3227 36.6198 18.536C36.5024 19.0053 36.2944 19.3467 35.9958 19.56C35.6971 19.7627 35.3718 19.864 35.0198 19.864C34.8384 19.864 34.6731 19.8533 34.5238 19.832C34.3851 19.8 34.2518 19.7627 34.1238 19.72L33.1798 23.192C32.8384 24.4613 32.2678 25.432 31.4678 26.104C30.6678 26.7653 29.5798 27.096 28.2038 27.096C26.9451 27.096 25.9638 26.856 25.2598 26.376C24.5664 25.896 24.2198 25.1493 24.2198 24.136C24.2198 23.6453 24.3051 23.1067 24.4758 22.52L25.6918 18.216C25.7344 18.0773 25.7558 17.944 25.7558 17.816C25.7558 17.688 25.7344 17.5867 25.6918 17.512C25.6598 17.4267 25.6118 17.3307 25.5478 17.224C25.4518 17.0853 25.4038 16.9733 25.4038 16.888C25.4038 16.8453 25.4144 16.792 25.4358 16.728C25.4784 16.5893 25.5744 16.4933 25.7238 16.44C25.8731 16.376 26.0918 16.344 26.3798 16.344H30.1398C30.5984 16.344 30.8278 16.4827 30.8278 16.76C30.8278 16.824 30.8224 16.8773 30.8118 16.92C30.7798 17.016 30.7318 17.096 30.6678 17.16C30.6144 17.2133 30.5291 17.2773 30.4118 17.352C30.2411 17.448 30.1024 17.5547 29.9958 17.672C29.8891 17.7893 29.7984 17.9707 29.7238 18.216L28.3318 23.112C28.2358 23.4747 28.1878 23.784 28.1878 24.04C28.1878 24.7547 28.5718 25.112 29.3398 25.112C29.8091 25.112 30.1984 24.9627 30.5078 24.664C30.8278 24.3547 31.0944 23.832 31.3078 23.096L32.6198 18.504ZM42.2446 16.344C42.4686 16.344 42.6393 16.3813 42.7566 16.456C42.8846 16.52 42.9486 16.616 42.9486 16.744C42.9486 16.7973 42.9326 16.8667 42.9006 16.952C42.8686 17.0267 42.8206 17.096 42.7566 17.16C42.7033 17.2133 42.65 17.256 42.5966 17.288C42.554 17.3093 42.522 17.3307 42.5006 17.352C42.33 17.448 42.1913 17.5547 42.0846 17.672C41.978 17.7893 41.8873 17.9707 41.8126 18.216L39.8766 25.112C39.834 25.2507 39.8126 25.384 39.8126 25.512C39.8126 25.64 39.8286 25.7467 39.8606 25.832C39.9033 25.9173 39.962 26.008 40.0366 26.104C40.1326 26.2427 40.1806 26.3547 40.1806 26.44C40.1806 26.4613 40.17 26.5147 40.1486 26.6C40.106 26.7493 40.01 26.856 39.8606 26.92C39.7113 26.9733 39.4873 27 39.1886 27H35.4286C35.2046 27 35.034 26.9627 34.9166 26.888C34.7886 26.8133 34.7246 26.712 34.7246 26.584C34.7246 26.52 34.7406 26.4507 34.7726 26.376C34.8153 26.2587 34.8846 26.168 34.9806 26.104C35.0766 26.04 35.1353 26.0027 35.1566 25.992C35.3273 25.8853 35.466 25.7787 35.5726 25.672C35.6793 25.5547 35.77 25.368 35.8446 25.112L37.7966 18.216C37.8393 18.0773 37.8606 17.944 37.8606 17.816C37.8606 17.6987 37.8393 17.6027 37.7966 17.528C37.7646 17.4427 37.7166 17.3467 37.6526 17.24C37.5566 17.1013 37.5086 16.9893 37.5086 16.904C37.5086 16.872 37.5193 16.8133 37.5406 16.728C37.5833 16.5893 37.674 16.4933 37.8126 16.44C37.962 16.376 38.186 16.344 38.4846 16.344H42.2446ZM47.5934 16.248C48.1907 16.248 48.74 16.3227 49.2414 16.472C49.7534 16.6107 50.2707 16.8347 50.7934 17.144L51.1614 16.84C51.4174 16.6373 51.6254 16.4987 51.7854 16.424C51.956 16.3493 52.148 16.312 52.3614 16.312C52.6174 16.312 52.82 16.3707 52.9694 16.488C53.1187 16.5947 53.1934 16.7547 53.1934 16.968C53.1934 17.0533 53.1774 17.144 53.1454 17.24L52.4734 19.448C52.3987 19.704 52.3027 19.8853 52.1854 19.992C52.0787 20.0987 51.9134 20.152 51.6894 20.152C51.4547 20.152 51.2467 20.0827 51.0654 19.944C50.8947 19.7947 50.6227 19.496 50.2494 19.048C49.876 18.6213 49.5347 18.3227 49.2254 18.152C48.9267 17.9707 48.6174 17.88 48.2974 17.88C48.0627 17.88 47.8654 17.96 47.7054 18.12C47.5454 18.2693 47.4654 18.456 47.4654 18.68C47.4654 18.936 47.5934 19.176 47.8494 19.4C48.1054 19.6133 48.5054 19.8853 49.0494 20.216C49.604 20.5467 50.0627 20.8453 50.4254 21.112C50.788 21.3787 51.0974 21.7093 51.3534 22.104C51.6094 22.4987 51.7374 22.952 51.7374 23.464C51.7374 23.7947 51.684 24.1253 51.5774 24.456C51.3214 25.3093 50.8254 25.96 50.0894 26.408C49.3534 26.8453 48.4947 27.064 47.5134 27.064C46.7774 27.064 46.1587 26.9787 45.6574 26.808C45.156 26.6373 44.644 26.3493 44.1214 25.944L43.5454 26.424C43.2787 26.648 43.06 26.8027 42.8894 26.888C42.7187 26.9627 42.5267 27 42.3134 27C42.068 27 41.8707 26.9413 41.7214 26.824C41.5827 26.7067 41.5134 26.5467 41.5134 26.344C41.5134 26.2373 41.5347 26.1253 41.5774 26.008L42.3614 23.624C42.4467 23.3467 42.564 23.1493 42.7134 23.032C42.8627 22.9147 43.0547 22.856 43.2894 22.856C43.5347 22.856 43.7534 22.9413 43.9454 23.112C44.148 23.2827 44.4094 23.592 44.7294 24.04C45.0707 24.5307 45.3854 24.872 45.6734 25.064C45.972 25.256 46.324 25.352 46.7294 25.352C47.0174 25.352 47.236 25.3093 47.3854 25.224C47.5454 25.128 47.6574 24.9787 47.7214 24.776C47.7427 24.7227 47.7534 24.6427 47.7534 24.536C47.7534 24.28 47.6307 24.0453 47.3854 23.832C47.14 23.6187 46.7614 23.3627 46.2494 23.064C45.7054 22.7333 45.2627 22.44 44.9214 22.184C44.58 21.9173 44.2814 21.5867 44.0254 21.192C43.78 20.7973 43.6574 20.3333 43.6574 19.8C43.6574 19.4267 43.716 19.0587 43.8334 18.696C44.0574 17.96 44.516 17.368 45.2094 16.92C45.9027 16.472 46.6974 16.248 47.5934 16.248ZM59.5884 16.344C59.8124 16.344 59.983 16.3813 60.1004 16.456C60.2284 16.52 60.2924 16.616 60.2924 16.744C60.2924 16.7973 60.2764 16.8667 60.2444 16.952C60.2124 17.0267 60.1644 17.096 60.1004 17.16C60.047 17.2133 59.9937 17.256 59.9404 17.288C59.8977 17.3093 59.8657 17.3307 59.8444 17.352C59.6737 17.448 59.535 17.5547 59.4284 17.672C59.3217 17.7893 59.231 17.9707 59.1564 18.216L57.2204 25.112C57.1777 25.2507 57.1564 25.384 57.1564 25.512C57.1564 25.64 57.1724 25.7467 57.2044 25.832C57.247 25.9173 57.3057 26.008 57.3804 26.104C57.4764 26.2427 57.5244 26.3547 57.5244 26.44C57.5244 26.4613 57.5137 26.5147 57.4924 26.6C57.4497 26.7493 57.3537 26.856 57.2044 26.92C57.055 26.9733 56.831 27 56.5324 27H52.7724C52.5484 27 52.3777 26.9627 52.2604 26.888C52.1324 26.8133 52.0684 26.712 52.0684 26.584C52.0684 26.52 52.0844 26.4507 52.1164 26.376C52.159 26.2587 52.2284 26.168 52.3244 26.104C52.4204 26.04 52.479 26.0027 52.5004 25.992C52.671 25.8853 52.8097 25.7787 52.9164 25.672C53.023 25.5547 53.1137 25.368 53.1884 25.112L55.1404 18.216C55.183 18.0773 55.2044 17.944 55.2044 17.816C55.2044 17.6987 55.183 17.6027 55.1404 17.528C55.1084 17.4427 55.0604 17.3467 54.9964 17.24C54.9004 17.1013 54.8524 16.9893 54.8524 16.904C54.8524 16.872 54.863 16.8133 54.8844 16.728C54.927 16.5893 55.0177 16.4933 55.1564 16.44C55.3057 16.376 55.5297 16.344 55.8284 16.344H59.5884ZM68.7291 25.112C68.6865 25.2507 68.6651 25.3893 68.6651 25.528C68.6651 25.6453 68.6811 25.7467 68.7131 25.832C68.7451 25.9067 68.7771 25.9707 68.8091 26.024C68.8518 26.0667 68.8785 26.0987 68.8891 26.12C68.9958 26.2267 69.0491 26.3333 69.0491 26.44C69.0491 26.4613 69.0385 26.5147 69.0171 26.6C68.9745 26.7493 68.8785 26.856 68.7291 26.92C68.5905 26.9733 68.3718 27 68.0731 27H64.2811C64.0571 27 63.8811 26.9627 63.7531 26.888C63.6358 26.8133 63.5771 26.712 63.5771 26.584C63.5771 26.52 63.5931 26.4507 63.6251 26.376C63.6571 26.2907 63.6998 26.2267 63.7531 26.184C63.8171 26.1307 63.9025 26.072 64.0091 26.008C64.1798 25.912 64.3185 25.8053 64.4251 25.688C64.5318 25.5707 64.6225 25.3787 64.6971 25.112L65.1131 23.736H62.6171L62.1851 24.648C62.0038 25.0427 61.9131 25.352 61.9131 25.576C61.9131 25.704 61.9345 25.8107 61.9771 25.896C62.0198 25.9707 62.0838 26.0507 62.1691 26.136C62.2438 26.2213 62.2918 26.296 62.3131 26.36C62.3451 26.4133 62.3505 26.488 62.3291 26.584C62.2865 26.744 62.1958 26.856 62.0571 26.92C61.9291 26.9733 61.7211 27 61.4331 27H59.0491C58.8038 27 58.6171 26.9573 58.4891 26.872C58.3611 26.776 58.2971 26.6533 58.2971 26.504C58.2971 26.3333 58.3611 26.2 58.4891 26.104C58.6065 25.9973 58.7878 25.8853 59.0331 25.768C59.3531 25.608 59.6091 25.4533 59.8011 25.304C59.9931 25.144 60.1585 24.9253 60.2971 24.648L63.1451 18.744C63.5825 17.8267 64.0945 17.1653 64.6811 16.76C65.2785 16.344 66.0625 16.136 67.0331 16.136C68.1211 16.136 68.9638 16.36 69.5611 16.808C70.1585 17.2453 70.4571 17.8587 70.4571 18.648C70.4571 18.9787 70.4038 19.32 70.2971 19.672L68.7291 25.112ZM65.5931 22.136L66.4411 19.32C66.4838 19.192 66.5051 19.0587 66.5051 18.92C66.5051 18.7173 66.4465 18.568 66.3291 18.472C66.2225 18.3653 66.0678 18.312 65.8651 18.312C65.6091 18.312 65.3905 18.3867 65.2091 18.536C65.0278 18.6853 64.8465 18.952 64.6651 19.336L63.3531 22.136H65.5931ZM82.4328 16.344C82.8701 16.344 83.0888 16.4827 83.0888 16.76C83.0888 16.8347 83.0834 16.888 83.0728 16.92C83.0408 17.0267 82.9928 17.112 82.9288 17.176C82.8648 17.2293 82.7741 17.2933 82.6568 17.368C82.4968 17.464 82.3634 17.5707 82.2568 17.688C82.1501 17.8053 82.0594 17.9867 81.9848 18.232L80.0008 25.336C79.8194 25.976 79.5901 26.424 79.3128 26.68C79.0461 26.936 78.6728 27.064 78.1927 27.064C77.7661 27.064 77.4088 26.9413 77.1208 26.696C76.8434 26.44 76.5821 26.0507 76.3368 25.528L73.9208 20.44L72.5768 25.112C72.5448 25.2507 72.5288 25.3733 72.5288 25.48C72.5288 25.6187 72.5501 25.736 72.5928 25.832C72.6461 25.9173 72.7154 26.008 72.8008 26.104C72.9181 26.2427 72.9768 26.36 72.9768 26.456C72.9768 26.52 72.9714 26.568 72.9608 26.6C72.9181 26.7493 72.8221 26.856 72.6728 26.92C72.5234 26.9733 72.2994 27 72.0008 27H70.2568C69.8194 27 69.6007 26.8613 69.6007 26.584C69.6007 26.5093 69.6061 26.456 69.6167 26.424C69.6487 26.3173 69.6967 26.2373 69.7607 26.184C69.8247 26.12 69.9154 26.0507 70.0328 25.976C70.1928 25.88 70.3261 25.7733 70.4328 25.656C70.5394 25.5387 70.6301 25.3573 70.7048 25.112L72.7368 17.928L72.4808 17.4C72.3741 17.1867 72.3207 17 72.3207 16.84C72.3207 16.5093 72.5341 16.344 72.9608 16.344H75.3288C75.6701 16.344 75.9261 16.424 76.0968 16.584C76.2781 16.7333 76.4701 17.0053 76.6728 17.4L79.0087 22.088L80.1128 18.232C80.1448 18.0827 80.1608 17.96 80.1608 17.864C80.1608 17.7253 80.1341 17.6133 80.0808 17.528C80.0381 17.432 79.9741 17.336 79.8888 17.24C79.7714 17.1013 79.7128 16.984 79.7128 16.888C79.7128 16.824 79.7181 16.776 79.7288 16.744C79.7714 16.5947 79.8674 16.4933 80.0168 16.44C80.1661 16.376 80.3901 16.344 80.6888 16.344H82.4328ZM91.3698 25.112C91.3271 25.2507 91.3058 25.3893 91.3058 25.528C91.3058 25.6453 91.3218 25.7467 91.3538 25.832C91.3858 25.9067 91.4178 25.9707 91.4498 26.024C91.4924 26.0667 91.5191 26.0987 91.5298 26.12C91.6364 26.2267 91.6898 26.3333 91.6898 26.44C91.6898 26.4613 91.6791 26.5147 91.6578 26.6C91.6151 26.7493 91.5191 26.856 91.3698 26.92C91.2311 26.9733 91.0124 27 90.7138 27H86.9218C86.6978 27 86.5218 26.9627 86.3938 26.888C86.2764 26.8133 86.2178 26.712 86.2178 26.584C86.2178 26.52 86.2338 26.4507 86.2658 26.376C86.2978 26.2907 86.3404 26.2267 86.3938 26.184C86.4578 26.1307 86.5431 26.072 86.6498 26.008C86.8204 25.912 86.9591 25.8053 87.0658 25.688C87.1724 25.5707 87.2631 25.3787 87.3378 25.112L87.7538 23.736H85.2578L84.8258 24.648C84.6444 25.0427 84.5538 25.352 84.5538 25.576C84.5538 25.704 84.5751 25.8107 84.6178 25.896C84.6604 25.9707 84.7244 26.0507 84.8098 26.136C84.8844 26.2213 84.9324 26.296 84.9538 26.36C84.9858 26.4133 84.9911 26.488 84.9698 26.584C84.9271 26.744 84.8364 26.856 84.6978 26.92C84.5698 26.9733 84.3618 27 84.0738 27H81.6898C81.4444 27 81.2577 26.9573 81.1297 26.872C81.0017 26.776 80.9377 26.6533 80.9377 26.504C80.9377 26.3333 81.0017 26.2 81.1297 26.104C81.2471 25.9973 81.4284 25.8853 81.6738 25.768C81.9938 25.608 82.2498 25.4533 82.4418 25.304C82.6338 25.144 82.7991 24.9253 82.9378 24.648L85.7858 18.744C86.2231 17.8267 86.7351 17.1653 87.3218 16.76C87.9191 16.344 88.7031 16.136 89.6737 16.136C90.7618 16.136 91.6044 16.36 92.2018 16.808C92.7991 17.2453 93.0978 17.8587 93.0978 18.648C93.0978 18.9787 93.0444 19.32 92.9378 19.672L91.3698 25.112ZM88.2338 22.136L89.0818 19.32C89.1244 19.192 89.1458 19.0587 89.1458 18.92C89.1458 18.7173 89.0871 18.568 88.9698 18.472C88.8631 18.3653 88.7084 18.312 88.5058 18.312C88.2498 18.312 88.0311 18.3867 87.8498 18.536C87.6684 18.6853 87.4871 18.952 87.3058 19.336L85.9938 22.136H88.2338ZM103.633 16.344C105.233 16.344 106.438 16.6533 107.249 17.272C108.059 17.88 108.465 18.776 108.465 19.96C108.465 20.5467 108.358 21.224 108.145 21.992C107.793 23.2293 107.318 24.2107 106.721 24.936C106.123 25.6613 105.334 26.1893 104.353 26.52C103.382 26.8507 102.134 27.0107 100.609 27L96.2568 26.984C96.0328 26.984 95.8621 26.9467 95.7447 26.872C95.6167 26.7973 95.5527 26.696 95.5527 26.568C95.5527 26.504 95.5687 26.4347 95.6007 26.36C95.6327 26.264 95.6807 26.1947 95.7447 26.152C95.7981 26.1093 95.8834 26.0507 96.0008 25.976C96.1714 25.88 96.3048 25.7733 96.4008 25.656C96.5074 25.5387 96.5981 25.352 96.6728 25.096L98.6248 18.216C98.6674 18.0773 98.6888 17.944 98.6888 17.816C98.6888 17.6987 98.6674 17.6027 98.6248 17.528C98.5928 17.4427 98.5448 17.3467 98.4808 17.24C98.3848 17.1013 98.3368 16.9893 98.3368 16.904C98.3368 16.872 98.3474 16.8133 98.3688 16.728C98.4114 16.5893 98.5021 16.4933 98.6408 16.44C98.7901 16.376 99.0141 16.344 99.3128 16.344H103.633ZM104.049 21.64C104.326 20.6373 104.465 19.848 104.465 19.272C104.465 18.7067 104.347 18.3173 104.113 18.104C103.878 17.8907 103.542 17.784 103.105 17.784H102.753L100.593 25.56H100.977C101.467 25.56 101.878 25.4587 102.209 25.256C102.55 25.0427 102.865 24.6587 103.153 24.104C103.441 23.5387 103.739 22.7173 104.049 21.64ZM115.12 16.344C115.344 16.344 115.514 16.3813 115.632 16.456C115.76 16.52 115.824 16.616 115.824 16.744C115.824 16.7973 115.808 16.8667 115.776 16.952C115.744 17.0267 115.696 17.096 115.632 17.16C115.578 17.2133 115.525 17.256 115.472 17.288C115.429 17.3093 115.397 17.3307 115.376 17.352C115.205 17.448 115.066 17.5547 114.96 17.672C114.853 17.7893 114.762 17.9707 114.688 18.216L112.752 25.112C112.709 25.2507 112.688 25.384 112.688 25.512C112.688 25.64 112.704 25.7467 112.736 25.832C112.778 25.9173 112.837 26.008 112.912 26.104C113.008 26.2427 113.056 26.3547 113.056 26.44C113.056 26.4613 113.045 26.5147 113.024 26.6C112.981 26.7493 112.885 26.856 112.736 26.92C112.586 26.9733 112.362 27 112.064 27H108.304C108.08 27 107.909 26.9627 107.792 26.888C107.664 26.8133 107.6 26.712 107.6 26.584C107.6 26.52 107.616 26.4507 107.648 26.376C107.69 26.2587 107.76 26.168 107.856 26.104C107.952 26.04 108.01 26.0027 108.032 25.992C108.202 25.8853 108.341 25.7787 108.448 25.672C108.554 25.5547 108.645 25.368 108.72 25.112L110.672 18.216C110.714 18.0773 110.736 17.944 110.736 17.816C110.736 17.6987 110.714 17.6027 110.672 17.528C110.64 17.4427 110.592 17.3467 110.528 17.24C110.432 17.1013 110.384 16.9893 110.384 16.904C110.384 16.872 110.394 16.8133 110.416 16.728C110.458 16.5893 110.549 16.4933 110.688 16.44C110.837 16.376 111.061 16.344 111.36 16.344H115.12ZM124.26 25.112C124.218 25.2507 124.196 25.3893 124.196 25.528C124.196 25.6453 124.212 25.7467 124.244 25.832C124.276 25.9067 124.308 25.9707 124.34 26.024C124.383 26.0667 124.41 26.0987 124.42 26.12C124.527 26.2267 124.58 26.3333 124.58 26.44C124.58 26.4613 124.57 26.5147 124.548 26.6C124.506 26.7493 124.41 26.856 124.26 26.92C124.122 26.9733 123.903 27 123.604 27H119.812C119.588 27 119.412 26.9627 119.284 26.888C119.167 26.8133 119.108 26.712 119.108 26.584C119.108 26.52 119.124 26.4507 119.156 26.376C119.188 26.2907 119.231 26.2267 119.284 26.184C119.348 26.1307 119.434 26.072 119.54 26.008C119.711 25.912 119.85 25.8053 119.956 25.688C120.063 25.5707 120.154 25.3787 120.228 25.112L120.644 23.736H118.148L117.716 24.648C117.535 25.0427 117.444 25.352 117.444 25.576C117.444 25.704 117.466 25.8107 117.508 25.896C117.551 25.9707 117.615 26.0507 117.7 26.136C117.775 26.2213 117.823 26.296 117.844 26.36C117.876 26.4133 117.882 26.488 117.86 26.584C117.818 26.744 117.727 26.856 117.588 26.92C117.46 26.9733 117.252 27 116.964 27H114.58C114.335 27 114.148 26.9573 114.02 26.872C113.892 26.776 113.828 26.6533 113.828 26.504C113.828 26.3333 113.892 26.2 114.02 26.104C114.138 25.9973 114.319 25.8853 114.564 25.768C114.884 25.608 115.14 25.4533 115.332 25.304C115.524 25.144 115.69 24.9253 115.828 24.648L118.676 18.744C119.114 17.8267 119.626 17.1653 120.212 16.76C120.81 16.344 121.594 16.136 122.564 16.136C123.652 16.136 124.495 16.36 125.092 16.808C125.69 17.2453 125.988 17.8587 125.988 18.648C125.988 18.9787 125.935 19.32 125.828 19.672L124.26 25.112ZM121.124 22.136L121.972 19.32C122.015 19.192 122.036 19.0587 122.036 18.92C122.036 18.7173 121.978 18.568 121.86 18.472C121.754 18.3653 121.599 18.312 121.396 18.312C121.14 18.312 120.922 18.3867 120.74 18.536C120.559 18.6853 120.378 18.952 120.196 19.336L118.884 22.136H121.124ZM137.88 19.592C137.71 20.2107 137.39 20.696 136.92 21.048C136.451 21.3893 135.859 21.6027 135.144 21.688C135.656 21.7307 136.04 21.88 136.296 22.136C136.552 22.392 136.68 22.728 136.68 23.144C136.68 23.304 136.654 23.5013 136.6 23.736L136.424 24.52C136.403 24.6267 136.392 24.7013 136.392 24.744C136.392 24.8827 136.424 24.9893 136.488 25.064C136.552 25.128 136.643 25.16 136.76 25.16C136.984 25.16 137.144 25.192 137.24 25.256C137.347 25.32 137.384 25.4373 137.352 25.608C137.31 25.8533 137.182 26.0933 136.968 26.328C136.755 26.5627 136.451 26.76 136.056 26.92C135.672 27.0693 135.203 27.144 134.648 27.144C133.944 27.144 133.384 26.9893 132.968 26.68C132.552 26.36 132.344 25.9067 132.344 25.32C132.344 25.096 132.376 24.856 132.44 24.6L132.696 23.576C132.739 23.4373 132.76 23.2933 132.76 23.144C132.76 22.8987 132.675 22.7227 132.504 22.616C132.344 22.5093 132.083 22.456 131.72 22.456H131.112L130.376 25.112C130.355 25.176 130.344 25.256 130.344 25.352C130.344 25.5013 130.382 25.6293 130.456 25.736C130.531 25.8427 130.632 25.9547 130.76 26.072C130.856 26.1467 130.931 26.2213 130.984 26.296C131.038 26.36 131.064 26.4293 131.064 26.504C131.064 26.6853 130.979 26.8133 130.808 26.888C130.638 26.9627 130.387 27 130.056 27H126.04C125.763 27 125.555 26.952 125.416 26.856C125.278 26.7493 125.23 26.6053 125.272 26.424C125.294 26.328 125.336 26.2533 125.4 26.2C125.454 26.136 125.539 26.0667 125.656 25.992C125.838 25.8853 125.982 25.7733 126.088 25.656C126.195 25.5387 126.28 25.3573 126.344 25.112L128.296 18.216C128.339 18.0773 128.36 17.944 128.36 17.816C128.36 17.6987 128.339 17.6027 128.296 17.528C128.264 17.4427 128.216 17.3467 128.152 17.24C128.056 17.1013 128.008 16.9893 128.008 16.904C128.008 16.872 128.019 16.8133 128.04 16.728C128.083 16.5893 128.174 16.4933 128.312 16.44C128.462 16.376 128.686 16.344 128.984 16.344H134.344C135.08 16.344 135.72 16.456 136.264 16.68C136.819 16.904 137.24 17.2133 137.528 17.608C137.827 17.992 137.976 18.4293 137.976 18.92C137.976 19.144 137.944 19.368 137.88 19.592ZM133.784 19.432C133.838 19.1867 133.864 19 133.864 18.872C133.864 18.3067 133.555 18.024 132.936 18.024H132.264L131.56 20.856H132.232C132.648 20.856 132.974 20.7547 133.208 20.552C133.454 20.3493 133.646 19.976 133.784 19.432ZM148.971 16.28C149.44 16.28 149.824 16.4347 150.123 16.744C150.422 17.0427 150.571 17.4267 150.571 17.896C150.571 17.96 150.56 18.0773 150.539 18.248C150.454 18.76 150.251 19.1387 149.931 19.384C149.622 19.6293 149.259 19.752 148.843 19.752C148.566 19.752 148.331 19.7093 148.139 19.624C147.947 19.5387 147.766 19.3947 147.595 19.192L144.955 22.632L144.219 25.112C144.198 25.176 144.187 25.2613 144.187 25.368C144.187 25.5173 144.224 25.6453 144.299 25.752C144.374 25.848 144.48 25.9547 144.619 26.072C144.736 26.1787 144.822 26.2693 144.875 26.344C144.928 26.4187 144.939 26.504 144.907 26.6C144.864 26.7493 144.758 26.856 144.587 26.92C144.427 26.9733 144.203 27 143.915 27H139.883C139.606 27 139.398 26.952 139.259 26.856C139.131 26.7493 139.088 26.6053 139.131 26.424C139.152 26.328 139.19 26.2533 139.243 26.2C139.307 26.136 139.403 26.0613 139.531 25.976C139.691 25.88 139.824 25.7733 139.931 25.656C140.038 25.528 140.128 25.3467 140.203 25.112L140.939 22.616L139.467 18.424C139.36 18.1147 139.232 17.88 139.083 17.72C138.944 17.5493 138.779 17.384 138.587 17.224C138.47 17.1387 138.384 17.064 138.331 17C138.278 16.936 138.251 16.8613 138.251 16.776C138.251 16.648 138.304 16.5467 138.411 16.472C138.528 16.3867 138.694 16.344 138.907 16.344H143.179C143.552 16.344 143.808 16.376 143.947 16.44C144.086 16.504 144.16 16.616 144.171 16.776C144.171 16.872 144.15 16.9573 144.107 17.032C144.064 17.096 144 17.176 143.915 17.272C143.819 17.4 143.744 17.5067 143.691 17.592C143.648 17.6667 143.627 17.7627 143.627 17.88C143.627 17.912 143.638 17.9813 143.659 18.088L144.395 20.904L146.427 18.008C146.864 17.3893 147.275 16.9467 147.659 16.68C148.054 16.4133 148.491 16.28 148.971 16.28Z" fill="white" />
                            </svg></>
                        )}

                    </div>
                )
            })}
        </section>
    )
}

export default Loader;