import MainLayout from '@/components/layout/MainLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — Tanuj Sansare',
  description: 'Research projects and papers',
}

export default function ResearchPage() {
  return (
    <MainLayout>
      <main className="mx-auto" style={{ maxWidth: 'var(--container-md)', padding: 'var(--space-12) var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 16 }}>Research</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Research projects will appear here.</p>
      </main>
    </MainLayout>
  )
}
