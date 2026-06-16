import Link from 'next/link';
import { AuthButton } from '@/components/site/AuthButton';

const nav = [
  ['Issuances', '/issuances'],
  ['Downloadables', '/downloadables'],
  ['Articles', '/articles'],
  ["Citizen's Charter", '/citizens-charter'],
  ['Feedback', '/feedback'],
  ['About', '/about'],
  ['Directory', '/directory'],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <div className="brand-mark">DM</div>
          <div>
            <strong>DepEd Masbate City</strong>
            <span>SGODTAP Portal</span>
          </div>
        </Link>
        <nav className="nav">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <AuthButton />
      </div>
    </header>
  );
}
