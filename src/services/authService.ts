import type { OnboardingProfile } from '../types/domain'
import { readStorage, writeStorage } from '../utils/storage'

const accountsKey = 'wellbe.accounts'

export interface StoredAccount {
  email: string
  passwordHash: string
  createdAt: string
  profile: OnboardingProfile
  hasNutritionPlan: boolean
}

export type AuthCheckResult =
  | { ok: true; account: StoredAccount }
  | { ok: false; reason: 'not_found' | 'invalid_password' }

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function hashPassword(email: string, password: string) {
  const source = `${normalizeEmail(email)}:${password}`
  let hash = 5381

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 33) ^ source.charCodeAt(index)
  }

  return (hash >>> 0).toString(36)
}

function readAccounts() {
  return readStorage<StoredAccount[]>(accountsKey, [])
}

function writeAccounts(accounts: StoredAccount[]) {
  writeStorage(accountsKey, accounts)
}

export function findAccount(email: string) {
  const normalizedEmail = normalizeEmail(email)
  return readAccounts().find((account) => account.email === normalizedEmail) ?? null
}

export function accountExists(email: string) {
  return Boolean(findAccount(email))
}

export function verifyCredentials(
  email: string,
  password: string,
): AuthCheckResult {
  const account = findAccount(email)

  if (!account) {
    return { ok: false, reason: 'not_found' }
  }

  if (account.passwordHash !== hashPassword(email, password)) {
    return { ok: false, reason: 'invalid_password' }
  }

  return { ok: true, account }
}

export function createAccount(
  email: string,
  password: string,
  profile: OnboardingProfile,
) {
  const normalizedEmail = normalizeEmail(email)
  const accounts = readAccounts()
  const existingAccount = accounts.find((account) => account.email === normalizedEmail)

  const account: StoredAccount = {
    email: normalizedEmail,
    passwordHash: hashPassword(normalizedEmail, password),
    createdAt: existingAccount?.createdAt ?? new Date().toISOString(),
    profile: {
      ...profile,
      email: normalizedEmail,
    },
    hasNutritionPlan: existingAccount?.hasNutritionPlan ?? false,
  }

  writeAccounts([
    ...accounts.filter((item) => item.email !== normalizedEmail),
    account,
  ])

  return account
}

export function updateAccount(email: string, changes: Partial<StoredAccount>) {
  const normalizedEmail = normalizeEmail(email)
  const accounts = readAccounts()
  const account = accounts.find((item) => item.email === normalizedEmail)

  if (!account) {
    return null
  }

  const updatedAccount = { ...account, ...changes, email: normalizedEmail }
  writeAccounts(
    accounts.map((item) =>
      item.email === normalizedEmail ? updatedAccount : item,
    ),
  )

  return updatedAccount
}
