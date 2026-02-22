import MainLayout from '@/components/layout/MainLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Tanuj Sansare',
  description: 'Articles and writeups by Tanuj Sansare',
}

export default function BlogPage() {
  return (
    <MainLayout>
      <main className="mx-auto" style={{ maxWidth: 'var(--container-md)', padding: 'var(--space-12) var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', marginBottom: 16 }}>Blog</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>No posts yet — this page is a placeholder for future blog posts.</p>
      </main>
    </MainLayout>
  )
}
