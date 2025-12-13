import { Providers } from '@/providers'

export default function BrugerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
