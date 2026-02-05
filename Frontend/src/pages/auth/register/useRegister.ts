import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { registerSchema, type RegisterFormData } from './registerSchema'
import { register } from '@/shared/api/login.api'
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/api/loaderControl'
import { ROUTE_CONST } from '@/utils/const'
import toast from 'react-hot-toast'

const initialValues: RegisterFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export function useRegister() {
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    startScreenLoader()

    try {
      const { name, email, password } = data
      const response = await register({ name, email, password })
      if(response){
        toast.success("User registered successfully")
        navigate(ROUTE_CONST.LOGIN)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      stopScreenLoader()
    }
    return
  }

  return {
    form,
    onSubmit,
  }
}
