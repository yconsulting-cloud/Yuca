import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'yuca', 'chatbot-secure.html');
    let html = await fs.promises.readFile(filePath, 'utf8');

    // The HTML already contains a neutral assistant intro; serve it as-is.

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('chatbot-html read error:', err);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
