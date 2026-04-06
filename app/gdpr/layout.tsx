import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů (GDPR) | Vladimír Fořt',
  description: 'Zásady ochrany osobních údajů v souladu s nařízením GDPR.',
}

export default function GdprLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
