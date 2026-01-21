import JSZip from 'jszip';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { images } = await req.json();
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    const zip = new JSZip();

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const url = img.url || img;
      const name = img.name || `photo-${i + 1}.jpg`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error('Failed to fetch image for zip:', url, res.status);
          continue;
        }
        const buf = await res.arrayBuffer();
        zip.file(name, Buffer.from(buf));
      } catch (err) {
        console.error('Error fetching image for zip:', url, err);
      }
    }

    const content = await zip.generateAsync({ type: 'nodebuffer' });

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="yuca-photos-${Date.now()}.zip"`,
      },
    });

  } catch (err) {
    console.error('download-zip error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
