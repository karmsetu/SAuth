import dotenv from 'dotenv';
import Image from 'next/image';
import Link from 'next/link';
dotenv.config();

const SignedIn = async () => {
    // const url = process.env.DEV_URL;
    // if (!url) throw new Error(`please provide url`);
    // const response = await fetch(url);
    // const keyName = await response.json();
    // const data = localStorage.getItem(keyName);
    // return data ? true : false;
    return true;
};

const SignedOut = () => {};

const SignIn = () => {
    return <Link href={`/sign-in`}> Sign in</Link>;
};

const UserButton = () => {
    return (
        <div>
            {/* <Image
                height={40}
                width={40}
                alt="profile-icon"
                src={process.env.SAUTH_SIGN_URL as string}
            /> */}
            signedin
        </div>
    );
};

export { SignIn, SignedOut, SignedIn, UserButton };
