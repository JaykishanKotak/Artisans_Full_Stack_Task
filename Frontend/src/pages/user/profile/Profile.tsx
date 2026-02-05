import { useProfile } from './useProfile'
import { Input } from '@/components/ui/Input';
import { format } from 'date-fns';

const Profile = () => {
  const { userDetails } = useProfile()
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-600">This is a placeholder profile page.</p>
      </div>

      <div className="mt-6 space-y-4">
        <Input
          label='Email'
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={userDetails?.email}
          disabled
        />

        <Input
          label='User Id'
          id="id"
          type="text"
          placeholder="Id"
          autoComplete="id"
          value={userDetails?.id}
          disabled
        />

        <Input
          label='Name'
          id="name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          value={userDetails?.name}
          disabled
        />


        <Input
          label='Hashed Password'
          id="hashedPassword"
          type="text"
          placeholder="Password"
          autoComplete="password"
          value={userDetails?.password}
          disabled
        />

        <Input
          id="createdAt"
          type="text"
          label="Account Creation Date"
          placeholder="Account Created At"
          autoComplete="createdAt"
          value={userDetails?.createdAt ? format(new Date(userDetails.createdAt), "MM/dd/yyyy") : ""}
          disabled
        />
      </div>


    </div>
  )
}
export default Profile

