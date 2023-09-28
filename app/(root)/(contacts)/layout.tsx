import ContactNavbar from '@/components/shared/ContactNavbar/ContactNavbar';


const contactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ContactNavbar />
            <div>{children}</div>
        </div>
    );
};

export default contactLayout;
