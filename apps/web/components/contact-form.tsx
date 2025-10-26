"use client";
import { useState } from 'react';
import type { FormEvent } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
    };

    const res = await fetch(`${API_URL}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setStatus('Thanks! We will be in touch.');
      form.reset();
    } else setStatus('Something went wrong. Please try again.');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input id="name" name="name" required className="mt-1 w-full border rounded-md px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full border rounded-md px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 w-full border rounded-md px-3 py-2" />
      </div>
      <button type="submit" className="px-6 py-3 bg-navy text-white rounded-md">Send</button>
      {status && <p className="text-sm text-green-700">{status}</p>}
    </form>
  );
}
