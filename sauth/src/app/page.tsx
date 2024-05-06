import { SignInButton, SignedOut, UserButton, SignedIn } from '@clerk/nextjs';
import DashBoard from './_components/DashBoard';
import Hero from './_components/Hero';

export default async function Home() {
    return (
        // <>
        //     <Hero />
        //     <main className="border-l-rose-600">
        //         {isSignedIn && <DashBoard />}
        //     </main>
        // </>
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <main>
                    <div>
                        <UserButton />
                    </div>
                    <section>
                        <DashBoard />
                    </section>
                </main>
            </SignedIn>
        </>
    );
}
