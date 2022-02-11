import axios from 'axios'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useUser } from '../context/user'

const Dashboard = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  const loadPortal = async () => {
    const { data } = await axios.get('/api/portal')
    router.push(data.url)
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed
              ? `Subscribed: ${user.interval}`
              : 'Not Subscribed'}
          </p>
          <button onClick={loadPortal}>Manage Subscription</button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

export default Dashboard
