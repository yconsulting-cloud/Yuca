export default async function handler(req, res) {
    const origin = req.headers.origin;

    // La même règle de sécurité
    const isAllowedOrigin = 
        !origin || 
        origin.endsWith('.madebyyuca.com') || 
        origin === 'https://madebyyuca.com' || 
        origin.startsWith('http://localhost') || 
        origin.startsWith('http://127.0.0.1');

    if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Optionnel : bloquer carrément si l'origine n'est pas autorisée
        return res.status(403).json({ error: 'Accès non autorisé' });
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { name, email, phone, business, project, source } = req.body;

        // 1. Ajouter le contact dans Brevo
        await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                email: email,
                attributes: {
                    NOM: name,
                    TELEPHONE: phone,
                    ACTIVITE: business,
                    PROJET: project,
                    SOURCE: source || 'site'
                },
                listIds: [5],
                updateEnabled: true
            })
        });

        // 2. T'envoyer un email de notification
        await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
            sender: { name: 'Yuca Site', email: 'yuca.consulting@gmail.com' },
                to: [{ email: 'yuca.consulting@gmail.com' }],
                subject: `🎯 Nouveau lead Yuca : ${name}`,
                htmlContent: `
                    <h2>Nouveau lead !</h2>
                    <p><strong>Nom :</strong> ${name}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
                    <p><strong>Activité :</strong> ${business || 'Non renseignée'}</p>
                    <p><strong>Projet :</strong> ${project || 'Non renseignée'}</p>
                    <p><strong>Source :</strong> ${source || 'Site'}</p>
                `
            })
        });

        return res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Brevo error:', error);
        return res.status(500).json({ error: 'Error saving lead' });
    }
}
