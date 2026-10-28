process.loadEnvFile?.();

async function getFreeModels() {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const res = await response.json();

        const freeModels = res.data
            .filter(model => parseFloat(model.pricing?.prompt) === 0 || model.id.endsWith(':free'))
            .map(model => model.id + " - " + model.name);

        console.log(freeModels);
        return freeModels;
    }
    catch (error) {
        console.error('Request failed:', error.message);
    }
}

getFreeModels();