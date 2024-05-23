import React from 'react';
const Footer = () => {
    const linkStyle = "text-white hover:underline cursor-pointer";
    return (
        <footer className='flex justify-between p-8 border-t-[1px] border-top border-solid border-white mx-4'>
            <p className="text-white">© Donaël Walter 2024</p>
            <ul className='flex gap-2'>
                <li>
                    <a className={linkStyle} href='https://cal.com/donael-walter/conversation-rapide'>Book a 15 min call</a>
                </li>
                <li>
                    <a className={linkStyle} href='https://www.instagram.com/walt_dona/' target='_blank'>Instagram</a>
                </li>
                <li>
                    <a className={linkStyle} href='https://github.com/Donawalt' target='_blank'>Github</a>
                </li>
                <li>
                    <a className={linkStyle} href='https://dribbble.com/donaelwalter' target='_blank'>Dribble</a>
                </li>
            </ul>
        </footer>
    );
}


export default Footer;