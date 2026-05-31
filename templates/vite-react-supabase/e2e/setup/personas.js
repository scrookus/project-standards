// E2e persona manifest — maps canonical personas to identity states,
// entitlement expectations, and auth storage states.
//
// All authenticated storage states are provisioned by auth.setup.js.
// Default local emails: e2e-{user,admin}@example.test
//
// CUSTOMISE THIS: add personas matching your application's role/permission model.

// ---- Identity states -------------------------------------------------------

export const IDENTITY = {
  anonymous: { user: null,                profile: null },
  user:      { user: { id: 'e2e-user' },  profile: {} },
  admin:     { user: { id: 'e2e-admin' }, profile: { is_admin: true } },
}

// ---- Storage states --------------------------------------------------------

export const STORAGE_STATE = {
  anonymous: null,
  user:      'e2e/auth-state/user.json',
  admin:     'e2e/auth-state/admin.json',
}

// ---- Journey persona → identity mapping ------------------------------------
//
// CUSTOMISE THIS: map user journeys to personas and phases.
// Phase A = anonymous (no auth required).
// Phase B = authenticated (requires Supabase + auth state).

export const JOURNEY_PERSONAS = {
  // Phase A — anonymous
  visitor: { phase: 'A', identity: 'anonymous' },

  // Phase B — authenticated
  accountHolder: { phase: 'B', identity: 'user' },
  adminUser:     { phase: 'B', identity: 'admin' },
}
