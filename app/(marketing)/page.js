
import Navigation from "../components/layouts/Navigation";

export default function Home() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <main>
      <Navigation navItems={navItems} />
    </main>
  );
  
}
