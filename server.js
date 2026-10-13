const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let vehicles = [
    {
            "id": 1,
            "plate_number": "M4R10",
            "owner": "Mario",
            "vehicle_type": "Type 1",
            "color": "Red"
        },
        {
            "id": 2,
            "plate_number": "LU1G1",
            "owner": "Luigi",
            "vehicle_type": "Type 2",
            "color": "Green"
        }
]

app.get("/api/vehicles", (req, res) => {
    res.json(vehicles);
});

app.get("/api/vehicles/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find(vehicle => 
        vehicle.id === id
    );

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    res.json(vehicle);
});

app.post("/api/vehicles", (req, res) => {
    const { plate_number, owner, vehicle_type, color } = req.body;

    if(!plate_number || !owner || !vehicle_type || !color) {
        return res.status(400).json({
            message:"Fields required"
        });
    }

    const newVehicle = {
        id: vehicles.length + 1,
        plate_number: plate_number,
        owner: owner,
        vehicle_type: vehicle_type,
        color: color,
    }
    vehicles.push(newVehicle);

    res.status(201).json(newVehicle);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

