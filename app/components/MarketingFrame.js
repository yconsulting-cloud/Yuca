"use client";
import React from 'react';

export default function MarketingFrame() {
  return (
    <div style={{width: '100%', height: '100vh', overflow: 'hidden'}}>
      <iframe
        src="/index.html"
        title="Yuca Marketing"
        style={{width: '100%', height: '100%', border: '0'}}
        loading="eager"
      />
    </div>
  );
}
