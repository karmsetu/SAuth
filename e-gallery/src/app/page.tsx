import { SignedIn } from './SAuth_comp/main';
import Gallery from './_components/Gallery';
import Hero from './_components/Hero';

export default async function Home() {
    const isSignedIn = await SignedIn();
    return (
        <>
            <Hero />
            {isSignedIn ? <Gallery /> : <div>Please sign in </div>}
        </>
    );
}
