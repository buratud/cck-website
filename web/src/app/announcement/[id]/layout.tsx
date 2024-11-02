import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import styles from './styles.module.scss';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className={`${styles.container}`}>
                {children}
            </div>
            <Footer />
        </>
    );
}

