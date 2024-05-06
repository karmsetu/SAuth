import Link from 'next/link';

const SignedIn = async () => {
    // const url = process.env.DEV_URL;
    // if (!url) throw new Error(`please provide url`);
    // const response = await fetch(url);
    // const keyName = await response.json();
    // const data = localStorage.getItem(keyName);
    // return data ? true : false;
    return true;
};

const SignIn = () => {
    return <Link href={`/sign-in`}> Sign in</Link>;
};

export { SignedIn, SignIn };
