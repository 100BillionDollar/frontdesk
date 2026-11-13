import { useState, type FormEvent } from 'react'
import { useCreateVisitorMutation, useGetVisitorsQuery } from '@/features/visitors/visitorsApi'
import './App.css'

function App() {
  const { data: visitors, isLoading, isError, refetch } = useGetVisitorsQuery()
  const [createVisitor, { isLoading: isCreating }] = useCreateVisitorMutation()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    await createVisitor({
      name: name.trim(),
      phone: phone.trim() || null,
      purpose: purpose.trim() || null,
    }).unwrap()
    setName('')
    setPhone('')
    setPurpose('')
  }

  return (
    <main className="container">
      <h1>FrontDesk</h1>
      <p className="subtitle">RTK Query smoke test — backend /visitors API</p>

      <form onSubmit={handleSubmit} className="visitor-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          required
        />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" />
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Adding…' : 'Add visitor'}
        </button>
      </form>

      {isLoading && <p>Loading visitors…</p>}
      {isError && (
        <p className="error">
          Backend se connect nahi ho paya (http://localhost:8000).{' '}
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      )}
      {visitors && visitors.length === 0 && <p>Koi visitor nahi hai abhi.</p>}
      {visitors && visitors.length > 0 && (
        <ul className="visitor-list">
          {visitors.map((v) => (
            <li key={v.id}>
              <strong>{v.name}</strong>
              {v.phone && <span> · {v.phone}</span>}
              {v.purpose && <span> · {v.purpose}</span>}
              <span className="time"> · in: {new Date(v.checked_in_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
