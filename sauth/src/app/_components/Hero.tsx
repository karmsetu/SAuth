import { SignUp } from '@clerk/nextjs';
import { SignIn, SignedIn } from '../lib/util/main';

export default async function Hero() {
    // const isSignedIn = await SignedIn();
    // return <>{isSignedIn ? <SignIn /> : <span>Signed in</span>}</>;
    return <SignUp path="/sign-up" />;
}
