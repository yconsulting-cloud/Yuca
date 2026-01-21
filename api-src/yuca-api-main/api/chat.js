export default async function handler(req, res) {
    const origin = req.headers.origin;

    // Autorise : localhost (tests), ton site principal, et TOUTES tes démos clients
    const isAllowedOrigin = 
        !origin || 
        origin.endsWith('.madebyyuca.com') || 
        origin === 'https://madebyyuca.com' || 
        origin.startsWith('http://localhost') || 
        origin.startsWith('http://127.0.0.1');

    if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Réponse immédiate pour le test de pré-connexion du navigateur
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, system } = req.body;

        // Ajouter la date au system prompt
        const today = new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        const systemWithDate = `Nous sommes le ${today}. ${system}`;


        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: systemWithDate,
                messages: messages
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
