import Image from 'next/image';
import Logo from '@/app/asset/img/gallery-logo.jpeg';
import Link from 'next/link';
import { SignIn, SignedIn, UserButton } from '../SAuth_comp/main';
import UploadButton from './UploadButton';

const Hero = async () => {
    const isSignedIn = await SignedIn();
    return (
        <nav className="max-h-20 h-20 flex justify-between items-center">
            <div className="h-[auto] p-2 m-4">
                <Image
                    alt={`logo`}
                    src={Logo}
                    width={40}
                    height={40}
                    className=""
                />
            </div>
            <div className="p-2 m-4 flex gap-3">
                {isSignedIn ? (
                    <>
                        <UserButton />
                        <UploadButton />
                    </>
                ) : (
                    <SignIn />
                )}
            </div>
        </nav>
    );
};

export default Hero;
