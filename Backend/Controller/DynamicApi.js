const API=require('../Modal/apimodal.js')


exports.handleDynamicAPI = async (req, res) => {
    try {
        console.log("Params:", req.params);

        const { endpoint } = req.params;
        console.log(endpoint)

        const api = await API.findOne({
            endpoint: endpoint.trim().toLowerCase()
        });

        if (!api) {
            return res.status(404).json({ message: "API not found" });
        }

        // 2. Call external API using fetch
        const response = await fetch(api.externalUrl, {
            method: api.method || "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: api.method === "POST" ? JSON.stringify(req.body) : undefined
        });

        const data = await response.json();

        // 3. Send response back to consumer
        res.json({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Error calling external API",
            error: error.message
        });
    }
};
