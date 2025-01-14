export default async function(endpoint: string, {method, body}: { method: 'POST' | 'GET' | 'DELETE' | 'PUT', body?: {[key:string]: string}} ) {

        try {
            const config = useRuntimeConfig()
    
            const response = await fetch(`${config.public.apiTrackingBaseUrl}${endpoint}`, {
                method,
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
                },
                ...body && {
                    body: JSON.stringify(body)
                }
            })
    
            if (!response.ok) throw new Error('Une erreur est survenue')
    
            return await response.json()
    
        } catch {
            return null
        }
    
        // return ...
        
    }

