import { createClient } from '@supabase/supabase-js'
import { E2E_EMAIL } from './constants'

export default async function globalTeardown() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const user = users.find(u => u.email === E2E_EMAIL)
  if (user) {
    // Deleting the auth user cascades to all app data if your schema uses
    // ON DELETE CASCADE from auth.users → your user-linked tables.
    await admin.auth.admin.deleteUser(user.id)
    console.log('[e2e:teardown] test user and data deleted')
  }
}
