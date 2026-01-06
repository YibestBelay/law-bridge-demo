import Layout from '@/components/shared/Layout'
import LawBridgeAuth from '@/components/auth/LawBridgeAuth'

export default function AuthPage() {
  return (
    <Layout showNav={false}>
      <LawBridgeAuth />
    </Layout>
  )
}

