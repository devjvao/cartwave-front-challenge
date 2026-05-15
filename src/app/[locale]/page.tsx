import {Header} from '@/components/Header';
import {Hero} from '@/components/Hero';
import {Products} from '@/components/Products';
import {WhyCartwave} from '@/components/WhyCartwave';
import {FinalCta} from '@/components/FinalCta';
import {Footer} from '@/components/Footer';

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Products />
                <WhyCartwave />
                <FinalCta />
            </main>
            <Footer />
        </>
    );
}
