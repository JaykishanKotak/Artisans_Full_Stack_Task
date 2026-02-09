import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useHeader } from './useHeader';

type AppHeaderProps = {
  onOpenMobileNav: () => void;
};

const Header = ({ onOpenMobileNav }: AppHeaderProps) => {
  const { onClickLogout } = useHeader();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 md:hidden"
          aria-label="Open navigation"
        >
          ☰
        </button>

        <Link to="/" className="font-semibold tracking-tight text-slate-900">
          Artisan App
        </Link>

        <div className="flex-1" />

        <div className="hidden items-center gap-2 md:flex">
          <Button type="button" onClick={onClickLogout}>
            Logout
          </Button>{' '}
        </div>
      </div>
    </header>
  );
};

export default Header;
