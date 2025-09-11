import { AuthMiddleware } from '@/features/auth';
import { roles } from '@/shared/constants';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/')({
  component: Main,
});

function Main() {
  return (
    <AuthMiddleware toRolesAvailable={[...roles]}>
      <div className='p-2'>
        <h3>
          Türkmenistanyň Awtombil ulaglary ministrliginiň E-Permit ulgamynyň
          dolandyryş paneli
        </h3>
      </div>
    </AuthMiddleware>
  );
}
