import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRegister } from './useRegister';
import { Link } from 'react-router-dom';
import { ROUTE_CONST } from '@/utils/const';

const Register = () => {
  const { form, onSubmit } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Sign up</h1>
          <p className="text-sm text-slate-600">
            Create an account to get started.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  className={
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.password && (
              <p className="text-xs text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  className={
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Already have an account? <Link to={ROUTE_CONST.LOGIN}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
